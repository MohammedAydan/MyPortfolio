import React from 'react'
import SectionHeader from './header-section'
import { getTranslations } from 'next-intl/server'

const EducationSection = async () => {
    const t = await getTranslations();
    
    return (
        <section id="education" className="py-16">
            <div className="container mx-auto px-4">
                <SectionHeader title={t("education.title")} />
                <div className="mx-auto max-w-3xl">
                    <div className="transition-all">
                        <div className="p-6 flex flex-col items-center">
                            <h3 className="text-xl font-semibold sm:text-2xl">{t("education.degree")}</h3>
                            <p className="text-muted-foreground text-sm sm:text-base">{t("education.university")}</p>
                            <p className="mt-2 text-sm sm:text-base">{t("education.graduation")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EducationSection