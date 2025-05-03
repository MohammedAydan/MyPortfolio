import Link from "next/link"
import { Github, Linkedin, Mail, Phone } from "lucide-react"
import { useTranslations } from 'next-intl';


export default function Footer() {
  const t = useTranslations();

  // Default copyright text if dict is undefined
  const year = new Date().getFullYear().toString()
  const copyright = t("footer.copyright", { year }) || `© ${year} Mohammed Aydan. All rights reserved.`

  return (
    <footer className="border-t bg-muted/10 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div>
            <p className="text-sm text-muted-foreground">
              {copyright.replace("{year}", new Date().getFullYear().toString())}
            </p>
          </div>

          <div className="flex space-x-4">
            <Link
              href="https://github.com/MohammedAydan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>

            <Link
              href="https://linkedin.com/in/mohamed-aydan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>

            <Link
              href="mailto:mohammedaydan12@gmail.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>

            <Link href="tel:+201552955862" className="text-muted-foreground transition-colors hover:text-foreground">
              <Phone className="h-5 w-5" />
              <span className="sr-only">Phone</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
