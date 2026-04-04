import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://swapdroid.vercel.app/";
const description =
  "Swapnil Nandapure is a Senior Software Engineer with 10+ years of experience in React, Java, TypeScript, AI, GenAI, Jenkins, Cypress, CI/CD, Spinnaker, DataDog, and OpEx. specialist in building scalable, high-performance applications.";
const gaTrackingId = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Swapnil Nandapure | Senior Software Engineer | React Java TypeScript GenAI",
  description,
  keywords:
    "Swapnil Nandapure, React Developer, Java Developer, TypeScript, GenAI, AI Engineer, Jenkins, Cypress, CI/CD, Spinnaker, DataDog, Software Engineer Portfolio",
  alternates: {
    canonical: "https://swapdroid.vercel.app/",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Swapnil Nandapure | Senior Software Engineer | React Java TypeScript GenAI",
    description,
    url: "https://swapdroid.vercel.app/",
    siteName: "swapdroid",
    images: [
      {
        url: "/profile.webp",
        width: 1200,
        height: 630,
        alt: "Swapnil Nandapure portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swapnil Nandapure | Software Engineer Portfolio",
    description,
    images: ["/profile.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaTrackingId}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
