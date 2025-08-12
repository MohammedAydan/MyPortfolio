import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "next-intl"

interface AdditionalLink {
  label: string
  url: string
}

interface ProjectCardProps {
  title: string
  description: string
  githubUrl: string
  liveUrl?: string
  technologies: string[]
  additionalLinks?: AdditionalLink[]
}

function ProjectCard({
  title,
  description,
  githubUrl,
  liveUrl,
  technologies,
  additionalLinks,
}: ProjectCardProps) {
  const locale = useLocale();

  return (
    <Card className="group rounded-3xl bg-background/40 backdrop-blur-md border border-foreground/10 shadow-lg h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-background/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-foreground bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full transition-colors duration-300 group-hover:bg-primary/20"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-4 pt-4 border-t border-foreground/10">
        <Link
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          <Github className={`h-4 w-4 ${locale === "ar" ? "ml-2" : "mr-2"}`} />
          <span>GitHub</span>
        </Link>
        {liveUrl && (
          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <ExternalLink className={`h-4 w-4 ${locale === "ar" ? "ml-2" : "mr-2"}`} />
            <span>Live Demo</span>
          </Link>
        )}
        {additionalLinks?.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Github className={`h-4 w-4 ${locale === "ar" ? "ml-2" : "mr-2"}`} />
            <span>{link.label}</span>
          </Link>
        ))}
      </CardFooter>
    </Card>
  )
}

export default ProjectCard;