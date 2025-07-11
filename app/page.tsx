import { DashboardShell } from "@/components/dashboard-shell"
import { OverviewModule } from "@/components/modules/overview-module"
import { AnalyticsModule } from "@/components/modules/analytics-module"
import { UsersModule } from "@/components/modules/users-module"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <OverviewModule />
        <AnalyticsModule />
        <UsersModule />
      </div>
    </DashboardShell>
  )
}
