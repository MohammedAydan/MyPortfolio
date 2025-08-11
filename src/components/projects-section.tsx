import React from 'react'
import SectionHeader from './header-section'
import { getTranslations } from 'next-intl/server'
import ProjectCard from "@/components/project-card"

const ProjectsSection = async () => {
    const t = await getTranslations();

    const projects = [
        {
            title: t("projects.ecommerceApp.title"),
            description: t("projects.ecommerceApp.description"),
            githubUrl: "https://github.com/MohammedAydan/ecommerce-app",
            technologies: ["Next.js"],
            additionalLinks: [
                { label: "Backend", url: "https://github.com/MohammedAydan/ECommerceAPI" },
            ],
        },
        {
            title: t("projects.ecommerceApi.title"),
            description: t("projects.ecommerceApi.description"),
            githubUrl: "https://github.com/MohammedAydan/ECommerceAPI",
            technologies: [".NET Core", "C#"],
            additionalLinks: [
                { label: "Frontend", url: "https://github.com/MohammedAydan/ecommerce-app" },
            ],
        },
        {
            title: t("projects.socialWebApp.title"),
            description: t("projects.socialWebApp.description"),
            githubUrl: "https://github.com/MohammedAydan/social-app",
            technologies: ["React.js"],
            additionalLinks: [
                { label: "Backend", url: "https://github.com/MohammedAydan/DotNetCoreSocialApi" },
            ],
        },
        {
            title: t("projects.socialApi.title"),
            description: t("projects.socialApi.description"),
            githubUrl: "https://github.com/MohammedAydan/DotNetCoreSocialApi",
            technologies: [".NET Core", "C#", "Clean Architecture"],
            additionalLinks: [
                { label: "Backend", url: "https://github.com/MohammedAydan/social-app" },
            ],
        },
        {
            title: t("projects.chatApp.title"),
            description: t("projects.chatApp.description"),
            githubUrl: "https://github.com/MohammedAydan/chatapp",
            technologies: ["Flutter", "Bloc", "Firebase"]
        },
        {
            title: t("projects.portfolio.title"),
            description: t("projects.portfolio.description"),
            githubUrl: "https://github.com/MohammedAydan/portfolio",
            technologies: ["Next.js", "Firebase"]
        },
        {
            title: t("projects.storeApp.title"),
            description: t("projects.storeApp.description"),
            githubUrl: "https://github.com/MohammedAydan/store",
            technologies: ["Flutter", "Dart"]
        },
        {
            title: t("projects.blogWebApp.title"),
            description: t("projects.blogWebApp.description"),
            githubUrl: "https://github.com/MohammedAydan/Blog-React.js",
            technologies: ["React.js", "Laravel", "Flutter", "MySQL"],
            additionalLinks: [
                { label: "Backend", url: "https://github.com/MohammedAydan/BlogApi" },
                { label: "Web App", url: "https://github.com/MohammedAydan/Blog-React.js" },
                { label: "Mobile App", url: "https://github.com/MohammedAydan/Blog-flutter" },
            ]
        },
        {
            title: t("projects.blogMobileApp.title"),
            description: t("projects.blogMobileApp.description"),
            githubUrl: "https://github.com/MohammedAydan/Blog-flutter",
            technologies: ["Flutter"],
            additionalLinks: [
                { label: "Backend", url: "https://github.com/MohammedAydan/BlogApi" },
                { label: "Web App", url: "https://github.com/MohammedAydan/Blog-React.js" },
                { label: "Mobile App", url: "https://github.com/MohammedAydan/Blog-flutter" },
            ]
        },
        {
            title: t("projects.blogApi.title"),
            description: t("projects.blogApi.description"),
            githubUrl: "https://github.com/MohammedAydan/BlogApi",
            technologies: ["Laravel", "MySQL"],
            additionalLinks: [
                { label: "Backend", url: "https://github.com/MohammedAydan/BlogApi" },
                { label: "Web App", url: "https://github.com/MohammedAydan/Blog-React.js" },
                { label: "Mobile App", url: "https://github.com/MohammedAydan/Blog-flutter" },
            ]
        },
        {
            title: t("projects.socialApp.title"),
            description: t("projects.socialApp.description"),
            githubUrl: "https://github.com/MohammedAydan/socialapp",
            technologies: ["Flutter", "Supabase"]
        }
    ];

    return (
        <section id="projects" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.08),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)]"></div>
            <SectionHeader title={t("projects.title")} />
            <div className="container mx-auto px-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10">
                {projects.map(project => (
                    <ProjectCard
                        key={project.title}
                        title={project.title}
                        description={project.description}
                        githubUrl={project.githubUrl}
                        technologies={project.technologies}
                        additionalLinks={project.additionalLinks}
                    />
                ))}
            </div>
        </section>
    )
}

export default ProjectsSection;
