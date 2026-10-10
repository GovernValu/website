import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { getContent } from "@/lib/content";
import { CMS_PAGES } from "@/lib/cms-pages";
import { SHARED_LISTS } from "@/lib/bilingual";
import { compareTranslations, summarizeIssues } from "@/lib/content-health";

export const dynamic = "force-dynamic";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Per-page last-edit times and English/Arabic parity, for the dashboard and pages list.
export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;

    try {
        const rows = await prisma.pageContent.findMany({
            where: { page: { in: CMS_PAGES.map((page) => page.id) } },
        });
        const stored = (page: string, lang: string) => rows.find((row) => row.page === page && row.lang === lang);

        const pages = await Promise.all(
            CMS_PAGES.map(async ({ id }) => {
                const [en, ar] = await Promise.all(
                    (["en", "ar"] as const).map(async (lang) =>
                        stored(id, lang)?.content ?? (await getContent<any>(id, lang, { raw: true }))
                    )
                );
                const issues = compareTranslations(id, en, ar);
                const sharedList = SHARED_LISTS[id];
                const updatedAt = [stored(id, "en")?.updatedAt, stored(id, "ar")?.updatedAt]
                    .filter((date): date is Date => Boolean(date))
                    .sort((a, b) => b.getTime() - a.getTime())[0];

                return {
                    id,
                    updatedAt: updatedAt?.toISOString() ?? null,
                    inDatabase: Boolean(stored(id, "en") || stored(id, "ar")),
                    sharedItems: sharedList && Array.isArray((en as any)?.[sharedList.key])
                        ? (en as any)[sharedList.key].length
                        : null,
                    summary: summarizeIssues(issues),
                    issues: issues.slice(0, 8),
                };
            })
        );

        return NextResponse.json({ pages });
    } catch (error) {
        console.error("[Content status] Failed:", error);
        return NextResponse.json({ error: "Failed to load content status" }, { status: 500 });
    }
}
