import Link from "next/link"
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import SuccessCard from "@/components/success-card"
import SectionHeader from "@/components/section-header"
import { getLocale, getTranslations } from "next-intl/server"
import { Metadata } from "next"
import Image from "next/image"
import { cn } from "@/lib/utils"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const locale = await getLocale();

  return {
    metadataBase: new URL(BASE_URL),
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: `/en`,
        ar: `/ar`,
      },
    },
    openGraph: {
      title: t('metadata.title'),
      description: t('metadata.description'),
      url: `/${locale}`,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_EG',
    },
    twitter: {
      title: t('metadata.title'),
      description: t('metadata.description'),
    },
  };
}

export default async function Home() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isRtl = locale === "ar"

  return (
    <div className={`w-full ${isRtl ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <section className={cn(
        "relative pb-16 pt-32 text-white",
        // " bg-gradient-to-b from-primary to-primary/70"
      )}>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 shadow-lg">
              <Image
                width={128}
                height={128}
                src="/photo.jpg"
                alt="Mohammed Aydan"
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-bold text-transparent md:text-5xl p-2">
              {t("hero.name")}
            </h1>
            <h2 className="mb-8 text-xl text-white/90 md:text-2xl">{t("hero.title")}</h2>
            <div className="flex gap-4">
              <Link hrefLang={locale} href="https://github.com/MohammedAydan" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/20 bg-white/10 backdrop-blur hover:bg-white hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link hrefLang={locale} href="https://linkedin.com/in/mohamed-aydan" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/20 bg-white/10 backdrop-blur hover:bg-white hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link hrefLang={locale} href="mailto:mohammedaydan12@gmail.com">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/20 bg-white/10 backdrop-blur hover:bg-white hover:text-primary"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* About Section */}
      <section id="about" className="section-container">
        <SectionHeader title={t("about.title")} />
        <div className="mx-auto max-w-3xl text-lg text-muted-foreground">
          <p className="mb-6">{t("about.description")}</p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="transition-all hover:shadow-sm">
              <CardContent className="flex items-center p-4">
                <Phone className="mr-3 h-5 w-5 text-primary" />
                <span>01552955862</span>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-sm">
              <CardContent className="flex items-center p-4">
                <Mail className="mr-3 h-5 w-5 text-primary" />
                <span>mohammedaydan12@gmail.com</span>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-sm">
              <CardContent className="flex items-center p-4">
                <MapPin className="mr-3 h-5 w-5 text-primary" />
                <span>{t("about.location")}</span>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-sm">
              <CardContent className="flex items-center p-4">
                <Github className="mr-3 h-5 w-5 text-primary" />
                <span>github.com/MohammedAydan</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="bg-muted/30 py-16 dark:bg-muted/5">
        <div className="container mx-auto px-4">
          <SectionHeader title={t("education.title")} />
          <div className="mx-auto max-w-3xl">
            <Card className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold">{t("education.degree")}</h3>
                <p className="text-muted-foreground">{t("education.university")}</p>
                <p className="mt-2">{t("education.graduation")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Data Section */}
      <section id="success" className="section-container">
        <SectionHeader title={t("success.title")} />
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <SuccessCard
            icon="Code"
            title={t("success.projects.title")}
            value="10+"
            description={t("success.projects.description")}
          />
          <SuccessCard
            icon="Languages"
            title={t("success.languages.title")}
            value="7+"
            description={t("success.languages.description")}
          />
          <SuccessCard
            icon="Frameworks"
            title={t("success.frameworks.title")}
            value="5+"
            description={t("success.frameworks.description")}
          />
          <SuccessCard
            icon="Experience"
            title={t("success.experience.title")}
            value="2+"
            description={t("success.experience.description")}
          />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-muted/30 py-16 dark:bg-muted/5">
        <div className="container mx-auto px-4">
          <SectionHeader title={t("skills.title")} />
          <div className="mx-auto max-w-4xl">
            <div className="mb-10">
              <h3 className="mb-6 text-xl font-semibold">{t("skills.languages")}</h3>
              <div className="flex flex-wrap gap-3">
                <SkillBadge name="HTML" />
                <SkillBadge name="CSS" />
                <SkillBadge name="JavaScript" />
                <SkillBadge name="PHP" />
                <SkillBadge name="C#" />
                <SkillBadge name="Dart" />
                <SkillBadge name="SQL" />
              </div>
            </div>

            <div className="mb-10">
              <h3 className="mb-6 text-xl font-semibold">{t("skills.frameworks")}</h3>
              <div className="flex flex-wrap gap-3">
                <SkillBadge name="Flutter" />
                <SkillBadge name="React.js" />
                <SkillBadge name="Next.js" />
                <SkillBadge name=".NET Core" />
                <SkillBadge name="Laravel" />
              </div>
            </div>

            <div className="mb-10">
              <h3 className="mb-6 text-xl font-semibold">{t("skills.databases")}</h3>
              <div className="flex flex-wrap gap-3">
                <SkillBadge name="MySQL" />
                <SkillBadge name="Firebase" />
                <SkillBadge name="Supabase" />
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-xl font-semibold">{t("skills.tools")}</h3>
              <div className="flex flex-wrap gap-3">
                <SkillBadge name="Git" />
                <SkillBadge name="GitHub" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-container">
        <SectionHeader title={t("projects.title")} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            title={t("projects.ecommerceApi.title")}
            description={
              t("projects.ecommerceApi.description")}
            githubUrl="https://github.com/MohammedAydan/ECommerceAPI"
            technologies={[".NET Core", "C#"]}
          />

          <ProjectCard
            title={t("projects.chatApp.title")}
            description={
              t("projects.chatApp.description")}
            githubUrl="https://github.com/MohammedAydan/chatapp"
            technologies={["Flutter", "Bloc", "Firebase"]}
          />

          <ProjectCard
            title={t("projects.portfolio.title")}
            description={
              t("projects.portfolio.description")}
            githubUrl="https://github.com/MohammedAydan/portfolio"
            technologies={["Next.js", "Firebase"]}
          />

          <ProjectCard
            title={t("projects.storeApp.title")}
            description={
              t("projects.storeApp.description")}
            githubUrl="https://github.com/MohammedAydan/store"
            technologies={["Flutter", "Dart"]}
          />

          <ProjectCard
            title={t("projects.blog.title")}
            description={
              t("projects.blog.description")}
            githubUrl="https://github.com/MohammedAydan/Blog-React.js"
            technologies={["React.js", "Laravel", "Flutter", "MySQL"]}
            additionalLinks={
              [
                { label: "Backend", url: "https://github.com/MohammedAydan/BlogApi" },
                { label: "Mobile App", url: "https://github.com/MohammedAydan/Blog-flutter" },
              ]}
          />

          <ProjectCard
            title={t("projects.socialApp.title")}
            description={
              t("projects.socialApp.description")}
            githubUrl="https://github.com/MohammedAydan/socialapp"
            technologies={["Flutter", "Supabase"]}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-muted/30 py-16 dark:bg-muted/5">
        <div className="container mx-auto px-4">
          <SectionHeader title={t("contact.title")} />
          <div className="mx-auto max-w-md">
            <div className="flex flex-col space-y-4">
              <Card className="group transition-all hover:shadow-sm">
                <CardContent className="flex items-center p-4">
                  <Linkedin className="mr-3 h-6 w-6 text-primary" />
                  <Link
                    href="https://linkedin.com/in/mohamed-aydan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-between"
                  >
                    <span>linkedin.com/in/mohamed-aydan</span>
                    <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group transition-all hover:shadow-sm">
                <CardContent className="flex items-center p-4">
                  <Github className="mr-3 h-6 w-6 text-primary" />
                  <Link
                    href="https://github.com/MohammedAydan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-between"
                  >
                    <span>github.com/MohammedAydan</span>
                    <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group transition-all hover:shadow-sm">
                <CardContent className="flex items-center p-4">
                  <Mail className="mr-3 h-6 w-6 text-primary" />
                  <Link hrefLang={locale} href="mailto:mohammedaydan12@gmail.com" className="flex flex-1 items-center justify-between">
                    <span>mohammedaydan12@gmail.com</span>
                    <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group transition-all hover:shadow-sm">
                <CardContent className="flex items-center p-4">
                  <Phone className="mr-3 h-6 w-6 text-primary" />
                  <Link hrefLang={locale} href="tel:+201552955862" className="flex flex-1 items-center justify-between">
                    <span>01552955862</span>
                    <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
