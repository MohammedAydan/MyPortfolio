import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const cv1 = "https://drive.google.com/file/d/1gJndWBnPNK71gsk9GviHOO0CpfnjL7U0/view?usp=sharing";
const cv2 = "https://drive.google.com/file/d/1BnOfKVFLqopzuOszKgzAFLnfoKgWZd8m/view?usp=sharing";

const links: Record<string, {
    url: string;
    title?: string;
    description?: string;
}> = {
    "cv-1": { url: cv1, title: "Flutter CV", description: "Download my Flutter developer CV." },
    "cv-2": { url: cv2, title: "Full-Stack CV", description: "Download my Full-Stack developer CV." },
};

const LinkPage = async ({ params }: { params: Promise<{ link: string, locale: string }> }) => {
    const { link, locale } = await params;

    try {
        const linkData = links[link];
        const linkUrl = linkData ? linkData.url : null;

        // If link not found, show 404
        if (!linkUrl) {
            notFound();
        }

        return (
            <div className="pt-20 bg-background">
                {/* Header */}
                <header className="">
                    <div className="container mx-auto px-4 py-4 max-w-3xl">
                        <Link
                            href={`/${locale}`}
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                    </div>
                </header>

                {/* Main */}
                <main className="container mx-auto px-4 py-16 max-w-3xl">
                    <div className="space-y-8">
                        {/* Title */}
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {linkData.title}
                            </h1>
                            {linkData.description && (
                                <p className="text-muted-foreground text-lg">
                                    {linkData.description}
                                </p>
                            )}
                        </div>

                        {/* Action */}
                        <div>
                            <a
                                href={linkData.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                Open Link
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </div>

                        {/* URL Info */}
                        <div className="pt-8 border-t">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Link URL
                                </p>
                                <p className="text-sm font-mono text-foreground/70 break-all">
                                    {linkData.url}
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    } catch {
        notFound();
    }
};

export default LinkPage;