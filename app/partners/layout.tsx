import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Partners",
    description: "GovernValu's strategic partnerships with leading global organizations, consulting firms, and academic institutions to deliver world-class governance and investment advisory services.",
    keywords: ["GovernValu partners", "strategic partnerships", "consulting partners", "academic partnerships", "global advisory network", "business alliances Qatar"],
    openGraph: {
        title: "Our Partners | GovernValu",
        description: "Strategic partnerships with leading global organizations for world-class advisory services.",
        type: "website",
    },
};

export default function PartnersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
