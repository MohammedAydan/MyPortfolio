export const logoTranslations = {
    site: {
        title: 'LogoCatalog',
        description: 'The ultimate collection of SVG, PNG logos for developers and designers.',
        footer: `© ${new Date().getFullYear()} LogoCatalog. All rights reserved.`,
    },
    nav: {
        logos: 'Logos',
        categories: 'Categories',
        tools: 'Tools',
    },
    search: {
        placeholder: 'Search 10,000+ logos...',
        noResults: 'No logos found.',
    },
    filters: {
        all: 'All',
        languages: 'Languages',
        frameworks: 'Frameworks',
        tools: 'Tools',
        companies: 'Companies',
    },
    actions: {
        download: 'Download',
        preview: 'Preview',
    },
} as const;

export type Translation = typeof logoTranslations;
// Export alias for backwards compatibility
export const t = logoTranslations;
