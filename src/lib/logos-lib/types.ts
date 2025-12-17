export interface Logo {
    slug: string;
    name: string;
    category: 'Language' | 'Framework' | 'Tool' | 'Database' | 'Cloud' | 'Company' | 'Library' | 'Platform' | 'Service' | 'OS';
    url: string; // Path to SVG
    website: string;
    description?: string;
}
    
export type Category = Logo['category'];
