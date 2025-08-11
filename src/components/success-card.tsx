import { Card, CardContent } from "@/components/ui/card"
import { Code, Languages, Layers, Clock } from "lucide-react"

// SuccessCard Component
interface SuccessCardProps {
  icon: "Code" | "Languages" | "Frameworks" | "Experience"
  title: string
  value: string
  description: string
}

function SuccessCard({ icon, title, value, description }: SuccessCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "Code":
        return <Code className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
      case "Languages":
        return <Languages className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
      case "Frameworks":
        return <Layers className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
      case "Experience":
        return <Clock className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
      default:
        return <Code className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
    }
  }

  return (
    <Card className="group rounded-3xl bg-background/40 backdrop-blur-md border border-foreground/10 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-background/60">
      <CardContent className="flex flex-col items-center text-center">
        <div className="p-4 rounded-full bg-primary/10 mb-4 transition-colors duration-300 group-hover:bg-primary/20">
          {getIcon()}
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-4xl font-bold text-primary bg-clip-text bg-gradient-to-r from-primary to-primary/60">{value}</p>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

export default SuccessCard;