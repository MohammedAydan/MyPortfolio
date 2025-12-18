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
        <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
            role="list"
            aria-label="Logo gallery"
        >
            {logos.map((logo, index) => (
                <div
                    key={logo.slug}
                    role="listitem"
                    className="animate-in fade-in slide-in-from-bottom-4"
                    style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both'
                    }}
                >
                    <LogoCard logo={logo} />
                </div>
            ))}
        </div>
    );
}
