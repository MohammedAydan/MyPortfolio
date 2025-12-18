import { Metadata } from "next";
import { Suspense } from "react";
import { t } from "@/lib/logos-lib/tr-logos";
import { logos } from "@/lib/logos-lib/logos-data";
import { Category } from "@/lib/logos-lib/types";
import { LogosPageContent } from "@/components/logos-components/LogosPageContent";
import Script from "next/script";

// SEO Metadata
export const metadata: Metadata = {
    title: `${t.site.title} | Free SVG & PNG Logo Downloads for Developers`,
    description: `${t.site.description} Download high-quality logos for React, Vue, Angular, TypeScript, JavaScript, Next.js, Tailwind CSS, and more.`,
    keywords: [
        "svg logos",
        "png logos",
        "developer logos",
        "programming logos",
        "framework logos",
        "free logo download",
        "react logo",
        "vue logo",
        "typescript logo",
        "javascript logo",
        "nextjs logo",
        "tailwind css logo",
    ],
    openGraph: {
        title: t.site.title,
        description: t.site.description,
        type: "website",
        siteName: t.site.title,
    },
    twitter: {
        card: "summary_large_image",
        title: t.site.title,
        description: t.site.description,
    },
    alternates: {
        canonical: "/logos",
    },
};

// Categories configuration
const CATEGORIES: Category[] = ["Language", "Framework", "Tool", "Company"];

interface LogosPageProps {
    searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}

export default async function LogosPage({ searchParams }: LogosPageProps) {
    const params = await searchParams;
    const searchQuery = params.q || "";
    const selectedCategory = params.category || "All";
    const currentPage = Math.max(1, parseInt(params.page || "1", 10));

    // Generate structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: t.site.title,
        description: t.site.description,
        numberOfItems: logos.length,
        itemListElement: logos.slice(0, 10).map((logo, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "ImageObject",
                name: logo.name,
                description: logo.description,
                contentUrl: logo.url,
            },
        })),
    };

    return (
        <>
            {/* Structured Data for SEO */}
            <Script
                id={selectedCategory + "_" + currentPage}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
                <div className="container mx-auto max-w-screen-2xl px-4 py-16 md:px-8">
                    {/* Enhanced Hero Section */}
                    <header className="mb-20 flex flex-col items-center text-center">
                        <div className="group mb-8 inline-flex items-center rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-2 text-sm font-bold text-primary shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
                            <span className="mr-3 animate-pulse">✨</span>
                            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                {logos.length}+ Premium Logos
                            </span>
                            <span className="ml-3 animate-pulse">🚀</span>              
                        </div>

                        <h1 className="mb-8 max-w-5xl bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl lg:text-7xl xl:text-8xl">
                            {t.site.title}
                        </h1>

                        <p className="mb-12 max-w-3xl text-xl leading-relaxed text-muted-foreground sm:text-2xl lg:text-3xl">
                            {t.site.description}
                        </p>

                        {/* Animated Stats */}
                        <div className="mb-12 flex flex-wrap items-center justify-center gap-8 text-center">
                            <div className="group rounded-2xl bg-card/50 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105">
                                <div className="text-3xl font-bold text-primary mb-1">{logos.length}</div>
                                <div className="text-sm text-muted-foreground">Logos Available</div>
                            </div>
                            <div className="group rounded-2xl bg-card/50 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105">
                                <div className="text-3xl font-bold text-secondary-foreground mb-1">SVG + PNG</div>
                                <div className="text-sm text-muted-foreground">Formats</div>
                            </div>
                            <div className="group rounded-2xl bg-card/50 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105">
                                <div className="text-3xl font-bold text-accent-foreground mb-1">Free</div>
                                <div className="text-sm text-muted-foreground">Downloads</div>
                            </div>
                        </div>

                        {/* Client-side interactive filters */}
                        <Suspense
                            fallback={
                                <div className="h-32 w-full max-w-2xl animate-pulse rounded-3xl bg-secondary/20 backdrop-blur-sm" />
                            }
                        >
                            <LogosPageContent
                                allLogos={logos}
                                initialQuery={searchQuery}
                                initialCategory={selectedCategory}
                                initialPage={currentPage}
                                categories={CATEGORIES}
                            />
                        </Suspense>
                    </header>
                </div>
            </main>
        </>
    );
}
