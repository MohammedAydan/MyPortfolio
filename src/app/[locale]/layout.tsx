import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Mohammed Aydan | Full Stack Developer | Web & Mobile Development",
  description: "Full Stack Developer specializing in web and mobile development with React, Next.js, Flutter, and .NET Core",
  keywords: ["Mohammed Aydan", "Mohamed Aydan", "Full Stack Developer", "Web Development", "Mobile Development", "React", "Next.js", "Flutter", ".NET Core"],
  authors: [{ name: "Mohammed Aydan" }],
  creator: "Mohammed Aydan",
  publisher: "Mohammed Aydan",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}`,
    languages: {
      "en": `/en`,
      "ar": `/ar`
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_EG",
    url: `/`,
    siteName: "Mohammed Aydan Portfolio",
    title: "Mohammed Aydan | Full Stack Developer | Web & Mobile Development",
    description: "Full Stack Developer specializing in web and mobile development with React, Next.js, Flutter, and .NET Core",
    images: [
      {
        url: `/photo.jpg`,
        width: 800,
        height: 600,
        alt: "Mohammed Aydan"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Aydan | Full Stack Developer | Web & Mobile Development",
    description: "Full Stack Developer specializing in web and mobile development",
    images: [`/photo.jpg`]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const isRtl = locale === "ar"

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      dir={isRtl ? "rtl" : "ltr"}
      className={`scroll-smooth`}
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased ${isRtl ? "font-cairo" : "font-inter"}`}>
        <NextIntlClientProvider>

          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <Navbar locale={locale} />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>

      </body>
    </html>
  );
}
