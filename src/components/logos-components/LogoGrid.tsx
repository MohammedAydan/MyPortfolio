import { useMemo } from "react";
import { Logo } from "@/lib/logos-lib/types";
import { LogoCard } from "./LogoCard";
import { AdUnit } from "./AdUnit";

interface LogoGridProps {
    logos: Logo[];
}

const AD_SLOT_IN_FEED = process.env.NEXT_PUBLIC_AD_SLOT_IN_FEED;
// Number of logos to display between in-feed ad units. The value 12 is a
// product/UX choice intended to balance ad visibility with content density.
const AD_INTERVAL = 12;

export function LogoGrid({ logos }: LogoGridProps) {
    // Memoize items array to prevent recalculation when LogoGrid re-renders
    // due to parent component updates while logos array remains unchanged
    const items = useMemo(() => {
        const result: Array<{ type: "logo"; data: Logo } | { type: "ad"; index: number }> = [];
        
        logos.forEach((logo, index) => {
            result.push({ type: "logo", data: logo });
            
            // Insert ad after every AD_INTERVAL logos
            if ((index + 1) % AD_INTERVAL === 0 && index < logos.length - 1) {
                result.push({ type: "ad", index: Math.floor(index / AD_INTERVAL) });
            }
        });
        
        return result;
    }, [logos]);

    if (logos.length === 0) {
        return null;
    }

    return (
        <div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
            role="list"
            aria-label="Logo gallery"
        >
            {items.map((item) => {
                if (item.type === "ad") {
                    return (
                        <div
                            key={`ad-${item.index}`}
                            className="col-span-2 sm:col-span-3 md:col-span-2"
                        >
                            <AdUnit
                                className="min-h-[200px]"
                                slotId={AD_SLOT_IN_FEED}
                                variant="in-feed"
                                label="Sponsored"
                            />
                        </div>
                    );
                }

                return (
                    <div key={item.data.slug} role="listitem">
                        <LogoCard logo={item.data} />
                    </div>
                );
            })}
        </div>
    );
}
