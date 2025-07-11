import { BaseModule } from "./base-module"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const personas = [
  {
    name: "Diego Martínez",
    email: "diego@example.com",
    role: "Marketing",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Lucía Gómez",
    email: "lucia@example.com",
    role: "Ventas",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Andrés Pérez",
    email: "andres@example.com",
    role: "Operaciones",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function PersonasModule() {
  return (
    <BaseModule title="Personas" description="Últimos contactos añadidos" className="col-span-full">
      <div className="space-y-3">
        {personas.map((persona) => (
          <div key={persona.email} className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={persona.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {persona.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{persona.name}</p>
              <p className="text-xs text-muted-foreground truncate">{persona.email}</p>
            </div>
            <Badge variant="secondary">{persona.role}</Badge>
          </div>
        ))}
      </div>
    </BaseModule>
  )
}
