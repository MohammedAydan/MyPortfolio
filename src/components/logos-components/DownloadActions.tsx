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
        <div className="space-y-6">
            {/* SVG Download */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <FileCode className="h-4 w-4" />
                    SVG Vector Format
                </div>
                <Link
                    href={logo.url}
                    download={`${logo.slug}.svg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
                >
                    <Download className="h-4 w-4" />
                    Download SVG
                </Link>
                <p className="text-xs text-muted-foreground">
                    Scalable vector format - perfect for any size
                </p>
            </div>

            <div className="h-px bg-border" />

            {/* PNG Download */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <ImageIcon className="h-4 w-4" />
                    PNG Raster Format
                </div>
                <div className="flex gap-3">
                    <select
                        value={pngSize}
                        onChange={(e) => setPngSize(Number(e.target.value))}
                        className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                        className="flex items-center justify-center gap-2 rounded-xl border border-input bg-background px-6 py-3 text-sm font-semibold transition-all hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isDownloading ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                            <Download className="h-4 w-4" />
                        )}
                        PNG
                    </button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Choose your preferred resolution for PNG export
                </p>
            </div>

            {/* Hidden Canvas */}
            <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
        </div>
    );
}
