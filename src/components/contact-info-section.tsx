import Link from "next/link"
import { Github, Linkedin, Mail, Phone, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getLocale } from "next-intl/server"

const ContactInfoSection = async () => {
    const locale = await getLocale()

    const contactInfo = [
        {
            icon: <Linkedin className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />,
            href: "https://linkedin.com/in/mohamed-aydan",
            text: "linkedin.com/in/mohamed-aydan",
        },
        {
            icon: <Github className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />,
            href: "https://github.com/MohammedAydan",
            text: "github.com/MohammedAydan",
        },
        {
            icon: <Mail className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />,
            href: "mailto:mohammedaydan12@gmail.com",
            text: "mohammedaydan12@gmail.com",
        },
        {
            icon: <Phone className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />,
            href: "tel:+201552955862",
            text: "01552955862",
        },
    ];

    return (
        <section id="contact-info" className="py-20 relative overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.08),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)]">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full mx-auto">
                    {contactInfo.map((item, index) => (
                        <Card
                            key={index}
                            className="group rounded-2xl bg-background/40 backdrop-blur-md border border-foreground/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-background/60"
                        >
                            <CardContent className="flex items-center p-4">
                                <div className="p-3 rounded-full bg-primary/10 mr-4 transition-colors duration-300 group-hover:bg-primary/20">
                                    {item.icon}
                                </div>
                                <Link
                                    hrefLang={locale}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-1 items-center justify-between"
                                >
                                    <span className="text-sm font-medium text-foreground">{item.text}</span>
                                    <ExternalLink className="h-4 w-4 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ContactInfoSection;