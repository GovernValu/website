import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Industries We Serve",
    description: "GovernValu provides specialized governance and investment advisory services across banking & finance, sovereign wealth funds, family enterprises, real estate, and more in Qatar and the GCC.",
    keywords: ["industries served", "banking consulting Qatar", "sovereign wealth advisory", "family office services", "real estate governance", "healthcare consulting GCC"],
    openGraph: {
        title: "Industries We Serve | GovernValu",
        description: "Specialized governance and investment advisory across multiple industries in Qatar and the GCC.",
        type: "website",
    },
};

export default function IndustriesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
