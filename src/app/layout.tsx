import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://swapnilverse.vercel.app";

const themeScript = `
  (function () {
    try {
      var saved = localStorage.getItem("theme");
      var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var theme = saved || (prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", theme === "dark");
      document.documentElement.dataset.theme = theme;
    } catch (error) {
      document.documentElement.classList.add("dark");
      document.documentElement.dataset.theme = "dark";
    }
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SwapnilVerse | Senior Software Engineer",
  description:
    "SwapnilVerse is the personal portfolio of Swapnil Nandapure, a Senior Software Engineer building scalable digital products across mobile, web, AI, and product platforms.",
  keywords: [
    "SwapnilVerse",
    "Swapnil Nandapure",
    "Senior Software Engineer",
    "React Native Developer",
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
    title: "SwapnilVerse | Senior Software Engineer",
    description:
      "Explore Swapnil Nandapure's portfolio featuring premium UI, scalable products, and engineering work across banking, healthcare, CRM, and e-commerce.",
    url: siteUrl,
    siteName: "SwapnilVerse",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "SwapnilVerse portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SwapnilVerse | Senior Software Engineer",
    description:
      "Personal portfolio of Swapnil Nandapure with projects, toolbox, and contact experience built for a premium product feel.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased">
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
