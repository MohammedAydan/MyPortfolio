"use client";

import { useState, useMemo, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { t, Translation } from "@/lib/logos-lib/tr-logos";
import { Logo, Category } from "@/lib/logos-lib/types";
import { LogoGrid } from "./LogoGrid";

const ITEMS_PER_PAGE = 24;

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
    initialPage: number;
    categories: Category[];
}

export function LogosPageContent({
    allLogos,
    initialQuery,
    initialCategory,
    initialPage = 1,
    categories,
}: LogosPageContentProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [currentPage, setCurrentPage] = useState(initialPage);

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

    // Pagination calculations
    const totalPages = Math.ceil(filteredLogos.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedLogos = filteredLogos.slice(startIndex, endIndex);

    const updateURL = useCallback(
        (cat: string, search: string, page: number = 1) => {
            const params = new URLSearchParams();
            if (cat !== "All") params.set("category", cat);
            if (search) params.set("q", search);
            if (page > 1) params.set("page", page.toString());

            const queryString = params.toString();
            startTransition(() => {
                router.replace(`/logos${queryString ? `?${queryString}` : ""}`, {
                    scroll: false,
                });
            });
        },
        [router]
    );

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1); // Reset to first page on search
        updateURL(selectedCategory, value, 1);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to first page on category change
        updateURL(category, searchQuery, 1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        updateURL(selectedCategory, searchQuery, page);
        // Scroll to top of results
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | "...")[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible + 2) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push("...");
            }

            // Show pages around current
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <>
            {/* Enhanced Search Input */}
            <div className="group relative mb-12 w-full max-w-2xl mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-2xl opacity-0 transition-opacity duration-500 group-focus-within:opacity-100" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
                <Search className="absolute left-6 top-1/2 z-10 h-6 w-6 -translate-y-1/2 text-muted-foreground transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110" />
                {isPending && (
                    <Loader2 className="absolute right-6 top-1/2 z-10 h-6 w-6 -translate-y-1/2 animate-spin text-primary" />
                )}
                <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder={t.search.placeholder}
                    aria-label="Search logos"
                    className="relative z-10 w-full rounded-3xl border border-border/50 bg-background/80 py-5 pl-16 pr-16 text-lg shadow-2xl shadow-black/5 backdrop-blur-xl ring-offset-background transition-all duration-300 placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:shadow-primary/10 hover:border-primary/30 hover:bg-background hover:shadow-xl hover:shadow-primary/5"
                />
                {/* Decorative Elements */}
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary/40 blur-sm opacity-0 transition-opacity duration-500 group-focus-within:opacity-100" />
                <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-secondary/40 blur-sm opacity-0 transition-opacity duration-700 group-focus-within:opacity-100" />
            </div>

            {/* Enhanced Category Filters */}
            <nav
                className="mb-16 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
                role="navigation"
                aria-label="Filter logos by category"
            >
                <button
                    onClick={() => handleCategoryChange("All")}
                    className={`group relative overflow-hidden rounded-2xl px-6 py-3 text-sm font-bold tracking-wide transition-all duration-500 ${
                        selectedCategory === "All"
                            ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-2xl shadow-primary/30 scale-105"
                            : "bg-gradient-to-r from-secondary/60 to-secondary/40 text-secondary-foreground hover:from-secondary/80 hover:to-secondary/60 hover:shadow-xl hover:shadow-secondary/20 hover:scale-105"
                    }`}
                    aria-pressed={selectedCategory === "All"}
                >
                    <span className="relative z-10">{t.filters.all}</span>
                    {selectedCategory === "All" && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-50" />
                    )}
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`group relative overflow-hidden rounded-2xl px-6 py-3 text-sm font-bold tracking-wide transition-all duration-500 ${
                            selectedCategory === category
                                ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-2xl shadow-primary/30 scale-105"
                                : "bg-gradient-to-r from-secondary/60 to-secondary/40 text-secondary-foreground hover:from-secondary/80 hover:to-secondary/60 hover:shadow-xl hover:shadow-secondary/20 hover:scale-105"
                        }`}
                        aria-pressed={selectedCategory === category}
                    >
                        <span className="relative z-10">{t.filters[categoryKeys[category]] || category}</span>
                        {selectedCategory === category && (
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-50" />
                        )}
                    </button>
                ))}
            </nav>

            {/* Results Section */}
            <div className="flex w-full flex-col gap-8">
                <div className="min-h-[400px]">
                    {/* Results Count */}
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing{" "}
                            <span className="font-semibold text-foreground">
                                {startIndex + 1}-{Math.min(endIndex, filteredLogos.length)}
                            </span>{" "}
                            of{" "}
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
                        {totalPages > 1 && (
                            <p className="text-sm text-muted-foreground">
                                Page {currentPage} of {totalPages}
                            </p>
                        )}
                    </div>

                    {/* Logo Grid */}
                    {paginatedLogos.length > 0 ? (
                        <>
                            <LogoGrid logos={paginatedLogos} />
                            
                            {/* Enhanced Pagination */}
                            {totalPages > 1 && (
                                <nav
                                    className="mt-16 flex items-center justify-center gap-3"
                                    role="navigation"
                                    aria-label="Pagination"
                                >
                                    {/* Previous Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-border/50 bg-gradient-to-r from-background to-background/80 text-muted-foreground shadow-lg backdrop-blur-sm transition-all duration-300 hover:from-secondary/60 hover:to-secondary/40 hover:shadow-xl hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                        aria-label="Go to previous page"
                                    >
                                        <ChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
                                    </button>

                                    {/* Page Numbers */}
                                    <div className="flex items-center gap-2">
                                        {getPageNumbers().map((page, index) =>
                                            page === "..." ? (
                                                <span
                                                    key={`ellipsis-${index}`}
                                                    className="px-4 py-3 text-muted-foreground"
                                                >
                                                    ...
                                                </span>
                                            ) : (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`group flex h-12 min-w-12 items-center justify-center rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                                                        currentPage === page
                                                            ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-2xl shadow-primary/30 scale-110"
                                                            : "border border-border/50 bg-gradient-to-r from-background to-background/80 text-muted-foreground shadow-lg backdrop-blur-sm hover:from-secondary/60 hover:to-secondary/40 hover:shadow-xl hover:scale-105"
                                                    }`}
                                                    aria-label={`Go to page ${page}`}
                                                    aria-current={currentPage === page ? "page" : undefined}
                                                >
                                                    <span className="relative z-10">{page}</span>
                                                    {currentPage === page && (
                                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent" />
                                                    )}
                                                </button>
                                            )
                                        )}
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-border/50 bg-gradient-to-r from-background to-background/80 text-muted-foreground shadow-lg backdrop-blur-sm transition-all duration-300 hover:from-secondary/60 hover:to-secondary/40 hover:shadow-xl hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                        aria-label="Go to next page"
                                    >
                                        <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                                    </button>
                                </nav>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/50 bg-gradient-to-br from-secondary/5 via-secondary/10 to-secondary/5 py-24 px-8 text-center shadow-2xl backdrop-blur-sm">
                            <div className="mb-6 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 p-6 shadow-lg">
                                <Search className="h-12 w-12 text-muted-foreground/60 animate-pulse" />
                            </div>
                            <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
                                No logos found
                            </h3>
                            <p className="mb-8 max-w-md text-lg text-muted-foreground">
                                {t.search.noResults}
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("All");
                                    setCurrentPage(1);
                                    updateURL("All", "", 1);
                                }}
                                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-primary/90 px-8 py-4 text-sm font-bold text-primary-foreground shadow-2xl shadow-primary/30 transition-all duration-300 hover:from-primary/90 hover:to-primary hover:shadow-3xl hover:shadow-primary/40 hover:scale-105"
                            >
                                <span>Clear filters</span>
                                <div className="h-2 w-2 rounded-full bg-white/60 animate-pulse" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
