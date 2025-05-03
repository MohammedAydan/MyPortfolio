import { Card, CardContent } from "@/components/ui/card"
import { Code, Languages, Layers, Clock } from "lucide-react"

interface SuccessCardProps {
  icon: "Code" | "Languages" | "Frameworks" | "Experience"
  title: string
  value: string
  description: string
}

export default function SuccessCard({ icon, title, value, description }: SuccessCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "Code":
        return <Code className="h-10 w-10 text-primary" />
      case "Languages":
        return <Languages className="h-10 w-10 text-primary" />
      case "Frameworks":
        return <Layers className="h-10 w-10 text-primary" />
      case "Experience":
        return <Clock className="h-10 w-10 text-primary" />
      default:
        return <Code className="h-10 w-10 text-primary" />
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          {getIcon()}
          <h3 className="mt-4 text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
