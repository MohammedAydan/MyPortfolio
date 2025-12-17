import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Download, Sparkles } from "lucide-react";
import { t } from "@/lib/logos-lib/tr-logos";
import { Logo } from "@/lib/logos-lib/types";
import { getLogoBySlug, getRelatedLogos, logos } from "@/lib/logos-lib/logos-data";
import { AdUnit } from "@/components/logos-components/AdUnit";
import { DownloadActions } from "@/components/logos-components/DownloadActions";

const AD_SLOT_SIDEBAR_TOP = process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR_TOP;
const AD_SLOT_SIDEBAR_BOTTOM = process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR_BOTTOM;
const AD_SLOT_DETAIL_BOTTOM = process.env.NEXT_PUBLIC_AD_SLOT_DETAIL_BOTTOM;

interface LogoDetailPageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all logos (SSG)
export async function generateStaticParams() {
    return logos.map((logo: Logo) => ({
        slug: logo.slug,
    }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
    params,
}: LogoDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const logo = getLogoBySlug(slug);

    if (!logo) {
        return {
            title: "Logo Not Found",
        };
    }

    return {
        title: `${logo.name} Logo | Download Free SVG & PNG - ${t.site.title}`,
        description: `Download the official ${logo.name} logo in SVG and PNG formats. ${logo.description || `High-quality ${logo.name} logo for developers and designers.`}`,
        keywords: [
            `${logo.name} logo`,
            `${logo.name} svg`,
            `${logo.name} png`,
            `${logo.name} icon`,
            `download ${logo.name} logo`,
            `${logo.category.toLowerCase()} logo`,
            "free logo download",
        ],
        openGraph: {
            title: `${logo.name} Logo - ${t.site.title}`,
            description: logo.description || `Download the official ${logo.name} logo`,
            images: [
                {
                    url: logo.url,
                    width: 512,
                    height: 512,
                    alt: `${logo.name} logo`,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${logo.name} Logo`,
            description: logo.description || `Download the official ${logo.name} logo`,
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

    // Structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        name: `${logo.name} Logo`,
        description: logo.description,
        contentUrl: logo.url,
        thumbnailUrl: logo.url,
        encodingFormat: "image/svg+xml",
        creator: {
            "@type": "Organization",
            name: logo.name,
            url: logo.website,
        },
    };

    return (
        <>
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
                <div className="container mx-auto max-w-screen-2xl px-4 py-8 md:px-8">
                    {/* Breadcrumb Navigation */}
                    <nav className="mb-8" aria-label="Breadcrumb">
                        <Link
                            href="/logos"
                            className="group inline-flex items-center gap-2 rounded-lg bg-secondary/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to all logos
                        </Link>
                    </nav>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <article className="lg:col-span-2 space-y-8">
                            {/* Logo Preview Card */}
                            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
                                {/* Decorative Elements */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10" />
                                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                                <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />

                                {/* Checkered Background Pattern */}
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,hsl(var(--muted))_25%,transparent_25%,transparent_75%,hsl(var(--muted))_75%,hsl(var(--muted))),linear-gradient(45deg,hsl(var(--muted))_25%,transparent_25%,transparent_75%,hsl(var(--muted))_75%,hsl(var(--muted)))] bg-[length:24px_24px] bg-[position:0_0,12px_12px] opacity-[0.03]" />

                                <div className="relative flex min-h-[350px] items-center justify-center p-12 md:min-h-[450px] md:p-16">
                                    <Image
                                        src={logo.url}
                                        alt={`${logo.name} logo`}
                                        width={300}
                                        height={300}
                                        className="max-h-[280px] max-w-[80%] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                        priority
                                        unoptimized
                                    />
                                </div>
                            </div>

                            {/* Logo Information */}
                            <div className="space-y-6">
                                <header>
                                    <div className="mb-3 flex items-center gap-3">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                            <Sparkles className="h-3 w-3" />
                                            {logo.category}
                                        </span>
                                    </div>
                                    <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                        {logo.name}
                                    </h1>
                                    {logo.description && (
                                        <p className="text-lg text-muted-foreground sm:text-xl">
                                            {logo.description}
                                        </p>
                                    )}
                                </header>

                                {/* Website Link */}
                                {logo.website && (
                                    <a
                                        href={logo.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-lg bg-secondary/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Visit official website
                                    </a>
                                )}

                                {/* Download Section */}
                                <section className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                                    <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold">
                                        <Download className="h-5 w-5 text-primary" />
                                        Download Options
                                    </h2>
                                    <DownloadActions logo={logo} />
                                </section>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="space-y-8">
                            {/* Top Ad */}
                            <AdUnit
                                label="Advertisement"
                                className="min-h-[300px]"
                                slotId={AD_SLOT_SIDEBAR_TOP}
                                variant="display"
                            />

                            {/* Related Logos */}
                            {relatedLogos.length > 0 && (
                                <section className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                                    <h2 className="mb-4 text-lg font-semibold">
                                        Related {logo.category}s
                                    </h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        {relatedLogos.map((related: Logo) => (
                                            <Link
                                                key={related.slug}
                                                href={`/logos/${related.slug}`}
                                                className="group flex h-28 flex-col items-center justify-center gap-2 rounded-xl border border-border/50 bg-background p-4 transition-all hover:border-primary/50 hover:shadow-lg"
                                            >
                                                <Image
                                                    src={related.url}
                                                    alt={`${related.name} logo`}
                                                    width={40}
                                                    height={40}
                                                    className="max-h-10 object-contain transition-transform group-hover:scale-110"
                                                    unoptimized
                                                />
                                                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
                                                    {related.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Bottom Sticky Ad */}
                            <div className="sticky top-24">
                                <AdUnit
                                    label="Sponsored"
                                    className="min-h-[250px]"
                                    slotId={AD_SLOT_SIDEBAR_BOTTOM}
                                    variant="display"
                                />
                            </div>
                        </aside>
                    </div>

                    {/* Bottom Ad */}
                    <div className="mt-16">
                        <AdUnit
                            label="Sponsored Content"
                            className="min-h-[120px]"
                            slotId={AD_SLOT_DETAIL_BOTTOM}
                            variant="in-article"
                        />
                    </div>
                </div>
            </main>
        </>
    );
}
