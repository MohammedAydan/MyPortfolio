import { Metadata } from "next";
import { Suspense } from "react";
import { t } from "@/lib/logos-lib/tr-logos";
import { logos } from "@/lib/logos-lib/logos-data";
import { Category } from "@/lib/logos-lib/types";
import { LogosPageContent } from "@/components/logos-components/LogosPageContent";
import Script from "next/script";

// Enhanced SEO Metadata
export const metadata: Metadata = {
    title: `${t.site.title} | Free High-Quality SVG & PNG Logo Downloads for Developers & Designers`,
    description: `${t.site.description} Download ${logos.length}+ premium quality logos including React, Vue, Angular, TypeScript, JavaScript, Next.js, Tailwind CSS, and more. Free SVG and PNG formats with transparent backgrounds.`,
    keywords: [
        // Primary Keywords
        "free logo download",
        "svg logos download",
        "png logos download",
        "developer logos",
        "programming logos",
        "tech logos",
        "framework logos",
        "brand logos",
        // Technology Specific
        "react logo svg",
        "vue logo svg",
        "angular logo svg",
        "typescript logo svg",
        "javascript logo svg",
        "nextjs logo svg",
        "tailwind css logo svg",
        "node js logo svg",
        // Format Specific
        "transparent background logos",
        "vector logos",
        "scalable logos",
        "high resolution logos",
        // Use Cases
        "logos for developers",
        "logos for designers",
        "web development logos",
        "open source logos",
        "free tech brand logos",
    ],
    authors: [{ name: "Logo Collection", url: "/logos" }],
    creator: "Logo Collection Platform",
    publisher: "Logo Collection Platform",
    category: "Technology",
    classification: "Logo Repository",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        title: `${t.site.title} | ${logos.length}+ Free Premium Logos`,
        description: `Download high-quality SVG & PNG logos for your projects. ${logos.length}+ tech brand logos available for free with transparent backgrounds.`,
        type: "website",
        siteName: t.site.title,
        locale: "en_US",
        url: "/logos",
        images: [
            {
                url: "/og-image-logos.png",
                width: 1200,
                height: 630,
                alt: `${t.site.title} - Free Logo Downloads`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@logocollection",
        creator: "@logocollection",
        title: `${t.site.title} | ${logos.length}+ Free Premium Logos`,
        description: `Download high-quality SVG & PNG logos. ${logos.length}+ tech brands available.`,
        images: ["/twitter-image-logos.png"],
    },
    alternates: {
        canonical: "/logos",
        types: {
            "application/rss+xml": "/logos/rss.xml",
        },
    },
    verification: {
        google: "your-google-verification-code",
        // yandex: "your-yandex-verification-code",
        // bing: "your-bing-verification-code",
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

    // Enhanced structured data for better SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: t.site.title,
        description: t.site.description,
        url: "https://mohammed-aydan.me/logos",
        inLanguage: "en-US",
        isPartOf: {
            "@type": "WebSite",
            name: "Your Site Name",
            url: "https://mohammed-aydan.me",
        },
        numberOfItems: logos.length,
        about: {
            "@type": "Thing",
            name: "Logo Collection",
            description: "A comprehensive collection of technology brand logos",
        },
        keywords: "svg logos, png logos, free logo download, developer logos, tech brand logos",
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString(),
        publisher: {
            "@type": "Organization",
            name: "Logo Collection",
            logo: {
                "@type": "ImageObject",
                url: "https://mohammed-aydan.me/logo.png",
            },
        },
        mainEntity: {
            "@type": "ItemList",
            numberOfItems: logos.length,
            itemListElement: logos.slice(0, 20).map((logo, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                    "@type": "ImageObject",
                    "@id": `https://mohammed-aydan.me/logos/${logo.slug}`,
                    name: `${logo.name} Logo`,
                    description: logo.description || `Official ${logo.name} logo in SVG and PNG formats`,
                    contentUrl: logo.url,
                    thumbnailUrl: logo.url,
                    encodingFormat: "image/svg+xml",
                    license: "https://creativecommons.org/publicdomain/zero/1.0/",
                    acquireLicensePage: `https://mohammed-aydan.me/logos/${logo.slug}`,
                    creator: {
                        "@type": "Organization",
                        name: logo.name,
                    },
                    about: {
                        "@type": "Thing",
                        name: logo.category,
                    },
                },
            })),
        },
        breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://mohammed-aydan.me",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Logos",
                    item: "https://mohammed-aydan.me/logos",
                },
            ],
        },
    };

    return (
        <>
            {/* Structured Data for SEO */}
            <Script
                id={`logos-page-${selectedCategory}-${currentPage}`}
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <main 
                id="main-content" 
                className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10"
                role="main"
            >
                {/* Skip to search link for keyboard navigation */}
                <a 
                    href="#logo-search" 
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    Skip to search
                </a>

                <div className="container mx-auto max-w-screen-2xl px-4 py-16 md:px-8">
                    {/* Enhanced Hero Section */}
                    <header className="mb-20 flex flex-col items-center text-center">
                        <div className="group mb-8 inline-flex items-center rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-2 text-sm font-bold text-primary shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10" aria-label={`${logos.length} premium logos available`}>
                            <span className="mr-3 animate-pulse" aria-hidden="true">✨</span>
                            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                {logos.length}+ Premium Logos
                            </span>
                            <span className="ml-3 animate-pulse" aria-hidden="true">🚀</span>              
                        </div>

                        <h1 className="mb-8 max-w-5xl bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl lg:text-7xl xl:text-8xl">
                            {t.site.title}
                        </h1>

                        <p className="mb-12 max-w-3xl text-xl leading-relaxed text-muted-foreground sm:text-2xl lg:text-3xl">
                            {t.site.description}
                        </p>

                        {/* Animated Stats */}
                        <div className="mb-12 flex flex-wrap items-center justify-center gap-8 text-center" role="region" aria-label="Logo collection statistics">
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
