import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Nav } from "@/components/nav";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inertia — A Habit Tracker That Respects Your Wallet",
  description:
    "A beautifully designed habit tracker with a free core experience and optional Pro later. No ads. No data harvesting.",
  keywords: ["habit tracker", "free core", "lifetime purchase", "habit building", "productivity", "ios", "inertia"],
  authors: [{ name: "Inertia Team" }],
  creator: "Inertia",
  publisher: "Inertia",
  applicationName: "Inertia",
  
  // Favicons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://getinertia.app",
    siteName: "Inertia",
    title: "Inertia — A Habit Tracker That Respects Your Wallet",
    description: "Free core habit tracking with optional Pro later (yearly or lifetime). No ads. No data harvesting.",
    images: [
      {
        url: "/og-image.png", // You'll need to create this 1200x630 image
        width: 1200,
        height: 630,
        alt: "Inertia - The Anti-Subscription Habit Tracker",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@getinertiaapp", // Replace with your Twitter handle
    creator: "@getinertiaapp", // Replace with your Twitter handle  
    title: "Inertia — A Habit Tracker That Respects Your Wallet",
    description: "Free core habit tracking. Optional Pro later. No ads. No data harvesting.",
    images: ["/og-image.png"],
  },
  
  // Apple
  appleWebApp: {
    capable: true,
    title: "Inertia",
    statusBarStyle: "black-translucent",
  },
  
  // Verification (add your verification codes when you have them)
  // verification: {
  //   google: "your-google-verification-code",
  //   other: {
  //     "apple-mobile-web-app-capable": ["yes"],
  //   },
  // },
  
  // Manifest
  manifest: "/site.webmanifest",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Nav />
        <LenisProvider>{children}</LenisProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
