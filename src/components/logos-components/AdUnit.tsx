"use client";

import { useEffect, useRef, useState, useId } from "react";

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
    const adRef = useRef<HTMLModElement>(null);
    const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "error">("loading");
    const uniqueId = useId();
    const hasInitialized = useRef(false);

    useEffect(() => {
        // Don't initialize if already done, no slotId, or no client ID
        if (hasInitialized.current || !slotId || !AD_CLIENT_ID) return;

        const loadScript = (): Promise<void> => {
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
        };

        const initAd = async () => {
            try {
                await loadScript();

                // Wait for script to be fully loaded
                await new Promise((resolve) => setTimeout(resolve, 150));

                // Check if the ad element exists and hasn't been initialized
                const adElement = adRef.current;
                if (adElement && !adElement.getAttribute("data-adsbygoogle-status")) {
                    // Initialize the adsbygoogle array if not exists
                    window.adsbygoogle = window.adsbygoogle || [];
                    window.adsbygoogle.push({});
                    hasInitialized.current = true;
                    setAdStatus("loaded");
                }
            } catch (e) {
                console.error("AdSense error:", e);
                setAdStatus("error");
            }
        };

        initAd();
    }, [slotId]);

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
    const getAdProps = (): Record<string, string | React.CSSProperties> => {
        const baseProps = {
            className: "adsbygoogle",
            style: { display: "block" } as React.CSSProperties,
            "data-ad-client": AD_CLIENT_ID as string,
            "data-ad-slot": slotId,
        };

        if (variant === "in-article") {
            return {
                ...baseProps,
                style: { display: "block", textAlign: "center" as const },
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
                    {...getAdProps()}
                />
            </div>
        </div>
    );
}
