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
  title: {
    default: "GovernValu | Governance & Investment Advisory - Qatar",
    template: "%s | GovernValu"
  },
  description: "Premier governance and investment consultation firm in Qatar. Strategic counsel for corporate governance, investment strategy, risk mitigation, valuation services, and family office services across the GCC region.",
  keywords: ["governance", "investment", "Qatar", "GCC", "corporate governance", "investment strategy", "risk management", "valuation", "family office", "advisory", "Doha", "consulting", "board advisory", "strategic planning", "business solutions", "trademark registration"],
  authors: [{ name: "GovernValu" }],
  creator: "GovernValu",
  publisher: "GovernValu",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/govico.png', type: 'image/png' },
    ],
    apple: [
      { url: '/govico.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "GovernValu | Governance & Investment Advisory",
    description: "Strategic counsel for the complexity of modern wealth. Premier governance and investment advisory based in Qatar, serving the GCC region.",
    locale: "en_QA",
    type: "website",
    siteName: "GovernValu",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GovernValu - Governance & Investment Advisory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "GovernValu | Governance & Investment Advisory",
    description: "Strategic counsel for the complexity of modern wealth. Premier advisory based in Qatar.",
    images: ['/og-image.jpg'],
  },
  metadataBase: new URL('https://governvalu.qa'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ar': '/ar',
    },
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
