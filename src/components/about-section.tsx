import { Github, Mail, Phone, MapPin } from "lucide-react";
import SectionHeader from "@/components/header-section";
import { getTranslations } from "next-intl/server";
import AboutCard from "./about-card";

const AboutSection = async () => {
    const t = await getTranslations();
    return (
        <section
            id="about"
            className="py-16 sm:py-20 relative overflow-hidden px-4 sm:px-6 lg:px-8"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.08),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)]"></div>

            <SectionHeader title={t("about.title")} />

            <div className="mx-auto max-w-4xl text-lg text-muted-foreground relative z-10 sm:max-w-7xl">
                <p className="mb-10 text-center leading-relaxed text-sm md:text-base px-2 sm:px-6 md:px-12">
                    {t("about.description")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
                    <AboutCard
                        icon={Phone}
                        title="01552955862"
                        href="tel:+201552955862"
                    />
                    <AboutCard
                        icon={Mail}
                        title="mohammedaydan12@gmail.com"
                        href="mailto:mohammedaydan12@gmail.com"
                    />
                    <AboutCard
                        icon={MapPin}
                        title={t("about.location")}
                        href="https://www.google.com/maps/place/Cairo,+Egypt/@30.0505556,31.2494444,13z/data=!3m1!4b1!4m5!3m4!1s0x14584fd2a079a88d:0x6a5962d7f762e7e1!8m2!3d30.0505556!4d31.2494444"
                    />
                    <AboutCard
                        icon={Github}
                        title="github.com/MohammedAydan"
                        href="https://github.com/MohammedAydan"
                    />
                </div>
            </div>
        </section>
    );
};
export default AboutSection;
