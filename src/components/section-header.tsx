import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export default function SectionHeader({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 text-center", className)}>
      <h2 className={cn("text-3xl font-bold", titleClassName)}>{title}</h2>
      {subtitle && <p className={cn("mt-3 text-lg text-muted-foreground", subtitleClassName)}>{subtitle}</p>}
    </div>
  )
}
