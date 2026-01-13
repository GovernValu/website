
import { Metadata } from "next";
import { cookies } from "next/headers";
import { getContent } from "@/lib/content";
import { LANGUAGE_COOKIE_NAME, DEFAULT_LANGUAGE, Language } from "@/lib/i18n";
import ChairmanClient from "./ChairmanClient";

export const metadata: Metadata = {
    title: "Chairman's Message",
    description: "A message from GovernValu's Board Chairman on our vision for governance excellence and investment advisory in Qatar and the GCC region.",
    keywords: ["chairman message", "GovernValu leadership", "governance vision", "corporate leadership Qatar"],
};

export default async function ChairmanPage() {
    const cookieStore = await cookies();
    const lang = (cookieStore.get(LANGUAGE_COOKIE_NAME)?.value || DEFAULT_LANGUAGE) as Language;

    // Fetch content directly on the server
    const content = await getContent<any>('chairman', lang);

    return <ChairmanClient content={content} />;
}
