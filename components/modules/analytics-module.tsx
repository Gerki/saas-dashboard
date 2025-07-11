import { BaseModule } from "./base-module"
import { BarChart3 } from "lucide-react"

export function AnalyticsModule() {
  return (
    <BaseModule title="Analytics" description="Traffic and engagement metrics">
      <div className="space-y-4">
        <div className="flex items-center justify-center h-32 bg-muted rounded-lg">
          <div className="text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Chart placeholder</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium">Page Views</div>
            <div className="text-2xl font-bold">12,345</div>
          </div>
          <div>
            <div className="font-medium">Sessions</div>
            <div className="text-2xl font-bold">8,901</div>
          </div>
        </div>
      </div>
    </BaseModule>
  )
}
