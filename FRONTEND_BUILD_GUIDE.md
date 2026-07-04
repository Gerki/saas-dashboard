# Frontend Build Guide - VisualGV SaaS Dashboard

## Overview
This guide integrates the best features from two projects:
- **v0-saa-s-dashboard-ui1** (Advanced UI/UX with modern design)
- **saas-dashboard** (Modular SaaS architecture)

**Live Demos:**
- v0 UI: https://v0-saa-s-dashboard-ui-xi.vercel.app/dashboard
- SaaS Dashboard: https://saas-dashboard-navy.vercel.app/

---

## 1. Project Setup

### 1.1 Technology Stack

```
Framework:        Next.js 15.x (App Router)
Runtime:          Node.js 18+
React Version:    React 19.x
Styling:          Tailwind CSS 4.x
Language:         TypeScript 5.x
Package Manager:  npm/yarn/pnpm
Deployment:       Vercel
```

### 1.2 Environment Setup

```bash
# Clone repository
git clone https://github.com/Gerki/saas-dashboard.git
cd saas-dashboard

# Install dependencies
npm install

# Create environment variables file
touch .env.local
```

### 1.3 Environment Variables

```env
# .env.local
NEXT_PUBLIC_APP_NAME=VisualGV
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Backend Placeholder (to be updated)
NEXT_PUBLIC_BACKEND_URL=
API_SECRET_KEY=

# Supabase (Optional - from v0 UI)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

---

## 2. Dependencies Installation

### 2.1 Core Dependencies

```json
{
  "dependencies": {
    "next": "15.2.4",
    "react": "^19",
    "react-dom": "^19",
    "typescript": "^5",
    
    "@hookform/resolvers": "^3.10.0",
    "react-hook-form": "^7.60.0",
    "zod": "3.25.67",
    
    "@radix-ui/react-*": "latest (all 25+ components)",
    "lucide-react": "^0.454.0",
    "next-themes": "latest",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.5",
    
    "recharts": "2.15.4",
    "date-fns": "4.1.0",
    "cmdk": "1.0.4",
    "sonner": "^1.7.4",
    "vaul": "^0.9.9",
    
    "react-resizable-panels": "^2.1.7",
    "embla-carousel-react": "8.5.1",
    "input-otp": "1.4.1",
    "react-day-picker": "9.8.0"
  }
}
```

### 2.2 Dev Dependencies

```json
{
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.9",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "postcss": "^8.5",
    "tailwindcss": "^4.1.9",
    "typescript": "^5",
    "tw-animate-css": "1.3.3"
  }
}
```

### 2.3 Installation Command

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

## 3. Project Structure

### 3.1 File Organization

```
saas-dashboard/
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Home/Dashboard entry point
│   ├── dashboard/
│   │   ├── page.tsx              # Main dashboard page
│   │   ├── [module]/page.tsx      # Dynamic module routes
│   │   └── layout.tsx            # Dashboard layout
│   ├── api/                       # API routes (placeholder)
│   └── globals.css               # Global Tailwind styles
│
├── components/
│   ├── ui/                        # Radix UI wrapped components
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── context-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── hover-card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   ├── toggle.tsx
│   │   ├── toggle-group.tsx
│   │   ├── tooltip.tsx
│   │   └── command.tsx
│   │
│   ├── dashboard/
│   │   ├── dashboard-shell.tsx    # Main dashboard wrapper
│   │   ├── sidebar.tsx            # Navigation sidebar
│   │   └── header.tsx             # Top navigation
│   │
│   ├── modules/
│   │   ├── overview-module.tsx
│   │   ├── organizations-module.tsx
│   │   ├── personas-module.tsx
│   │   ├── files-module.tsx
│   │   ├── industries-module.tsx
│   │   ├── inventory-module.tsx
│   │   ├── match-zone-module.tsx
│   │   ├── ar-module.tsx
│   │   ├── gps-module.tsx
│   │   ├── evidence-module.tsx
│   │   ├── reports-module.tsx
│   │   └── base-module.tsx        # Base module wrapper
│   │
│   ├── theme-provider.tsx         # Theme switcher (dark/light)
│   └── providers.tsx              # All app providers
│
├── lib/
│   ├── utils.ts                   # Utility functions (cn helper)
│   ├── constants.ts               # App constants
│   ├── types.ts                   # TypeScript types
│   └── supabase/                  # Supabase client (optional)
│       ├── client.ts
│       ├── server.ts
│       └── middleware.ts
│
├── styles/
│   ├── globals.css               # Global styles
│   └── tailwind.css              # Tailwind imports
│
├── hooks/
│   ├── use-theme.ts              # Theme hook
│   ├── use-mobile.ts             # Mobile detection
│   └── use-sidebar.ts            # Sidebar state
│
├── config/
│   ├── site.ts                   # Site configuration
│   └── navigation.ts             # Navigation config
│
├── public/                        # Static assets
│   ├── fonts/
│   └── images/
│
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript config
├── next.config.js                # Next.js config
├── postcss.config.js             # PostCSS config
└── package.json                  # Dependencies
```

---

## 4. Core Components Setup

### 4.1 Tailwind Configuration

**`tailwind.config.ts`**
```typescript
import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

### 4.2 PostCSS Configuration

**`postcss.config.js`**
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
```

### 4.3 Global Styles

**`app/globals.css`**
```css
@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.6%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.6%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.6%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 9.0%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 100%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 217.2 91.2% 59.8%;
    --secondary-foreground: 222.2 47.6% 11.2%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 91.2% 59.8%;
    --accent-foreground: 222.2 47.6% 11.2%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.6% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rounding-mode" 0;
  }
}
```

---

## 5. Key Components Implementation

### 5.1 Root Layout

**`app/layout.tsx`**
```typescript
import type { Metadata } from "next"
import { Providers } from "@/components/providers"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "VisualGV Dashboard",
  description: "Modern SaaS Dashboard Platform",
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### 5.2 Providers

**`components/providers.tsx`**
```typescript
"use client"

import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"
import { Toaster } from "sonner"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster richColors />
    </ThemeProvider>
  )
}
```

### 5.3 Dashboard Shell

**`components/dashboard/dashboard-shell.tsx`**
```typescript
"use client"

import { SidebarProvider, Sidebar, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ReactNode } from "react"
import { DashboardSidebar } from "./sidebar"

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <DashboardSidebar />
      </Sidebar>
      <main className="flex-1">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
        </header>
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </SidebarProvider>
  )
}
```

### 5.4 Sidebar Navigation

**`components/dashboard/sidebar.tsx`**
```typescript
"use client"

import {
  Building2,
  Users,
  FileText,
  Factory,
  Package,
  Target,
  Smartphone,
  MapPin,
  Camera,
  BarChart,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const menuItems = [
  { label: "Organizaciones", icon: Building2, href: "/dashboard/organizations" },
  { label: "Personas", icon: Users, href: "/dashboard/personas" },
  { label: "Archivos", icon: FileText, href: "/dashboard/files" },
  { label: "Industrias", icon: Factory, href: "/dashboard/industries" },
  { label: "Inventario", icon: Package, href: "/dashboard/inventory" },
  { label: "Zona Match", icon: Target, href: "/dashboard/match-zone" },
  { label: "Realidad Aumentada", icon: Smartphone, href: "/dashboard/ar" },
  { label: "GPS Tracking", icon: MapPin, href: "/dashboard/gps" },
  { label: "Evidencias", icon: Camera, href: "/dashboard/evidence" },
  { label: "Reportes", icon: BarChart, href: "/dashboard/reports" },
]

export function DashboardSidebar() {
  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            V
          </div>
          <span className="font-semibold">VisualGV</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-sm">
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button variant="outline" className="w-full" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}
```

### 5.5 Dashboard Page

**`app/dashboard/page.tsx`**
```typescript
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-4 p-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your VisualGV dashboard</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Metric {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">+0% from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
```

---

## 6. Running the Application

### 6.1 Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit http://localhost:3000 to see the application.

### 6.2 Build for Production

```bash
npm run build
npm run start
```

### 6.3 Linting

```bash
npm run lint
```

---

## 7. Module Architecture

### 7.1 Base Module Pattern

All dashboard modules should follow this pattern:

**`components/modules/base-module.tsx`**
```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"

interface BaseModuleProps {
  title: string
  description?: string
  icon?: ReactNode
  children: ReactNode
  action?: ReactNode
}

export function BaseModule({ title, description, icon, children, action }: BaseModuleProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
          </div>
          {action}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
```

### 7.2 Example Module Implementation

**`components/modules/organizations-module.tsx`**
```typescript
"use client"

import { BaseModule } from "./base-module"
import { Building2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function OrganizationsModule() {
  const [organizations, setOrganizations] = useState([])

  return (
    <BaseModule
      title="Organizaciones"
      description="Manage your organizations"
      icon={<Building2 className="h-5 w-5" />}
      action={
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Organization
        </Button>
      }
    >
      <div className="text-sm text-muted-foreground">
        {organizations.length === 0 ? "No organizations yet" : `${organizations.length} organizations`}
      </div>
    </BaseModule>
  )
}
```

---

## 8. Styling Best Practices

### 8.1 Using the `cn` Utility

**`lib/utils.ts`**
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 8.2 Component Styling Example

```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MyComponent() {
  return (
    <div className={cn(
      "flex gap-4 p-4",
      "rounded-lg border",
      "dark:bg-slate-900"
    )}>
      <Button className={cn("font-semibold", "uppercase")}>
        Click me
      </Button>
    </div>
  )
}
```

---

## 9. Form Handling

### 9.1 React Hook Form + Zod Integration

```typescript
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type FormValues = z.infer<typeof formSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)
    try {
      // Handle form submission
      toast.success("Form submitted successfully")
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  )
}
```

---

## 10. Deployment (Vercel)

### 10.1 Vercel Configuration

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### 10.2 Deployment Steps

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

---

## 11. Backend Placeholder

The backend structure is intentionally left as a placeholder for your future implementation:

```typescript
// api/organizations/route.ts
export async function GET() {
  // Backend endpoint placeholder
  // To be implemented later
  return Response.json({ data: [] })
}

export async function POST(request: Request) {
  // Backend implementation placeholder
  const body = await request.json()
  return Response.json({ success: true })
}
```

---

## 12. Common UI Components

The following shadcn/ui components are pre-configured:
- **Navigation**: Sidebar, Navigation Menu, Menubar
- **Forms**: Input, Select, Checkbox, Radio Group, Switch, Form
- **Feedback**: Toast, Badge, Alert, Progress
- **Modals**: Dialog, Drawer, Popover, Hover Card
- **Display**: Card, Tabs, Accordion, Carousel, Table
- **Utilities**: Avatar, Separator, Skeleton, Tooltip

---

## 13. Performance Optimization

### 13.1 Code Splitting
- Use dynamic imports for modules
- Lazy load heavy components

### 13.2 Image Optimization
- Use Next.js Image component
- Implement proper sizing

### 13.3 Bundle Analysis
```bash
npm run build -- --analyze
```

---

## 14. Resources

- **Vercel Deployment**: https://vercel.com
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **Radix UI**: https://radix-ui.com
- **shadcn/ui**: https://ui.shadcn.com
- **React Hook Form**: https://react-hook-form.com
- **Zod Validation**: https://zod.dev

---

## 15. Next Steps

1. ✅ Install dependencies
2. ✅ Configure environment variables
3. ✅ Build core UI components
4. ✅ Implement module pages
5. ⏳ **Connect to backend** (your next phase)
6. ⏳ Add database integration
7. ⏳ Implement authentication
8. ⏳ Deploy to Vercel

---

**Last Updated**: 2024
**Version**: 1.0
**Status**: Ready for Frontend Development
