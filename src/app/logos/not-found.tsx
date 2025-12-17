import Link from "next/link";
import { FileQuestion, ArrowLeft, Search } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Logo Not Found",
    description: "The logo you're looking for could not be found.",
};

export default function LogoNotFound() {
    return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <div className="mb-6 rounded-full bg-secondary/20 p-6">
                <FileQuestion className="h-16 w-16 text-muted-foreground/50" />
            </div>

            <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Logo Not Found
            </h1>

            <p className="mb-8 max-w-md text-lg text-muted-foreground">
                Sorry, we couldn&apos;t find the logo you&apos;re looking for. It may have
                been removed or the URL might be incorrect.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                    href="/logos"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl"
                >
                    <Search className="h-4 w-4" />
                    Browse All Logos
                </Link>
                <Link
                    href="/logos"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-input bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Go Back
                </Link>
            </div>
        </main>
    );
}
