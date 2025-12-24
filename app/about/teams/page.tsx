
import { cookies } from "next/headers";
import { getContent } from "@/lib/content";
import { LANGUAGE_COOKIE_NAME, DEFAULT_LANGUAGE, Language } from "@/lib/i18n";
import TeamsClient from "./TeamsClient";

export default async function TeamsPage() {
    const cookieStore = await cookies();
    const lang = (cookieStore.get(LANGUAGE_COOKIE_NAME)?.value || DEFAULT_LANGUAGE) as Language;

    // Fetch content directly on the server
    const content = await getContent<any>('teams', lang);

    return <TeamsClient content={content} />;
}
