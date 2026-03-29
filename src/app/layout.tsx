import type { Metadata } from "next";
import "@/styles/globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://swapdroid.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Swapnil Nandapure | Senior Software Engineer",
  description:
    "SWAPDROiD is the personal portfolio of Swapnil Nandapure, a Senior Software Engineer building scalable digital products across mobile, web, AI, and product platforms.",
  keywords: [
    "SWAPDROiD",
    "swapdroid",
    "Swapnil Nandapure",
    "Senior Software Engineer",
    "React Native Developer",
    "React Developer",
    "Next.js Portfolio",
    "TypeScript",
    "Frontend Engineer",
    "AI Enthusiast",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Swapnil Nandapure | Senior Software Engineer",
    description:
      "Explore Swapnil Nandapure's portfolio featuring premium UI, scalable products, and engineering work across banking, healthcare, CRM, and e-commerce.",
    url: siteUrl,
    siteName: "SWAPDROiD",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "SWAPDROiD portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swapnil Nandapure | Senior Software Engineer",
    description:
      "Personal portfolio of Swapnil Nandapure with projects, toolbox, and contact experience built for a premium product feel.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased">
        {children}
      </body>
    </html>
  );
}
