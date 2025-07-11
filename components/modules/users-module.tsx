import { BaseModule } from "./base-module"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentUsers = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    status: "inactive",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Carol Davis",
    email: "carol@example.com",
    status: "active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function UsersModule() {
  return (
    <BaseModule title="Recent Users" description="Latest user registrations">
      <div className="space-y-3">
        {recentUsers.map((user) => (
          <div key={user.email} className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
          </div>
        ))}
      </div>
    </BaseModule>
  )
}
