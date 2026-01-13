
import { Metadata } from "next";
import { cookies } from "next/headers";
import { getContent } from "@/lib/content";
import { LANGUAGE_COOKIE_NAME, DEFAULT_LANGUAGE, Language } from "@/lib/i18n";
import BoardClient from "./BoardClient";

export const metadata: Metadata = {
    title: "Board of Directors",
    description: "Meet GovernValu's distinguished Board of Directors. Expert leadership guiding governance and investment advisory excellence in Qatar and the GCC.",
    keywords: ["GovernValu board", "board of directors", "corporate leadership", "governance experts", "Qatar advisors"],
};

export default async function BoardPage() {
    const cookieStore = await cookies();
    const lang = (cookieStore.get(LANGUAGE_COOKIE_NAME)?.value || DEFAULT_LANGUAGE) as Language;

    // Fetch content directly on the server
    const content = await getContent<any>('board', lang);

    return <BoardClient content={content} />;
}
