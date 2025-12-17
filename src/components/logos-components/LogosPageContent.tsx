"use client";

import { useState, useMemo, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { t, Translation } from "@/lib/logos-lib/tr-logos";
import { Logo, Category } from "@/lib/logos-lib/types";
import { LogoGrid } from "./LogoGrid";
import { AdUnit } from "./AdUnit";

const AD_SLOT_MOBILE_TOP = process.env.NEXT_PUBLIC_AD_SLOT_MOBILE_TOP;
const AD_SLOT_SIDEBAR_TOP = process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR_TOP;
const AD_SLOT_SIDEBAR_BOTTOM = process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR_BOTTOM;

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
            {/* Search Input */}
            <div className="group relative mb-8 w-full max-w-xl">
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
            </div>

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
            <div className="flex w-full flex-col gap-8 lg:flex-row">
                <div className="min-h-[400px] flex-1">
                    {/* Mobile Ad */}
                    <div className="mb-8 lg:hidden">
                        <AdUnit
                            label="Advertisement"
                            className="min-h-[100px]"
                            slotId={AD_SLOT_MOBILE_TOP}
                            variant="display"
                        />
                    </div>

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
                            
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <nav
                                    className="mt-12 flex items-center justify-center gap-2"
                                    role="navigation"
                                    aria-label="Pagination"
                                >
                                    {/* Previous Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:bg-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                        aria-label="Go to previous page"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>

                                    {/* Page Numbers */}
                                    <div className="flex items-center gap-1">
                                        {getPageNumbers().map((page, index) =>
                                            page === "..." ? (
                                                <span
                                                    key={`ellipsis-${index}`}
                                                    className="px-2 text-muted-foreground"
                                                >
                                                    ...
                                                </span>
                                            ) : (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-medium transition-all ${
                                                        currentPage === page
                                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                                            : "border border-border bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
                                                    }`}
                                                    aria-label={`Go to page ${page}`}
                                                    aria-current={currentPage === page ? "page" : undefined}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        )}
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:bg-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                        aria-label="Go to next page"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </nav>
                            )}
                        </>
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
                                    setCurrentPage(1);
                                    updateURL("All", "", 1);
                                }}
                                className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Sidebar Ads */}
                <aside className="hidden w-72 flex-none space-y-6 lg:block">
                    <div className="sticky top-24 space-y-6">
                        <AdUnit
                            label="Advertisement"
                            className="min-h-[400px]"
                            slotId={AD_SLOT_SIDEBAR_TOP}
                            variant="display"
                        />
                        <AdUnit
                            label="Sponsored"
                            className="min-h-[250px]"
                            slotId={AD_SLOT_SIDEBAR_BOTTOM}
                            variant="display"
                        />
                    </div>
                </aside>
            </div>
        </>
    );
}
