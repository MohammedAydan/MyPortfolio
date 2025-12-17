"use client";

import { useEffect, useRef, useState } from "react";

type AdVariant = "display" | "in-article" | "in-feed";

interface AdUnitProps {
    className?: string;
    label?: string;
    slotId?: string;
    variant?: AdVariant;
    layoutKey?: string;
}

const AD_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export function AdUnit({
    className = "",
    label = "Advertisement",
    slotId = "",
    variant = "display",
    layoutKey = "",
}: AdUnitProps) {
    const adContainerRef = useRef<HTMLDivElement>(null);
    const [adInitialized, setAdInitialized] = useState(false);

    useEffect(() => {
        if (!slotId || !AD_CLIENT_ID || adInitialized) return;

        const loadAdSenseScript = (): Promise<void> => {
            return new Promise((resolve) => {
                if ((window as any).adsbygoogle) {
                    resolve();
                    return;
                }

                const existingScript = document.querySelector(
                    `script[src*="pagead2.googlesyndication.com"]`
                );
                if (existingScript) {
                    existingScript.addEventListener("load", () => resolve());
                    resolve();
                    return;
                }

                const script = document.createElement("script");
                script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT_ID}`;
                script.async = true;
                script.crossOrigin = "anonymous";
                script.onload = () => resolve();
                document.head.appendChild(script);
            });
        };

        const getInsElement = (): string => {
            const baseStyle = "display:block;";

            if (variant === "in-article") {
                return `<ins class="adsbygoogle"
                    style="${baseStyle} text-align:center;"
                    data-ad-layout="in-article"
                    data-ad-format="fluid"
                    data-ad-client="${AD_CLIENT_ID}"
                    data-ad-slot="${slotId}"></ins>`;
            } else if (variant === "in-feed" && layoutKey) {
                return `<ins class="adsbygoogle"
                    style="${baseStyle}"
                    data-ad-format="fluid"
                    data-ad-layout-key="${layoutKey}"
                    data-ad-client="${AD_CLIENT_ID}"
                    data-ad-slot="${slotId}"></ins>`;
            } else {
                return `<ins class="adsbygoogle"
                    style="${baseStyle}"
                    data-ad-client="${AD_CLIENT_ID}"
                    data-ad-slot="${slotId}"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>`;
            }
        };

        const initAd = async () => {
            await loadAdSenseScript();

            // Wait for container to have width
            await new Promise<void>((resolve) => {
                const checkWidth = () => {
                    if (adContainerRef.current && adContainerRef.current.offsetWidth > 0) {
                        resolve();
                    } else {
                        requestAnimationFrame(checkWidth);
                    }
                };
                checkWidth();
            });

            if (adContainerRef.current) {
                adContainerRef.current.innerHTML = getInsElement();

                try {
                    (window as any).adsbygoogle = (window as any).adsbygoogle || [];
                    (window as any).adsbygoogle.push({});
                    setAdInitialized(true);
                } catch (e) {
                    console.error("AdSense push error:", e);
                }
            }
        };

        const timer = setTimeout(initAd, 100);
        return () => clearTimeout(timer);
    }, [slotId, variant, layoutKey, adInitialized]);

    return (
        <div
            className={`flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border/60 bg-secondary/5 p-4 text-center ${className}`}
            role="region"
            aria-label={label}
        >
            {slotId && AD_CLIENT_ID ? (
                <>
                    <span className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 block w-full text-center">
                        {label}
                    </span>
                    <div ref={adContainerRef} className="w-full min-h-[100px]"></div>
                </>
            ) : (
                <>
                    <span className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                        {label}
                    </span>
                    <div className="h-full min-h-[100px] w-full animate-pulse rounded-lg bg-secondary/40 flex items-center justify-center text-xs text-muted-foreground">
                        Ad Space (Add Slot ID)
                    </div>
                </>
            )}
        </div>
    );
}
