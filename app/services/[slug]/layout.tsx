import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getContent } from "@/lib/content";
import { cmsHtmlToText } from "@/lib/html";
import { LANGUAGE_COOKIE_NAME } from "@/lib/i18n";

interface ServiceLayoutProps {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServiceLayoutProps): Promise<Metadata> {
    const { slug } = await params;
    const store = await cookies();
    const isAr = store.get(LANGUAGE_COOKIE_NAME)?.value === "ar";
    const lang = isAr ? "ar" : "en";
    const content = await getContent<any>("services", lang);
    const service = content?.services?.find((item: any) => item.slug === slug);

    if (!service) {
        return { title: isAr ? "الخدمة غير موجودة" : "Service Not Found" };
    }

    const title = service.title;
    const description = cmsHtmlToText(service.shortDescription || service.fullDescription);
    const image = service.image || (isAr ? "/og-image-ar.jpg" : "/og-image-en.jpg");
    const canonical = `https://governvalu.com/services/${service.slug}`;

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title: `${title} | GovernValu`,
            description,
            type: "website",
            url: canonical,
            locale: isAr ? "ar_AR" : "en_US",
            images: [{ url: image, alt: title }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}

export default function ServiceLayout({ children }: ServiceLayoutProps) {
    return children;
}
