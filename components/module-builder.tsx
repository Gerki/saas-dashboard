"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { useModuleRegistry, type ModuleConfig } from "./module-registry"

export function ModuleBuilder() {
  const { addModule } = useModuleRegistry()
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    category: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create a simple module component
    const DynamicModule = () => (
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold">{formData.name}</h3>
        <p className="text-sm text-muted-foreground">{formData.description}</p>
        <div className="mt-4 p-8 bg-muted rounded text-center">
          <p className="text-sm">Custom module content goes here</p>
        </div>
      </div>
    )

    const newModule: ModuleConfig = {
      id: formData.name.toLowerCase().replace(/\s+/g, "-"),
      name: formData.name,
      description: formData.description,
      component: DynamicModule,
      category: formData.category,
    }

    addModule(newModule)
    setOpen(false)
    setFormData({ name: "", description: "", category: "" })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Module
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Module</DialogTitle>
          <DialogDescription>
            Build a custom module for your dashboard. You can customize the functionality later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Module Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Sales Dashboard"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of what this module does"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Analytics">Analytics</SelectItem>
                  <SelectItem value="User Management">User Management</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Module</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
