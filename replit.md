# CMRSync

## Overview
CMRSync is an AI-powered logistics tool for European trucking teams. It automates the extraction of data from CMR (Consignment Note) waybills using AI — drivers photograph CMRs, data is extracted instantly, and organized for invoice generation.

## Tech Stack
- **Framework**: TanStack Start (full-stack React framework)
- **Frontend**: React 19 with TanStack Router (file-based routing)
- **Styling**: Tailwind CSS 4.0 + Radix UI primitives (shadcn/ui)
- **State/Data**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Build**: Vite 7 via `@lovable.dev/vite-tanstack-config`
- **Package Manager**: npm (Node.js 20)
- **Language**: TypeScript

## Project Structure
```
src/
  routes/         # File-based routing (TanStack Router)
  components/
    landing/      # Landing page sections (Hero, Features, Pricing, etc.)
    ui/           # Reusable shadcn/ui components
    legal/        # Privacy and Terms components
  hooks/          # Custom React hooks
  lib/            # Utility functions
  assets/         # Static assets (logos)
  router.tsx      # Router configuration
  routeTree.gen.ts # Auto-generated route tree
  styles.css      # Global CSS + Tailwind directives
```

## Dev Server
- Runs on port 5000 with host `0.0.0.0`
- Command: `npm run dev`
- Config in `vite.config.ts` overrides the lovable package defaults

## Deployment
- Type: Static site
- Build command: `npm run build`
- Output directory: `dist/client`

## Key Notes
- The `@lovable.dev/vite-tanstack-config` package wraps Vite config and adds TanStack Start, Tailwind, tsconfig paths, and Cloudflare plugins
- Port 5000 is configured via `vite.config.ts` overriding the package's default of 8080
- `allowedHosts: true` ensures Replit proxy works correctly
