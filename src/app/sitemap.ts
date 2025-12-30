// app/sitemap.ts
import { MetadataRoute } from 'next';
import { logos } from '@/lib/logos-lib/logos-data';

const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://mohammed-aydan.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
    // Main paths
    const routes = [
        '', // Home page
    ];

    // Sections on the same page
    const sections = [
        '#about',
        '#education',
        '#success',
        '#skills',
        '#projects',
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

    // Logos main page
    const logosMainPage = {
        url: `${BASE_URL}/logos`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
    };

    // Individual logo pages
    const logoPages = logos.map((logo) => ({
        url: `${BASE_URL}/logos/${logo.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...pages, ...sectionLinks, logosMainPage, ...logoPages];
}