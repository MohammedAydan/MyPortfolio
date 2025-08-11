import { Card, CardContent } from "@/components/ui/card";

const AboutCard = ({
    icon: Icon,
    title,
    href,
}: {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    href: string;
}) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
        >
            <Card className="rounded-3xl bg-background/40 backdrop-blur-md border border-foreground/10 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] hover:bg-background/60">
                <CardContent className="flex items-center gap-4">
                    <div className="flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <span className="font-medium text-sm sm:text-base break-words">
                        {title}
                    </span>
                </CardContent>
            </Card>
        </a>
    );
};

export default AboutCard;