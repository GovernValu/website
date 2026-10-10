import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import { requireAdmin } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ page: string }> }
) {
    const { page } = await params;
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';
    // The admin editor needs the stored record, not the localized page view.
    const raw = searchParams.get('raw') === '1';

    try {
        const content = await getContent(page, lang, { raw });

        if (!content) {
            return NextResponse.json(
                { error: "Content not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(content);
    } catch (error) {
        console.error(`[Content API Error] Page: ${page}, Lang: ${lang}`, error);
        return NextResponse.json(
            { error: "Failed to fetch content", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ page: string }> }
) {
    const denied = await requireAdmin();
    if (denied) return denied;

    const { page } = await params;
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';

    try {
        const content = await request.json();
        await saveContent(page, content, lang);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(`[Content API PUT Error] Page: ${page}, Lang: ${lang}`, error);
        return NextResponse.json(
            { error: "Failed to save content", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
