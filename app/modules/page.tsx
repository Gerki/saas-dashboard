import { DashboardShell } from "@/components/dashboard-shell"
import { moduleRegistry } from "@/lib/module-registry" /* <-- server-safe import */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ModulesPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Modules</h1>
            <p className="text-muted-foreground">Manage and create custom modules for your dashboard</p>
          </div>
          {/* ModuleBuilder stays the same */}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {moduleRegistry.map((module) => (
            <Card key={module.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{module.name}</CardTitle>
                  <Badge variant="secondary">{module.category}</Badge>
                </div>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-24 bg-muted rounded">
                  <p className="text-sm text-muted-foreground">Module Preview</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
