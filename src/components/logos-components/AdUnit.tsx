"use client";

import { useEffect, useRef, useState, useId, useCallback } from "react";

type AdVariant = "display" | "in-article" | "in-feed";

interface AdUnitProps {
    className?: string;
    label?: string;
    slotId?: string;
    variant?: AdVariant;
    layoutKey?: string;
}

const AD_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

// Declare adsbygoogle type
declare global {
    interface Window {
        adsbygoogle: Array<Record<string, unknown>>;
    }
}

export function AdUnit({
    className = "",
    label = "Advertisement",
    slotId = "",
    variant = "display",
    layoutKey = "",
}: AdUnitProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const adRef = useRef<HTMLModElement>(null);
    const [adStatus, setAdStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");
    const uniqueId = useId();
    const hasInitialized = useRef(false);

    const loadAdSenseScript = useCallback((): Promise<void> => {
        return new Promise((resolve, reject) => {
            // Check if script already exists
            const existingScript = document.querySelector(
                'script[src*="pagead2.googlesyndication.com"]'
            );
            if (existingScript) {
                resolve();
                return;
            }

            const script = document.createElement("script");
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT_ID}`;
            script.async = true;
            script.crossOrigin = "anonymous";
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load AdSense script"));
            document.head.appendChild(script);
        });
    }, []);

    const initializeAd = useCallback(async () => {
        if (hasInitialized.current || !slotId || !AD_CLIENT_ID) return;

        try {
            setAdStatus("loading");
            await loadAdSenseScript();

            // Wait for DOM to be ready
            await new Promise((resolve) => setTimeout(resolve, 100));

            const adElement = adRef.current;
            const containerElement = containerRef.current;

            if (!adElement || !containerElement) return;

            // Check if container has actual width
            const containerWidth = containerElement.offsetWidth;
            if (containerWidth === 0) {
                console.warn("AdUnit: Container has 0 width, skipping ad initialization");
                return;
            }

            // Check if not already initialized
            if (adElement.getAttribute("data-adsbygoogle-status")) {
                hasInitialized.current = true;
                setAdStatus("loaded");
                return;
            }

            // Initialize the ad
            window.adsbygoogle = window.adsbygoogle || [];
            window.adsbygoogle.push({});
            hasInitialized.current = true;
            setAdStatus("loaded");
        } catch (e) {
            console.error("AdSense error:", e);
            setAdStatus("error");
        }
    }, [slotId, loadAdSenseScript]);

    useEffect(() => {
        if (!slotId || !AD_CLIENT_ID || hasInitialized.current) return;

        // Use IntersectionObserver to only load when visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasInitialized.current) {
                        initializeAd();
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: "100px", // Load slightly before it's visible
                threshold: 0,
            }
        );

        const container = containerRef.current;
        if (container) {
            observer.observe(container);
        }

        return () => {
            observer.disconnect();
        };
    }, [slotId, initializeAd]);

    // Don't render if no config
    if (!slotId || !AD_CLIENT_ID) {
        return (
            <div
                className={`flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border/60 bg-secondary/5 p-4 text-center ${className}`}
            >
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                    {label}
                </span>
                <div className="h-full min-h-[100px] w-full animate-pulse rounded-lg bg-secondary/40 flex items-center justify-center text-xs text-muted-foreground">
                    Ad Space (Configure AdSense)
                </div>
            </div>
        );
    }

    if (adStatus === "error") {
        return (
            <div
                className={`flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border/60 bg-secondary/5 p-4 text-center ${className}`}
            >
                <span className="text-xs text-muted-foreground">Ad failed to load</span>
            </div>
        );
    }

    // Build ad attributes based on variant
    const getAdStyle = (): React.CSSProperties => {
        const baseStyle: React.CSSProperties = {
            display: "block",
            width: "100%",
            minHeight: "100px",
        };

        if (variant === "in-article") {
            return {
                ...baseStyle,
                textAlign: "center",
            };
        }

        return baseStyle;
    };

    const getAdDataProps = (): Record<string, string> => {
        const baseProps = {
            "data-ad-client": AD_CLIENT_ID as string,
            "data-ad-slot": slotId,
        };

        if (variant === "in-article") {
            return {
                ...baseProps,
                "data-ad-layout": "in-article",
                "data-ad-format": "fluid",
            };
        }

        if (variant === "in-feed" && layoutKey) {
            return {
                ...baseProps,
                "data-ad-format": "fluid",
                "data-ad-layout-key": layoutKey,
            };
        }

        return {
            ...baseProps,
            "data-ad-format": "auto",
            "data-full-width-responsive": "true",
        };
    };

    return (
        <div
            ref={containerRef}
            className={`flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border/60 bg-secondary/5 p-4 text-center ${className}`}
            role="region"
            aria-label={label}
        >
            <span className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 block w-full text-center">
                {label}
            </span>
            <div className="w-full min-h-[100px]">
                <ins
                    ref={adRef}
                    key={uniqueId}
                    className="adsbygoogle"
                    style={getAdStyle()}
                    {...getAdDataProps()}
                />
            </div>
        </div>
    );
}
