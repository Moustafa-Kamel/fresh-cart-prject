import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import Providers from "@/components/providers/Providers";
import StoreProvider from "@/components/providers/StoreProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"),
  ),
  openGraph: {
    type: "website",
    siteName: "FreshCart",
    title: "FreshCart",
    description:
      "Shop quality products from fashion to electronics with FreshCart.",
    images: [{ url: "/login.webp", alt: "FreshCart shopping" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FreshCart",
    description:
      "Shop quality products from fashion to electronics with FreshCart.",
    images: ["/login.webp"],
  },
  title: { default: "FreshCart", template: "%s | FreshCart" },
  description:
    "Shop quality products from fashion to electronics with FreshCart.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full font-sans antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Link
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4"
        >
          Skip to content
        </Link>
        <Providers>
          <StoreProvider>
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
