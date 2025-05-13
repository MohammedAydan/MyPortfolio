// app/sitemap.ts
import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
    // Define your routes here
    const routes = [
        '',
        // Add all your public routes
    ];

    // Generate sitemap entries for each locale
    const locales = ['en', 'ar'];

    const sitemapEntries = routes.flatMap(route => {
        return locales.map(locale => {
            const localePath = locale === 'en' ? route : `/${locale}${route}`;
            return {
                url: `${BASE_URL}${localePath}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: route === '' ? 1 : 0.8,
            };
        });
    });

    return sitemapEntries;
}