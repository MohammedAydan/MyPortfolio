// app/sitemap.ts
import { MetadataRoute } from 'next';

const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
    // Main paths
    const routes = [
        '', // Home page
    ];

    // Sections on the same page
    const sections = [
        '#about',
        '#projects',
        '#services',
        '#contact',
    ];

    // Available languages
    const locales = ['en', 'ar'];

    // Core pages
    const pages = routes.flatMap((route) =>
        locales.map((locale) => {
            const localePath = locale === 'en' ? route : `/${locale}${route}`;
            return {
                url: `${BASE_URL}${localePath}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 1.0,
            };
        })
    );

    // Sections as separate links in the form of hashes (#)
    const sectionLinks = sections.flatMap((section) =>
        locales.map((locale) => {
            const localePath = locale === 'en' ? '' : `/${locale}`;
            return {
                url: `${BASE_URL}${localePath}${section}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.8,
            };
        })
    );

    return [...pages, ...sectionLinks];
}