import SectionHeader from "@/components/header-section"
import SuccessCard from "@/components/success-card"
import { getTranslations } from "next-intl/server"

export default async function SuccessSection() {
    const t = await getTranslations();

    return (
        <section id="success" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.08),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)]"></div>
            <SectionHeader title={t("success.title")} />
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10 px-4">
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
    )
}
