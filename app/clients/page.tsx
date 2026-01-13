
import { Metadata } from "next";
import { cookies } from "next/headers";
import { getContent } from "@/lib/content";
import { LANGUAGE_COOKIE_NAME, DEFAULT_LANGUAGE, Language } from "@/lib/i18n";
import ClientsPageClient from "./ClientsClient";

export const metadata: Metadata = {
    title: "Our Clients",
    description: "GovernValu serves leading organizations across Qatar and the GCC including government entities, private corporations, family offices, and international organizations.",
    keywords: ["GovernValu clients", "Qatar government consulting", "GCC corporate clients", "family office clients", "institutional clients", "governance consulting clients"],
    openGraph: {
        title: "Our Clients | GovernValu",
        description: "Leading organizations across Qatar and the GCC trust GovernValu for governance and investment advisory.",
        type: "website",
    },
};

export default async function ClientsPage() {
    const cookieStore = await cookies();
    const lang = (cookieStore.get(LANGUAGE_COOKIE_NAME)?.value || DEFAULT_LANGUAGE) as Language;

    // Fetch content directly on the server
    const content = await getContent<any>('clients', lang);

    return <ClientsPageClient content={content} />;
}
