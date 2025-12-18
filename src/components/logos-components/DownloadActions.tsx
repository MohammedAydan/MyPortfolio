"use client";

import { useRef, useState } from "react";
import { Download, ImageIcon, FileCode } from "lucide-react";
import { Logo } from "@/lib/logos-lib/types";
import Link from "next/link";

interface DownloadActionsProps {
    logo: Logo;
}

const PNG_SIZES = [
    { value: 256, label: "256px" },
    { value: 512, label: "512px" },
    { value: 1024, label: "1024px" },
    { value: 2048, label: "2048px" },
] as const;

export function DownloadActions({ logo }: DownloadActionsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pngSize, setPngSize] = useState(512);
    const [isDownloading, setIsDownloading] = useState(false);

    async function downloadPng() {
        if (isDownloading) return;

        setIsDownloading(true);
        try {
            const img = new window.Image();
            img.crossOrigin = "anonymous";
            img.src = logo.url;

            await new Promise<void>((resolve, reject) => {
                img.onload = () => resolve();
                img.onerror = () => reject(new Error("Failed to load image"));
            });

            const canvas = canvasRef.current;
            if (!canvas) return;

            canvas.width = pngSize;
            canvas.height = pngSize;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Clear canvas
            ctx.clearRect(0, 0, pngSize, pngSize);

            // Calculate scaling to fit while maintaining aspect ratio
            const scale = Math.min(pngSize / img.width, pngSize / img.height) * 0.8;
            const width = img.width * scale;
            const height = img.height * scale;
            const x = (pngSize - width) / 2;
            const y = (pngSize - height) / 2;

            ctx.drawImage(img, x, y, width, height);

            // Download
            const link = document.createElement("a");
            link.download = `${logo.slug}-${pngSize}px.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        } catch (error) {
            console.error("PNG download failed:", error);
            alert(
                "Could not generate PNG. This might be due to CORS restrictions on the image."
            );
        } finally {
            setIsDownloading(false);
        }
    }

    return (
        <div className="space-y-8">
            {/* Enhanced SVG Download */}
            <div className="group space-y-4 rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primary/10 p-2">
                        <FileCode className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">SVG Vector Format</h3>
                        <p className="text-sm text-muted-foreground">Perfect for any size, scalable</p>
                    </div>
                </div>
                <Link
                    href={logo.url}
                    download={`${logo.slug}.svg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:from-primary/90 hover:to-primary hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
                >
                    <Download className="h-5 w-5 transition-transform duration-200 group-hover/btn:scale-110" />
                    Download SVG
                    <div className="ml-auto h-2 w-2 rounded-full bg-white/30 animate-pulse" />
                </Link>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Enhanced PNG Download */}
            <div className="group space-y-4 rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-secondary/20">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-secondary/10 p-2">
                        <ImageIcon className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">PNG Raster Format</h3>
                        <p className="text-sm text-muted-foreground">Choose your preferred resolution</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <select
                        value={pngSize}
                        onChange={(e) => setPngSize(Number(e.target.value))}
                        className="flex-1 rounded-xl border border-input/60 bg-background/80 px-4 py-4 text-sm font-medium ring-offset-background backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 hover:border-secondary/40 hover:bg-background"
                        aria-label="Select PNG size"
                    >
                        {PNG_SIZES.map((size) => (
                            <option key={size.value} value={size.value}>
                                {size.label}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={downloadPng}
                        disabled={isDownloading}
                        className="flex items-center justify-center gap-3 rounded-xl border border-input/60 bg-gradient-to-r from-secondary to-secondary/80 px-6 py-4 text-sm font-bold transition-all duration-300 hover:from-secondary/80 hover:to-secondary hover:shadow-lg hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isDownloading ? (
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                <span>Generating...</span>
                            </div>
                        ) : (
                            <>
                                <Download className="h-4 w-4" />
                                PNG
                            </>
                        )}
                    </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    High quality export with transparent background
                </div>
            </div>

            {/* Hidden Canvas */}
            <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
        </div>
    );
}
