import { Logo } from "./types";

export const logos: Logo[] = [
    {
        slug: 'react',
        name: 'React',
        category: 'Framework',
        url: 'https://cdn.worldvectorlogo.com/logos/react-2.svg',
        website: 'https://react.dev',
        description: 'The library for web and native user interfaces'
    },
    {
        slug: 'svelte',
        name: 'Svelte',
        category: 'Framework',
        url: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg',
        website: 'https://svelte.dev',
        description: 'Cybernetically enhanced web apps'
    },
    {
        slug: 'vue',
        name: 'Vue.js',
        category: 'Framework',
        url: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg',
        website: 'https://vuejs.org',
        description: 'The Progressive JavaScript Framework'
    },
    {
        slug: 'angular',
        name: 'Angular',
        category: 'Framework',
        url: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg',
        website: 'https://angular.io',
        description: 'The modern web developer\'s platform'
    },
    {
        slug: 'typescript',
        name: 'TypeScript',
        category: 'Language',
        url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
        website: 'https://typescriptlang.org',
        description: 'JavaScript with syntax for types'
    },
    {
        slug: 'javascript',
        name: 'JavaScript',
        category: 'Language',
        url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
        website: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        description: 'The programming language of the Web'
    },
    {
        slug: 'nextjs',
        name: 'Next.js',
        category: 'Framework',
        url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg',
        website: 'https://nextjs.org',
        description: 'The React Framework for the Web'
    },
    {
        slug: 'tailwindcss',
        name: 'Tailwind CSS',
        category: 'Tool',
        url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
        website: 'https://tailwindcss.com',
        description: 'Rapidly build modern websites without ever leaving your HTML'
    },
];

/**
 * Retrieves a logo by its unique slug identifier
 * @param slug - The unique identifier for the logo (must be a string)
 * @returns The logo object if found, undefined otherwise
 */
export function getLogoBySlug(slug: string): Logo | undefined {
    // Basic runtime validation and normalization of the slug parameter
    if (typeof slug !== 'string' || !slug.trim()) {
        return undefined;
    }

    const normalizedSlug = slug.trim().toLowerCase();
    return logos.find(logo => logo.slug === normalizedSlug);
}

/**
 * Retrieves related logos based on the same category
 * @param logo - The source logo to find related items for
 * @param limit - Maximum number of related logos to return (default: 4)
 * @returns Array of related logos from the same category
 */
export function getRelatedLogos(logo: Logo, limit: number = 4): Logo[] {
    return logos
        .filter(l => l.category === logo.category && l.slug !== logo.slug)
        .slice(0, limit);
}
