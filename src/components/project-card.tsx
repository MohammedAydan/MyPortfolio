import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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

export default function ProjectCard({
  title,
  description,
  githubUrl,
  liveUrl,
  technologies,
  additionalLinks,
}: ProjectCardProps) {
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              // className="bg-primary/10 hover:bg-primary/20 text-primary dark:bg-primary/20"
              className="bg-primary/80 text-foreground"

            >
              {tech}
            </Badge>

          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 pt-2 border-t">
        <Link
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-4 w-4 mr-1" />
          <span>GitHub</span>
        </Link>

        {liveUrl && (
          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            <span>Live Demo</span>
          </Link>
        )}

        {additionalLinks?.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4 mr-1" />
            <span>{link.label}</span>
          </Link>
        ))}
      </CardFooter>
    </Card>
  )
}
