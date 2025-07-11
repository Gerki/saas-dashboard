import type React from "react"
export interface ModuleConfig {
  id: string
  name: string
  description: string
  component: React.ComponentType
  category: string
  defaultProps?: Record<string, any>
}

/**
 * Pure data – safe to import in Server Components
 */
export const moduleRegistry: ModuleConfig[] = [
  {
    id: "overview",
    name: "Overview",
    description: "Key metrics and KPIs",
    component: () => null, // placeholder; real component imported client-side
    category: "Analytics",
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Traffic and engagement data",
    component: () => null,
    category: "Analytics",
  },
  {
    id: "users",
    name: "Users",
    description: "User management and activity",
    component: () => null,
    category: "User Management",
  },
  {
    id: "personas",
    name: "Personas",
    description: "Manage contacts and relationships",
    component: () => null,
    category: "User Management",
  },
]
