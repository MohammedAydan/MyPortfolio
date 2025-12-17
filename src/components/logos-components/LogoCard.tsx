import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { Logo } from "@/lib/logos-lib/types";

interface LogoCardProps {
    logo: Logo;
}

export function LogoCard({ logo }: LogoCardProps) {
    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Quick Download Button */}
            <div className="absolute right-3 top-3 z-20 flex translate-y-2 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <a
                    href={logo.url}
                    download={`${logo.slug}.svg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-background/90 p-2 text-muted-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                    title={`Download ${logo.name} SVG`}
                    aria-label={`Download ${logo.name} SVG`}
                >
                    <Download className="h-4 w-4" />
                </a>
            </div>

            {/* Logo Link */}
            <Link
                href={`/logos/${logo.slug}`}
                className="relative z-10 flex flex-1 flex-col items-center justify-center p-6"
                aria-label={`View ${logo.name} logo details`}
            >
                {/* Logo Image */}
                <div className="relative mb-4 flex h-20 w-20 items-center justify-center transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
                    <Image
                        src={logo.url}
                        alt={`${logo.name} logo`}
                        width={96}
                        height={96}
                        className="max-h-full max-w-full object-contain drop-shadow-md"
                        loading="lazy"
                        unoptimized
                    />
                </div>

                {/* Logo Info */}
                <div className="mt-auto space-y-1 text-center">
                    <h3 className="line-clamp-1 text-base font-bold tracking-tight text-foreground sm:text-lg">
                        {logo.name}
                    </h3>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {logo.category}
                    </p>
                </div>
            </Link>

            {/* Mobile Actions */}
            <div className="flex gap-2 border-t border-border/50 p-3 lg:hidden">
                <a
                    href={logo.url}
                    download={`${logo.slug}.svg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-secondary py-2 text-xs font-medium transition-colors hover:bg-secondary/80"
                >
                    <Download className="h-3.5 w-3.5" />
                    Download
                </a>
                <Link
                    href={`/logos/${logo.slug}`}
                    className="flex flex-1 items-center justify-center rounded-lg bg-primary py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    Details
                </Link>
            </div>
        </article>
    );
}
