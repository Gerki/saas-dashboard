import { BaseModule } from "./base-module"
import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1%",
    trend: "up" as const,
    icon: Users,
  },
]

export function OverviewModule() {
  return (
    <BaseModule title="Overview" description="Key metrics at a glance" className="col-span-full">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="space-y-2">
            <div className="flex items-center justify-between">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
              <div className={`flex items-center text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </BaseModule>
  )
}
