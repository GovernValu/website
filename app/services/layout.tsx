import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services",
    description: "Comprehensive governance and investment advisory services including corporate governance, investment networks, valuation, trademark protection, risk management, strategic planning, and business solutions in Qatar and the GCC.",
    keywords: ["governance services", "investment advisory", "valuation services", "trademark registration", "risk management", "strategic planning", "change management", "business consulting", "Qatar", "GCC"],
    openGraph: {
        title: "Our Services | GovernValu",
        description: "Comprehensive governance and investment advisory services in Qatar and the GCC region.",
        type: "website",
    },
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
