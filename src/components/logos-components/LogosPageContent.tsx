"use client";

import { useState, useMemo, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { t, Translation } from "@/lib/logos-lib/tr-logos";
import { Logo, Category } from "@/lib/logos-lib/types";
import { LogoGrid } from "./LogoGrid";

const categoryKeys: Record<string, keyof Translation["filters"]> = {
    All: "all",
    Language: "languages",
    Framework: "frameworks",
    Tool: "tools",
    Company: "companies",
};

interface LogosPageContentProps {
    allLogos: Logo[];
    initialQuery: string;
    initialCategory: string;
    categories: Category[];
}

export function LogosPageContent({
    allLogos,
    initialQuery,
    initialCategory,
    categories,
}: LogosPageContentProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    // Client-side filtering for immediate feedback
    const filteredLogos = useMemo(() => {
        return allLogos.filter((logo) => {
            const matchesSearch = logo.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === "All" || logo.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [allLogos, searchQuery, selectedCategory]);

    const updateURL = useCallback(
        (cat: string, search: string) => {
            const params = new URLSearchParams();
            if (cat !== "All") params.set("category", cat);
            if (search) params.set("q", search);

            const queryString = params.toString();
            startTransition(() => {
                router.replace(`/logos${queryString ? `?${queryString}` : ""}`, {
                    scroll: false,
                });
            });
        },
        [router, startTransition]
    );

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        updateURL(selectedCategory, value);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        updateURL(category, searchQuery);
    };

    return (
        <>
            {/* ARIA live region for announcing filtered results to screen readers */}
            <div
                className="sr-only"
                aria-live="polite"
                aria-atomic="true"
            >
                {filteredLogos.length} logos found
            </div>

            {/* Search Input */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    // Already handled by onChange, but this provides standard form behavior
                }}
                className="group relative mb-8 w-full max-w-xl"
            >
                <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl transition-opacity opacity-0 group-focus-within:opacity-100" />
                <Search className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                {isPending && (
                    <Loader2 className="absolute right-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 animate-spin text-primary" />
                )}
                <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder={t.search.placeholder}
                    aria-label="Search logos"
                    className="relative z-10 w-full rounded-2xl border border-input/60 bg-background/80 py-4 pl-12 pr-12 text-base shadow-lg ring-offset-background backdrop-blur-md transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 hover:border-primary/40 hover:bg-background"
                />
            </form>

            {/* Category Filters */}
            <nav
                className="mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
                role="navigation"
                aria-label="Filter logos by category"
            >
                <button
                    onClick={() => handleCategoryChange("All")}
                    className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                        selectedCategory === "All"
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                            : "bg-secondary/60 text-secondary-foreground hover:bg-secondary hover:shadow-md"
                    }`}
                    aria-pressed={selectedCategory === "All"}
                >
                    {t.filters.all}
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                            selectedCategory === category
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                : "bg-secondary/60 text-secondary-foreground hover:bg-secondary hover:shadow-md"
                        }`}
                        aria-pressed={selectedCategory === category}
                    >
                        {t.filters[categoryKeys[category]] || category}
                    </button>
                ))}
            </nav>

            {/* Results Section */}
            <div className="w-full">
                <div className="min-h-[400px]">
                    {/* Results Count */}
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing{" "}
                            <span className="font-semibold text-foreground">
                                {filteredLogos.length}
                            </span>{" "}
                            {filteredLogos.length === 1 ? "logo" : "logos"}
                            {searchQuery && (
                                <span>
                                    {" "}
                                    for &quot;<span className="font-medium">{searchQuery}</span>
                                    &quot;
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Logo Grid */}
                    {filteredLogos.length > 0 ? (
                        <LogoGrid logos={filteredLogos} />
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/5 py-20 text-center">
                            <div className="mb-4 rounded-full bg-secondary/20 p-4">
                                <Search className="h-8 w-8 text-muted-foreground/40" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">No logos found</h3>
                            <p className="text-muted-foreground">
                                {t.search.noResults}
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("All");
                                    updateURL("All", "");
                                }}
                                className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
