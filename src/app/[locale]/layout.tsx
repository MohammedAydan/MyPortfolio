import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getLocale, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import keywords from "@/lib/keywords";
import type { Metadata } from "next";
import Script from "next/script"; // ✅ import Script
import { AiChatBoxProvider } from "@/contexts/ai-chat-box-context/ai-chat-box-context-context";
import AiChatBox from "@/components/ai-chat-box";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const locale = await getLocale();

  const title = t("metadata.title");
  const description = t("metadata.description");
  const url = `${BASE_URL}/${locale}`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords,
    icons: {
      icon: `${BASE_URL}/favicon.ico`,
      shortcut: `${BASE_URL}/favicon.ico`,
      apple: `${BASE_URL}/favicon.ico`,
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en`,
        ar: `${BASE_URL}/ar`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: title,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations();
  const locale = await getLocale();
  const isRtl = locale === "ar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("hero.name"),
    alternateName: t("hero.name"),
    url: BASE_URL,
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      dir={isRtl ? "rtl" : "ltr"}
      className="scroll-smooth"
    >
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6MB4RLG71W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6MB4RLG71W');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${isRtl ? "font-cairo" : "font-inter"
          }`}
      >
        <NextIntlClientProvider>
          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd),
            }}
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Navbar locale={locale} />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>

            {/* // new  */}
            <AiChatBoxProvider locale={locale}>
              <AiChatBox />
            </AiChatBoxProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}