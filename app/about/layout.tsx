import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About GovernValu",
    description: "Learn about GovernValu's mission, vision, values, and strategic objectives. Premier governance and investment advisory firm based in Qatar, serving organizations across the GCC region.",
    keywords: ["about GovernValu", "governance company", "investment advisory firm", "Qatar consulting", "GCC advisory", "corporate governance experts", "business consulting Qatar"],
    openGraph: {
        title: "About GovernValu",
        description: "Premier governance and investment advisory firm based in Qatar, serving organizations across the GCC region.",
        type: "website",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
