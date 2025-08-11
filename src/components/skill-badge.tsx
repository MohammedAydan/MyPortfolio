import { cn } from "@/lib/utils"

interface SkillBadgeProps {
  name: string
  className?: string
}

export default function SkillBadge({ name, className }: SkillBadgeProps) {
  return (
    <div
      className={cn(
        "rounded-full bg-primary/30 px-4 py-1.5 text-sm font-medium text-[hsl(var(--skill-text))] transition-all hover:bg-[hsl(var(--skill-bg)/0.8)] hover:shadow-sm",
        className,
      )}
    >
      {name}
    </div>
  )
}
