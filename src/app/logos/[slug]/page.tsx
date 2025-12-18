import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Download, Sparkles } from "lucide-react";
import { t } from "@/lib/logos-lib/tr-logos";
import { Logo } from "@/lib/logos-lib/types";
import { getLogoBySlug, getRelatedLogos, logos } from "@/lib/logos-lib/logos-data";
import { DownloadActions } from "@/components/logos-components/DownloadActions";
import Script from "next/script";

interface LogoDetailPageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all logos (SSG)
export async function generateStaticParams() {
    return logos.map((logo: Logo) => ({
        slug: logo.slug,
    }));
}

// Enhanced SEO metadata generation for individual logos
export async function generateMetadata({
    params,
}: LogoDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const logo = getLogoBySlug(slug);

    if (!logo) {
        return {
            title: "Logo Not Found | Logo Collection",
            description: "The requested logo could not be found. Browse our collection of premium tech logos.",
        };
    }

    const logoTitle = `${logo.name} Logo | Free SVG & PNG Download | ${t.site.title}`;
    const logoDescription = `Download the official ${logo.name} logo in high-quality SVG and PNG formats. ${logo.description || `Perfect for developers, designers, and ${logo.category.toLowerCase()} projects.`} Free download with transparent background.`;

    return {
        title: logoTitle,
        description: logoDescription,
        keywords: [
            // Brand specific
            `${logo.name} logo`,
            `${logo.name} logo svg`,
            `${logo.name} logo png`,
            `${logo.name} icon`,
            `${logo.name} brand`,
            // Download specific
            `download ${logo.name} logo`,
            `free ${logo.name} logo`,
            `${logo.name} logo transparent`,
            `${logo.name} vector logo`,
            // Category specific
            `${logo.category.toLowerCase()} logo`,
            `${logo.category.toLowerCase()} icon`,
            // Use cases
            `${logo.name} logo for website`,
            `${logo.name} logo for app`,
            `high quality ${logo.name} logo`,
            "official brand logo",
            "free tech logo download",
        ],
        authors: [{ name: "Logo Collection", url: "/logos" }],
        creator: logo.name,
        publisher: "Logo Collection Platform",
        category: logo.category,
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
            title: `${logo.name} Logo | Free Download`,
            description: logoDescription,
            type: "website",
            siteName: t.site.title,
            locale: "en_US",
            url: `/logos/${slug}`,
            images: [
                {
                    url: logo.url,
                    width: 800,
                    height: 800,
                    alt: `${logo.name} official logo`,
                    type: "image/svg+xml",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            site: "@logocollection",
            creator: "@logocollection",
            title: `${logo.name} Logo | Free Download`,
            description: logoDescription,
            images: [logo.url],
        },
        alternates: {
            canonical: `/logos/${slug}`,
        },
    };
}

export default async function LogoDetailPage({ params }: LogoDetailPageProps) {
    const { slug } = await params;
    const logo = getLogoBySlug(slug);

    if (!logo) {
        notFound();
    }

    const relatedLogos = getRelatedLogos(logo, 4);

    // Enhanced structured data for better SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "@id": `https://mohammed-aydan.me/logos/${slug}`,
        name: `${logo.name} Logo`,
        description: logo.description || `Official ${logo.name} logo in high-quality SVG and PNG formats`,
        contentUrl: logo.url,
        thumbnailUrl: logo.url,
        encodingFormat: "image/svg+xml",
        width: "800",
        height: "800",
        uploadDate: "2024-01-01",
        license: "https://creativecommons.org/publicdomain/zero/1.0/",
        acquireLicensePage: `https://mohammed-aydan.me/logos/${slug}`,
        creator: {
            "@type": "Organization",
            name: logo.name,
            url: logo.website || `https://mohammed-aydan.me/logos/${slug}`,
            logo: {
                "@type": "ImageObject",
                url: logo.url,
            },
        },
        about: {
            "@type": "Thing",
            name: logo.category,
            description: `${logo.name} is a ${logo.category.toLowerCase()}`,
        },
        isPartOf: {
            "@type": "CollectionPage",
            name: t.site.title,
            url: "https://mohammed-aydan.me/logos",
        },
        keywords: `${logo.name} logo, ${logo.name} svg, ${logo.name} png, ${logo.category} logo, free logo download`,
    };

    // Breadcrumb structured data
    const breadcrumbData = {
        "@context": "https://schema.org",
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
            {
                "@type": "ListItem",
                position: 3,
                name: logo.name,
                item: `https://mohammed-aydan.me/logos/${slug}`,
            },
        ],
    };

    // Product structured data for better discoverability
    const productData = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${logo.name} Logo`,
        description: logo.description || `Official ${logo.name} logo`,
        image: logo.url,
        brand: {
            "@type": "Brand",
            name: logo.name,
        },
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `https://mohammed-aydan.me/logos/${slug}`,
        },
        category: logo.category,
    };

    return (
        <>
            {/* Enhanced Structured Data for SEO */}
            <Script
                id={`logo-${slug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                strategy="beforeInteractive"
            />
            <Script
                id={`breadcrumb-${slug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
                strategy="beforeInteractive"
            />
            <Script
                id={`product-${slug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
                strategy="beforeInteractive"
            />

            <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
                <div className="container mx-auto max-w-screen-2xl px-4 py-12 md:px-8">
                    {/* Enhanced Breadcrumb Navigation */}
                    <nav className="mb-10" aria-label="Breadcrumb">
                        <Link
                            href="/logos"
                            className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-secondary/60 to-secondary/40 px-6 py-3 text-sm font-bold text-secondary-foreground shadow-lg backdrop-blur-sm transition-all duration-300 hover:from-secondary/80 hover:to-secondary hover:shadow-xl hover:scale-105"
                        >
                            <ArrowLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
                            <span>Back to all logos</span>
                            <div className="h-2 w-2 rounded-full bg-secondary-foreground/30 animate-pulse" />
                        </Link>
                    </nav>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <article className="lg:col-span-2 space-y-8">
                            {/* Enhanced Logo Preview Card */}
                            <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-card/50 shadow-2xl shadow-black/10">
                                {/* Enhanced Decorative Elements */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/15" />
                                <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-primary/15 blur-3xl animate-pulse" />
                                <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-secondary/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

                                {/* Enhanced Checkered Background */}
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,hsl(var(--muted))_25%,transparent_25%,transparent_75%,hsl(var(--muted))_75%,hsl(var(--muted))),linear-gradient(45deg,hsl(var(--muted))_25%,transparent_25%,transparent_75%,hsl(var(--muted))_75%,hsl(var(--muted)))] bg-[length:32px_32px] bg-[position:0_0,16px_16px] opacity-[0.02]" />

                                {/* Size Preview Options */}
                                <div className="absolute top-6 left-6 z-20 flex gap-2">
                                    {['Small', 'Medium', 'Large'].map((size) => (
                                        <span
                                            key={size}
                                            className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all hover:bg-background hover:text-foreground cursor-default"
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>

                                <div className="relative flex min-h-[400px] items-center justify-center p-12 md:min-h-[500px] md:p-16">
                                    {/* Logo Glow Effect */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="h-80 w-80 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
                                    </div>

                                    <Image
                                        src={logo.url}
                                        alt={`${logo.name} logo`}
                                        width={400}
                                        height={400}
                                        className="relative max-h-[320px] max-w-[85%] object-contain drop-shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_40px_rgba(0,0,0,0.15)]"
                                        priority
                                        unoptimized
                                    />

                                    {/* Floating Elements */}
                                    <div className="absolute top-8 right-8 h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.5s' }} />
                                    <div className="absolute bottom-12 left-12 h-3 w-3 rounded-full bg-secondary/60 animate-bounce" style={{ animationDelay: '1s' }} />
                                    <div className="absolute top-1/3 right-16 h-1.5 w-1.5 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '1.5s' }} />
                                </div>
                            </div>

                            {/* Enhanced Logo Information */}
                            <div className="space-y-8">
                                <header className="space-y-4">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <span className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary/15 to-primary/10 px-4 py-2 text-sm font-bold text-primary shadow-lg">
                                            <Sparkles className="h-4 w-4 animate-pulse" />
                                            {logo.category}
                                        </span>
                                        <span className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-secondary/15 to-secondary/10 px-4 py-2 text-sm font-bold text-secondary-foreground shadow-lg">
                                            <Download className="h-4 w-4" />
                                            Free Download
                                        </span>
                                    </div>
                                    <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                                        <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                                            {logo.name}
                                        </span>
                                    </h1>
                                    {logo.description && (
                                        <p className="text-xl leading-relaxed text-muted-foreground sm:text-2xl max-w-3xl">
                                            {logo.description}
                                        </p>
                                    )}
                                </header>

                                {/* Enhanced Website Link */}
                                {logo.website && (
                                    <a
                                        href={logo.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-secondary/60 to-secondary/40 px-6 py-4 text-sm font-bold text-secondary-foreground shadow-lg backdrop-blur-sm transition-all duration-300 hover:from-secondary/80 hover:to-secondary hover:shadow-xl hover:scale-105"
                                    >
                                        <ExternalLink className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                                        Visit official website
                                        <div className="h-2 w-2 rounded-full bg-secondary-foreground/30 animate-pulse" />
                                    </a>
                                )}

                                {/* Enhanced Download Section */}
                                <section className="rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-card/50 p-8 shadow-2xl backdrop-blur-sm">
                                    <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold">
                                        <Download className="h-6 w-6 text-primary" />
                                        Download Options
                                        <div className="h-2 w-2 rounded-full bg-primary/60 animate-pulse" />
                                    </h2>
                                    <DownloadActions logo={logo} />
                                </section>
                            </div>
                        </article>

                        {/* Enhanced Sidebar */}
                        <aside className="space-y-8">
                            {/* Enhanced Related Logos */}
                            {relatedLogos.length > 0 && (
                                <section className="rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-card/50 p-6 shadow-2xl backdrop-blur-sm">
                                    <h2 className="mb-6 flex items-center gap-3 text-xl font-bold">
                                        <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                                        Related {logo.category}s
                                        <div className="h-2 w-2 rounded-full bg-primary/60 animate-pulse" />
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {relatedLogos.map((related: Logo) => (
                                            <Link
                                                key={related.slug}
                                                href={`/logos/${related.slug}`}
                                                className="group flex h-32 flex-col items-center justify-center gap-3 rounded-2xl border border-border/50 bg-gradient-to-br from-background to-background/80 p-4 shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:scale-105"
                                            >
                                                <Image
                                                    src={related.url}
                                                    alt={`${related.name} logo`}
                                                    width={48}
                                                    height={48}
                                                    className="max-h-12 max-w-12 object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-lg"
                                                    unoptimized
                                                />
                                                <span className="text-center text-xs font-bold text-muted-foreground transition-colors duration-300 group-hover:text-primary line-clamp-2">
                                                    {related.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </aside>
                    </div>
                </div>
            </main>
        </>
    );
}
