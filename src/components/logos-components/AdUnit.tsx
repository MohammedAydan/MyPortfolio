"use client";

import { useEffect, useRef } from "react";

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
    const adPushed = useRef(false);

    useEffect(() => {
        // Only push once and only if we have the required props
        if (adPushed.current || !slotId || !AD_CLIENT_ID) return;

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adPushed.current = true;
        } catch (e) {
            console.error("Adsense error", e);
        }
    }, [slotId]);

    // Don't render if no config
    if (!slotId || !AD_CLIENT_ID) {
        return null;
    }

    // Build style based on variant
    const getAdStyle = (): React.CSSProperties => {
        if (variant === "in-article") {
            return {
                display: "block",
                textAlign: "center",
            };
        }

        return {
            display: "block",
        };
    };

    // Build data props based on variant
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
            className={`w-full overflow-hidden ${className}`}
            role="region"
            aria-label={label}
        >
            {label && (
                <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40 block w-full text-center">
                    {label}
                </span>
            )}
            <ins
                className="adsbygoogle"
                style={getAdStyle()}
                {...getAdDataProps()}
            />
        </div>
    );
}
