import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://exit-readiness-assessment.vercel.app"),
  title: {
    default: "Exit Readiness Assessment | Aspen Valuations",
    template: "%s | Aspen Valuations",
  },
  description:
    "Ten questions, under three minutes. Find out how ready your business is for a sale across the financial, operational and strategic dimensions buyers actually test.",
  keywords: [
    "exit readiness",
    "business valuation",
    "sell my business",
    "M&A readiness",
    "Aspen Valuations",
  ],
  openGraph: {
    title: "Exit Readiness Assessment | Aspen Valuations",
    description:
      "Ten questions, under three minutes. See where your business stands before you go to market.",
    type: "website",
    siteName: "Aspen Valuations",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exit Readiness Assessment | Aspen Valuations",
    description:
      "Ten questions, under three minutes. See where your business stands before you go to market.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${barlow.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white">{children}</body>
    </html>
  );
}
