import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GovernValu | Governance & Investment Advisory - Qatar",
  description: "Premier governance and investment consultation firm in Qatar. Strategic counsel for corporate governance, investment strategy, risk mitigation, and family office services across the GCC region.",
  keywords: "governance, investment, Qatar, GCC, corporate governance, investment strategy, risk mitigation, family office, advisory, Doha",
  openGraph: {
    title: "GovernValu | Governance & Investment Advisory",
    description: "Strategic counsel for the complexity of modern wealth. Based in Qatar, serving the GCC region.",
    locale: "en_QA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${notoKufiArabic.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
