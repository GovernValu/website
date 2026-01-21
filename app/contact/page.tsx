import { Metadata } from "next";
import { cookies } from "next/headers";
import { getContent } from "@/lib/content";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Contact GovernValu for governance and investment consultation services. Offices in Qatar and Turkey. Get in touch with our expert advisors today.",
    keywords: ["contact GovernValu", "governance consultation Qatar", "investment advisory contact", "Istanbul office", "Turkey office", "business consulting contact"],
    openGraph: {
        title: "Contact Us | GovernValu",
        description: "Get in touch with GovernValu for governance and investment consultation services in Qatar and Turkey.",
        type: "website",
    },
};

export const dynamic = "force-dynamic";

async function getContactContent(lang: string) {
    return await getContent<any>("contact", lang);
}

async function getSettingsContent(lang: string) {
    return await getContent<any>("settings", lang);
}

export default async function ContactPage() {
    const cookieStore = await cookies();
    const lang = cookieStore.get("governvalu_lang")?.value || "en";

    const [contactContent, settingsContent] = await Promise.all([
        getContactContent(lang),
        getSettingsContent(lang),
    ]);

    if (!contactContent || !settingsContent) {
        return (
            <div className="flex bg-white h-screen items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Unable to load content. Please refresh the page.</p>
                </div>
            </div>
        );
    }

    return (
        <ContactPageClient
            contactContent={contactContent}
            settingsContent={settingsContent}
            initialLang={lang}
        />
    );
}
