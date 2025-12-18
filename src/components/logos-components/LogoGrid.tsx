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
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
            role="list"
            aria-label="Logo gallery"
        >
            {logos.map((logo) => (
                <div key={logo.slug} role="listitem">
                    <LogoCard logo={logo} />
                </div>
            ))}
        </div>
    );
}
