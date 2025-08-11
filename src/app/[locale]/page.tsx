import { getLocale, getTranslations } from "next-intl/server"
import { Metadata } from "next"
import Contact from "@/components/contact"
import SuccessSection from "@/components/success-section"
import AboutSection from "@/components/about-section"
import EducationSection from "@/components/education-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import HeroSection from "@/components/hero-section"
import keywords from "@/lib/keywords"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
    keywords: keywords,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
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
  };
}


export default async function Home() {
  const locale = await getLocale();
  const isRtl = locale === "ar"

  return (
    <div className={`w-full ${isRtl ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Education Section */}
      <EducationSection />

      {/* Success Data Section */}
      <SuccessSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <Contact />

      {/* Contact Info */}
      {/* <ContactInfoSection /> */}
    </div>
  )
}
