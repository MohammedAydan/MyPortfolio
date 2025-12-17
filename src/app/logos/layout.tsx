import { Metadata } from "next";
import { t } from "@/lib/logos-lib/tr-logos";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        template: `%s | ${t.site.title}`,
        default: `${t.site.title} | Free SVG & PNG Logo Downloads`,
    },
    description: t.site.description,
    keywords: [
        "svg logos",
        "png logos",
        "developer logos",
        "programming logos",
        "framework logos",
        "free logo download",
        "tech logos",
        "brand logos",
    ],
    authors: [{ name: "LogoCatalog" }],
    creator: "LogoCatalog",
    publisher: "LogoCatalog",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        title: t.site.title,
        description: t.site.description,
        type: "website",
        locale: "en_US",
        siteName: t.site.title,
    },
    twitter: {
        card: "summary_large_image",
        title: t.site.title,
        description: t.site.description,
    },
};

interface LogosLayoutProps {
    children: React.ReactNode;
}

export default function LogosLayout({ children }: LogosLayoutProps) {
    return (
        <html
            suppressHydrationWarning
            className="scroll-smooth"
        >
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased ${"font-inter"}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="min-h-screen bg-background">
                        {/* Header */}
                        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                            <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
                                <Link
                                    href="/logos"
                                    className="flex items-center gap-2 font-bold text-xl"
                                >
                                    <span className="text-2xl">📦</span>
                                    <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                        {t.site.title}
                                    </span>
                                </Link>
                                <ModeToggle />
                            </div>
                        </header>

                        {/* Main Content */}
                        {children}

                        {/* Footer */}
                        <footer className="border-t border-border bg-secondary/10">
                            <div className="container mx-auto max-w-screen-2xl px-4 py-8 md:px-8">
                                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                                    <p className="text-sm text-muted-foreground">
                                        {t.site.footer}
                                    </p>
                                    <nav className="flex items-center gap-6">
                                        <Link
                                            href="/logos"
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {t.nav.logos}
                                        </Link>
                                    </nav>
                                </div>
                            </div>
                        </footer>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}


