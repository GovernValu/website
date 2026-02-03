import { Metadata } from "next";
import { cookies } from "next/headers";
import { getContent } from "@/lib/content";
import FAQPageClient from "./FAQPageClient";

export const metadata: Metadata = {
    title: "Frequently Asked Questions",
    description: "Find answers to common questions about GovernValu's governance consulting, investment advisory, risk management, and business valuation services.",
    keywords: ["FAQ", "frequently asked questions", "GovernValu", "governance consulting", "investment advisory", "business valuation", "GRC"],
    openGraph: {
        title: "Frequently Asked Questions | GovernValu",
        description: "Find answers to common questions about GovernValu's governance consulting and advisory services.",
        type: "website",
    },
};

export const dynamic = "force-dynamic";

async function getContactContent(lang: string) {
    return await getContent<any>("contact", lang);
}

export default async function FAQPage() {
    const cookieStore = await cookies();
    const lang = cookieStore.get("governvalu_lang")?.value || "en";

    const contactContent = await getContactContent(lang);

    if (!contactContent) {
        return (
            <div className="flex bg-white h-screen items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Unable to load content. Please refresh the page.</p>
                </div>
            </div>
        );
    }

    return (
        <FAQPageClient
            faqContent={contactContent.faq}
            initialLang={lang}
        />
    );
}
