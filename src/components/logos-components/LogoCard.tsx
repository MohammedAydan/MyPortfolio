import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { Logo } from "@/lib/logos-lib/types";

interface LogoCardProps {
    logo: Logo;
}

export function LogoCard({ logo }: LogoCardProps) {
    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/30 bg-gradient-to-br from-card via-card to-card/80 shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02]">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

            {/* Floating Particles Effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary/20 blur-sm opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:animate-pulse" />
                <div className="absolute -bottom-1 -left-1 h-3 w-3 rounded-full bg-secondary/30 blur-sm opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="absolute top-1/2 -right-1 h-2 w-2 rounded-full bg-accent/40 blur-sm opacity-0 transition-all duration-900 group-hover:opacity-100 group-hover:animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>

            {/* Enhanced Download Button */}
            <div className="absolute right-4 top-4 z-20 flex translate-y-3 gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <a
                    href={logo.url}
                    download={`${logo.slug}.svg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn rounded-full bg-background/95 p-3 text-muted-foreground shadow-xl shadow-black/10 backdrop-blur-md transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-2xl hover:shadow-primary/25"
                    title={`Download ${logo.name} SVG`}
                    aria-label={`Download ${logo.name} SVG`}
                >
                    <Download className="h-4 w-4 transition-transform duration-200 group-hover/btn:scale-110" />
                </a>
            </div>

            {/* Logo Link */}
            <Link
                href={`/logos/${logo.slug}`}
                className="relative z-10 flex flex-1 flex-col items-center justify-center p-6 transition-all duration-300"
                aria-label={`View ${logo.name} logo details`}
            >
                {/* Logo Container with Enhanced Effects */}
                <div className="relative mb-6 flex h-24 w-24 items-center justify-center transition-all duration-500 group-hover:scale-125 sm:h-28 sm:w-28">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Logo Image */}
                    <Image
                        src={logo.url}
                        alt={`${logo.name} logo`}
                        width={112}
                        height={112}
                        className="relative max-h-full max-w-full object-contain drop-shadow-2xl transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(0,0,0,0.1)]"
                        loading="lazy"
                        unoptimized
                    />
                </div>

                {/* Logo Info with Better Typography */}
                <div className="mt-auto space-y-2 text-center">
                    <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-xl">
                        {logo.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 transition-colors duration-300 group-hover:text-muted-foreground">
                        {logo.category}
                    </p>
                </div>
            </Link>
        </article>
    );
}
