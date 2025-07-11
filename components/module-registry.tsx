"use client"

import * as React from "react"
import { moduleRegistry as initialRegistry, type ModuleConfig } from "@/lib/module-registry"

/**
 * Client-side hook that can mutate the registry at runtime.
 */
export function useModuleRegistry() {
  const [modules, setModules] = React.useState<ModuleConfig[]>(initialRegistry)

  const addModule = (module: ModuleConfig) => setModules((prev) => [...prev, module])
  const removeModule = (id: string) => setModules((prev) => prev.filter((m) => m.id !== id))
  const getModule = (id: string) => modules.find((m) => m.id === id)
  const getModulesByCategory = (category: string) => modules.filter((m) => m.category === category)

  return { modules, addModule, removeModule, getModule, getModulesByCategory }
}

/* Optional named export if some components still need the constant on the client */
export const moduleRegistry = initialRegistry
