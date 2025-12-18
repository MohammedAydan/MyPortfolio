import { Logo } from "@/lib/logos-lib/types";
import { LogoCard } from "./LogoCard";

interface LogoGridProps {
    logos: Logo[];
}

export function LogoGrid({ logos }: LogoGridProps) {
    if (logos.length === 0) {
        return null;
    }

    return (
        <section
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
            role="list"
            aria-label={`Grid of ${logos.length} ${logos.length === 1 ? 'logo' : 'logos'}`}
        >
            {logos.map((logo, index) => (
                <article
                    key={logo.slug}
                    role="listitem"
                    className="animate-in fade-in slide-in-from-bottom-4"
                    style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both'
                    }}
                >
                    <LogoCard logo={logo} />
                </article>
            ))}
        </section>
    );
}
