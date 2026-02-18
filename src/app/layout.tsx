import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
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
  title: "Momentum — The Anti-Subscription Habit Tracker",
  description:
    "A brutally honest, beautifully designed habit tracker that respects your wallet.",
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
      </body>
    </html>
  );
}
