# VisualGV Dashboard - Production Manual

## Table of Contents
1. [Overview](#overview)
2. [Pre-Production Setup](#pre-production-setup)
3. [Deployment to Vercel](#deployment-to-vercel)
4. [Production Configuration](#production-configuration)
5. [Customer Management](#customer-management)
6. [Security Considerations](#security-considerations)
7. [Monitoring & Analytics](#monitoring--analytics)
8. [Scaling & Performance](#scaling--performance)
9. [Maintenance & Updates](#maintenance--updates)
10. [Troubleshooting](#troubleshooting)

## Overview

The VisualGV Dashboard is a modular SaaS platform designed for organizations to manage projects, files, communications, and various business processes. This manual covers everything needed to deploy and operate the platform in production.

### Key Features
- **Multi-tenant Architecture**: Support for multiple organizations
- **Modular Design**: 10+ specialized modules (Organizaciones, Personas, Archivos, etc.)
- **Real-time Collaboration**: Chat, file sharing, and project management
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Pre-Production Setup

### 1. Environment Variables
Create a `.env.local` file with the following variables:

\`\`\`env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Authentication
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-secret-key-here"

# File Storage
VERCEL_BLOB_READ_WRITE_TOKEN="your-blob-token"

# Email Service
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Analytics
GOOGLE_ANALYTICS_ID="GA_MEASUREMENT_ID"

# Stripe (for payments)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
\`\`\`

### 2. Database Setup
Choose one of these database options:

#### Option A: Neon (Recommended)
\`\`\`bash
# Install Neon CLI
npm install -g @neondatabase/cli

# Create database
neon db create visualgv-production

# Run migrations
npm run db:migrate
\`\`\`

#### Option B: Supabase
\`\`\`bash
# Create project at supabase.com
# Copy connection string to DATABASE_URL
\`\`\`

### 3. Authentication Setup
\`\`\`bash
# Install NextAuth
npm install next-auth

# Configure providers in app/api/auth/[...nextauth]/route.ts
\`\`\`

## Deployment to Vercel

### 1. Connect Repository
\`\`\`bash
# Push to GitHub
git add .
git commit -m "Production ready"
git push origin main

# Connect to Vercel
vercel --prod
\`\`\`

### 2. Configure Vercel Project
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables
4. Set build command: `npm run build`
5. Set output directory: `.next`

### 3. Custom Domain Setup
\`\`\`bash
# Add custom domain in Vercel dashboard
# Configure DNS records:
# A record: @ -> 76.76.19.61
# CNAME: www -> cname.vercel-dns.com
\`\`\`

## Production Configuration

### 1. Database Schema
\`\`\`sql
-- Organizations table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  organization_id UUID REFERENCES organizations(id),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  organization_id UUID REFERENCES organizations(id),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Files table
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  project_id UUID REFERENCES projects(id),
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### 2. API Routes Setup
\`\`\`typescript
// app/api/organizations/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function GET(request: NextRequest) {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Fetch organizations logic
  return NextResponse.json({ organizations: [] })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession()
  const body = await request.json()
  
  // Create organization logic
  return NextResponse.json({ success: true })
}
\`\`\`

### 3. Middleware Configuration
\`\`\`typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
}
\`\`\`

## Customer Management

### 1. Organization Onboarding
\`\`\`typescript
// utils/onboarding.ts
export async function createOrganization(data: {
  name: string
  adminEmail: string
  plan: 'basic' | 'pro' | 'enterprise'
}) {
  // 1. Create organization record
  // 2. Create admin user
  // 3. Send welcome email
  // 4. Set up default modules
  // 5. Create Stripe customer
}
\`\`\`

### 2. User Invitation System
\`\`\`typescript
// app/api/invitations/route.ts
export async function POST(request: NextRequest) {
  const { email, organizationId, role } = await request.json()
  
  // 1. Generate invitation token
  // 2. Send invitation email
  // 3. Store invitation in database
  
  return NextResponse.json({ success: true })
}
\`\`\`

### 3. Subscription Management
\`\`\`typescript
// utils/stripe.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function createSubscription(customerId: string, priceId: string) {
  return await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  })
}
\`\`\`

## Security Considerations

### 1. Data Protection
- **Encryption**: All data encrypted at rest and in transit
- **Access Control**: Role-based permissions (admin, user, viewer)
- **Data Isolation**: Organizations cannot access each other's data

### 2. Authentication Security
\`\`\`typescript
// lib/auth.ts
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.organizationId = user.organizationId
        token.role = user.role
      }
      return token
    },
  },
}
\`\`\`

### 3. Rate Limiting
\`\`\`typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export async function checkRateLimit(identifier: string) {
  const { success } = await ratelimit.limit(identifier)
  return success
}
\`\`\`

## Monitoring & Analytics

### 1. Error Tracking
\`\`\`bash
# Install Sentry
npm install @sentry/nextjs

# Configure in next.config.js
const { withSentryConfig } = require('@sentry/nextjs')
\`\`\`

### 2. Performance Monitoring
\`\`\`typescript
// lib/analytics.ts
export function trackEvent(eventName: string, properties: any) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties)
  }
}

export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    })
  }
}
\`\`\`

### 3. Health Checks
\`\`\`typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // Check database connection
    // Check external services
    
    return NextResponse.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: error.message },
      { status: 500 }
    )
  }
}
\`\`\`

## Scaling & Performance

### 1. Database Optimization
\`\`\`sql
-- Add indexes for common queries
CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_projects_organization ON projects(organization_id);
CREATE INDEX idx_files_project ON files(project_id);
\`\`\`

### 2. Caching Strategy
\`\`\`typescript
// lib/cache.ts
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export async function getCachedData(key: string) {
  return await redis.get(key)
}

export async function setCachedData(key: string, data: any, ttl = 3600) {
  return await redis.setex(key, ttl, JSON.stringify(data))
}
\`\`\`

### 3. CDN Configuration
\`\`\`javascript
// next.config.js
module.exports = {
  images: {
    domains: ['your-domain.com'],
    loader: 'custom',
    loaderFile: './lib/image-loader.js',
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
    ]
  },
}
\`\`\`

## Maintenance & Updates

### 1. Backup Strategy
\`\`\`bash
# Daily database backups
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Upload to cloud storage
aws s3 cp backup_$(date +%Y%m%d).sql s3://your-backup-bucket/
\`\`\`

### 2. Update Process
\`\`\`bash
# 1. Test in staging
git checkout staging
git pull origin main
vercel --prod --scope staging

# 2. Deploy to production
git checkout main
vercel --prod
\`\`\`

### 3. Monitoring Checklist
- [ ] Database performance metrics
- [ ] API response times
- [ ] Error rates
- [ ] User activity
- [ ] Storage usage
- [ ] Subscription status

## Troubleshooting

### Common Issues

#### 1. Database Connection Issues
\`\`\`bash
# Check connection
psql $DATABASE_URL -c "SELECT 1"

# Check connection pool
SELECT count(*) FROM pg_stat_activity;
\`\`\`

#### 2. File Upload Problems
\`\`\`typescript
// Check Vercel Blob configuration
import { put } from '@vercel/blob'

export async function uploadFile(file: File) {
  try {
    const blob = await put(file.name, file, {
      access: 'public',
    })
    return blob.url
  } catch (error) {
    console.error('Upload failed:', error)
    throw error
  }
}
\`\`\`

#### 3. Authentication Issues
\`\`\`typescript
// Debug session
import { getServerSession } from 'next-auth'

export async function debugAuth() {
  const session = await getServerSession()
  console.log('Session:', session)
  return session
}
\`\`\`

### Support Contacts
- **Technical Issues**: tech@visualgv.com
- **Billing Questions**: billing@visualgv.com
- **Emergency**: +1-XXX-XXX-XXXX

## Pricing Tiers

### Basic Plan ($29/month)
- Up to 5 users
- 10GB storage
- Basic modules
- Email support

### Pro Plan ($99/month)
- Up to 25 users
- 100GB storage
- All modules
- Priority support
- Custom integrations

### Enterprise Plan (Custom)
- Unlimited users
- Unlimited storage
- Custom modules
- Dedicated support
- On-premise option

---

**Last Updated**: December 2024
**Version**: 1.0.0
