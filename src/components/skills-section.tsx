import React from 'react'
import SectionHeader from './header-section'
import { getTranslations } from 'next-intl/server'
import SkillBadge from "@/components/skill-badge"

const SkillsSection = async () => {
    const t = await getTranslations();
    return (
        <section id="skills" className="py-16">
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
    )
}

export default SkillsSection;