import { Metadata } from "next";
import { Suspense } from "react";
import { t } from "@/lib/logos-lib/tr-logos";
import { logos } from "@/lib/logos-lib/logos-data";
import { Category } from "@/lib/logos-lib/types";
import { LogosPageContent } from "@/components/logos-components/LogosPageContent";

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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
                <div className="container mx-auto max-w-screen-2xl px-4 py-12 md:px-8">
                    {/* Hero Section */}
                    <header className="mb-16 flex flex-col items-center text-center">
                        <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                            <span className="mr-2">✨</span>
                            {logos.length}+ Premium Logos
                        </div>

                        <h1 className="mb-6 max-w-4xl bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                            {t.site.title}
                        </h1>

                        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                            {t.site.description}
                        </p>

                        {/* Client-side interactive filters */}
                        <Suspense
                            fallback={
                                <div className="h-24 w-full max-w-xl animate-pulse rounded-xl bg-secondary/20" />
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
