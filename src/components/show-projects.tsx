"use client";

import { memo, useState, useMemo, FC } from "react";
import { Project } from "./projects-section";
import { Button } from "./ui/button";
import ProjectCard from "./project-card";

interface ShowProjectsProps {
    projects: Project[];
}

const ShowProjectsComponent: FC<ShowProjectsProps> = ({ projects = [] }) => {
    const [activeFilter, setActiveFilter] = useState<string>("All");

    const filters = useMemo(
        () => [
            "All",
            "Next.js",
            "React.js",
            "Flutter",
            ".NET Core",
            "Laravel",
            "Firebase",
            "Supabase",
        ],
        []
    );

    const filteredProjects = useMemo(() => {
        if (!projects.length) return [];
        return activeFilter === "All"
            ? projects
            : projects.filter((project) =>
                project.technologies.some(
                    (tech) => tech.toLowerCase() === activeFilter.toLowerCase()
                )
            );
    }, [activeFilter, projects]);

    return (
        <div className="relative z-10">
            {/* Filters */}
            <div className="mb-8 flex flex-wrap gap-3 justify-center px-4">
                {filters.map((filter) => (
                    <Button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        variant={activeFilter.toLowerCase() === filter.toLowerCase() ? "default" : "outline"}
                        className={`
                                px-4 py-2 rounded-full text-sm font-medium
                                transition-all duration-300 ease-in-out
                                ${activeFilter.toLowerCase() === filter.toLowerCase()
                                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                                : "bg-white text-gray-400 border-gray-300 hover:bg-gray-100 hover:border-gray-400 hover:shadow-md"
                            }
                                transform hover:scale-105 active:scale-95
                                `}
                    >
                        {filter}
                    </Button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="container mx-auto px-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={`${project.title}-${index}`}
                            title={project.title}
                            description={project.description}
                            githubUrl={project.githubUrl}
                            technologies={project.technologies}
                            additionalLinks={project.additionalLinks}
                        />
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">
                        No projects found for this filter.
                    </p>
                )}
            </div>
        </div>
    );
};

const ShowProjects = memo(ShowProjectsComponent);
ShowProjects.displayName = "ShowProjects";

export default ShowProjects;