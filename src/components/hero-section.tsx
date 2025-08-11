import { getLocale, getTranslations } from "next-intl/server"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code2, FileCode, Github, Linkedin, Mail, ArrowDown } from "lucide-react"

const HeroSection = async () => {
    const t = await getTranslations()
    const locale = await getLocale()

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[length:60px_60px] bg-[image:radial-gradient(circle_at_center,rgba(120,119,198,0.1)_2px,transparent_2px)] animate-pulse" />
            </div>

            {/* Gentle Floating Code Icons */}
            <div className="absolute inset-0 pointer-events-none animate-pulse">
                {[
                    { Icon: Code2, pos: "top-20 left-10 md:left-20", size: "h-6 w-6 md:h-8 md:w-8", color: "text-slate-300 dark:text-slate-600", anim: "animate-float-slow" },
                    { Icon: FileCode, pos: "top-40 right-10 md:right-20", size: "h-5 w-5 md:h-7 md:w-7", color: "text-slate-400 dark:text-slate-500", anim: "animate-float-slow-reverse" },
                    { Icon: Code2, pos: "bottom-40 left-16 md:left-32", size: "h-7 w-7 md:h-9 md:w-9", color: "text-slate-300 dark:text-slate-600", anim: "animate-float-medium" },
                    { Icon: FileCode, pos: "bottom-20 right-16 md:right-32", size: "h-6 w-6 md:h-8 md:w-8", color: "text-slate-400 dark:text-slate-500", anim: "animate-float-medium-reverse" },
                    { Icon: Code2, pos: "top-1/2 left-4 md:left-8", size: "h-5 w-5 md:h-6 md:w-6", color: "text-slate-300 dark:text-slate-600", anim: "animate-float-fast" },
                    { Icon: FileCode, pos: "top-1/2 right-4 md:right-8", size: "h-6 w-6 md:h-7 md:w-7", color: "text-slate-400 dark:text-slate-500", anim: "animate-float-fast-reverse" },
                ].map(({ Icon, pos, size, color, anim }, i) => (
                    <div key={i} className={anim}>
                        <Icon className={`absolute ${pos} ${size} ${color} animate-bounce`} />
                    </div>
                ))}
            </div>

            {/* Main Content Container */}
            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center space-y-8">

                    {/* Profile Image with Modern Styling */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/60 to-secondary/60 rounded-full opacity-75 group-hover:opacity-100 blur-sm transition-all duration-300 animate-pulse" />
                        <div className="relative h-28 w-28 md:h-36 md:w-36 lg:h-40 lg:w-40 overflow-hidden rounded-full border-4 border-background shadow-2xl">
                            <Image
                                width={160}
                                height={160}
                                src="/photo.jpg"
                                alt="Mohammed Aydan"
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                priority
                            />
                        </div>
                    </div>

                    {/* Name with Subtle Gradient */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold animate-fade-in-slow">
                            <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-white dark:to-slate-100 bg-clip-text text-transparent">
                                {t("hero.name")}
                            </span>
                        </h1>

                        {/* Subtitle with Gentle Animation */}
                        <h2 className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 font-normal tracking-wide animate-fade-in-delayed">
                            {t("hero.title")}
                        </h2>
                    </div>

                    {/* Social Links with Modern Hover Effects */}
                    <div className="flex gap-4 md:gap-6 pt-4">
                        {[
                            {
                                href: "https://github.com/MohammedAydan",
                                icon: Github,
                                label: "GitHub",
                                hoverColor: "hover:bg-gray-900 hover:text-white"
                            },
                            {
                                href: "https://linkedin.com/in/mohamed-aydan",
                                icon: Linkedin,
                                label: "LinkedIn",
                                hoverColor: "hover:bg-blue-600 hover:text-white"
                            },
                            {
                                href: "mailto:mohammedaydan12@gmail.com",
                                icon: Mail,
                                label: "Email",
                                hoverColor: "hover:bg-red-500 hover:text-white"
                            }
                        ].map(({ href, icon: Icon, label, hoverColor }, index) => (
                            <Link
                                key={label}
                                hrefLang={locale}
                                href={href}
                                target={href.startsWith('http') ? "_blank" : undefined}
                                rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                                className="group"
                            >
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className={cn(
                                        "h-12 w-12 md:h-14 md:w-14 rounded-2xl border-2",
                                        "bg-background/50 backdrop-blur-md shadow-lg",
                                        "border-border/40 hover:border-primary/50",
                                        "transition-all duration-300 transform hover:scale-110 hover:shadow-xl",
                                        "animate-fade-in-up",
                                        hoverColor
                                    )}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <Icon className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-300 group-hover:scale-110" />
                                    <span className="sr-only">{label}</span>
                                </Button>
                            </Link>
                        ))}
                    </div>

                    {/* Call to Action - Scroll Indicator */}
                    <div className="pt-8 animate-gentle-bounce">
                        <ArrowDown className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection