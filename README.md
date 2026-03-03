# SeismicScope Frontend

High-performance earthquake analytics platform processing **800,000+ seismic records** with interactive mapping, real-time clustering, and comprehensive data visualization. Built with Next.js 16, React 19, and TypeScript under strict Feature-Sliced Design architecture.

[![codecov](https://codecov.io/github/SeismicScope/seismic-frontend/graph/badge.svg?token=CJ1Q2HZEII)](https://codecov.io/github/SeismicScope/seismic-frontend)

|              | URL                                                                             |
| ------------ | ------------------------------------------------------------------------------- |
| Production   | [seismic-scope.vercel.app](https://seismic-scope.vercel.app)                    |
| Storybook    | [Component Library](https://seismicscope.github.io/seismic-frontend/storybook/) |
| Swagger Docs | [API Documentation](https://seismic-scope-be.rest/api/v1/docs)                  |
| Backend repo | [SeismicScope/seismic-backend](https://github.com/SeismicScope/seismic-backend) |

## Tech Stack

| Layer      | Technology                                                 |
| ---------- | ---------------------------------------------------------- |
| Framework  | Next.js 16 (App Router), React 19, TypeScript (strict)     |
| Styling    | Tailwind CSS 4, shadcn/ui (Radix UI primitives)            |
| State      | Zustand, TanStack Query, nuqs (URL-synced filters)         |
| Maps       | Mapbox GL 3 + Supercluster (Web Worker), PostGIS MVT tiles |
| Charts     | Recharts (accessible, aria-described)                      |
| Tables     | TanStack Table + TanStack Virtual (virtualized scrolling)  |
| Forms      | React Hook Form + Zod 4                                    |
| i18n       | next-intl (EN, DE, ES)                                     |
| Testing    | Vitest, Testing Library, Playwright, vitest-axe            |
| Docs       | Storybook 10 with a11y addon                               |
| Monitoring | Sentry, Vercel Speed Insights, Google Analytics 4          |
| CI/CD      | GitHub Actions, Semantic Release, Vercel                   |

## Architecture

The frontend follows **Feature-Sliced Design (FSD)** with ESLint boundary enforcement — cross-layer imports are blocked at lint time, not just by convention.

```
src/
├── app/                          # Next.js App Router (pages, layouts, providers)
│   ├── [locale]/                 # Dynamic i18n routing (EN/DE/ES)
│   │   ├── dashboard/            # KPI cards, data table, CSV import, filters
│   │   ├── map/                  # Interactive Mapbox with Web Worker clustering
│   │   ├── tiles-map/            # Vector tiles (PostGIS → MVT → Mapbox)
│   │   ├── analytics/            # Time-series charts, stats, heatmap
│   │   ├── earthquake/[id]/      # Detail page with static map + JSON-LD
│   │   ├── @modal/(.)earthquake/ # Parallel route — modal intercept
│   │   ├── about/                # Project showcase (tabs/accordion)
│   │   ├── admin/                # Admin panel (RBAC)
│   │   └── s/[code]/             # Short URL redirect
│   └── providers/                # Theme, Query, Sentry, i18n, Analytics
│
├── features/                     # Self-contained feature modules
│   ├── earthquakes/              # Table, pagination, detail, JSON-LD
│   ├── filters/                  # Magnitude, depth, date range, sort (nuqs)
│   ├── map/                      # useEarthquakeMap, cluster worker, MapAdapter
│   ├── analytics/                # Time series, stats, heatmap, today-in-history
│   ├── auth/                     # JWT cookie auth, login dialog
│   ├── import/                   # CSV upload + BullMQ job polling
│   ├── command-palette/          # ⌘K navigation + filter presets (cmdk)
│   └── share-link/               # URL shortener + QR code generation
│
├── entities/                     # Domain models
│   ├── filter/                   # FilterType, schema, URL sync (nuqs)
│   └── map/                      # MapRequestParams, MapStats stores
│
├── shared/                       # Reusable primitives (no business logic)
│   ├── ui/                       # 35+ shadcn/Radix components + stories
│   ├── adapters/                 # MapAdapter (configurable Mapbox wrapper)
│   ├── hooks/                    # useBroadcastChannel, useCopyToClipboard, ...
│   ├── lib/                      # axios (retry), utils, analytics
│   ├── constants/                # Locales, themes, sort options, date ranges
│   ├── components/               # WebVitals, CookieBanner
│   └── boundaries/               # ESLint FSD boundary config
│
├── widgets/                      # Page-level compositions
│   ├── navbar/                   # Responsive nav (desktop menu + mobile sheet)
│   └── theme/                    # Theme switcher + BroadcastChannel sync
│
├── messages/                     # i18n translations (en.json, de.json, es.json)
└── docs/                         # ADR documents
```

### State Management Strategy

The application uses a deliberate multi-layered state approach where each layer serves a specific purpose:

| Layer         | Tool           | Purpose                         | Example                            |
| ------------- | -------------- | ------------------------------- | ---------------------------------- |
| URL State     | nuqs           | Shareable, bookmarkable filters | `?minMag=5&sort=date_desc`         |
| Client State  | Zustand        | Ephemeral UI state              | Command palette open, map bounds   |
| Server Cache  | TanStack Query | API data with caching           | Earthquake list, stats, map points |
| Theme Context | React Context  | Cross-component theme access    | Color theme provider               |

### Boundary Enforcement

FSD layer rules are enforced via `eslint-plugin-boundaries`:

```
app      → can import from: features, entities, shared
features → can import from: entities, shared
entities → can import from: shared
shared   → can import from: shared (only)
```

Violations fail the lint step in CI. See [ADR-001](docs/adr/001-feature-sliced-design.md) for the rationale.

## Key Engineering Patterns

### Web Worker + Supercluster

The interactive map handles 800k+ earthquake points by offloading clustering to a dedicated Web Worker. The worker uses Supercluster with hash-based change detection to avoid re-indexing when the dataset hasn't changed. GeoJSON conversion happens inside the worker to minimize main thread memory allocation. See [ADR-003](docs/adr/003-dual-map-architecture.md).

### Dual Map Architecture

Two map implementations demonstrate different approaches to the same problem: the GeoJSON map fetches raw points and clusters client-side (ideal for 10k–150k visible points), while the Vector Tiles map uses `ST_AsMVT` from PostGIS for server-side tile generation (scales to millions). Both share the same `MapAdapter` abstraction. See [ADR-007](docs/adr/007-map-adapter-pattern.md).

### Cursor Pagination + Virtual Scrolling

The earthquake table uses cursor-based pagination (no offset performance degradation) combined with TanStack Virtual for rendering only visible rows. Infinite scroll automatically fetches the next page as the user approaches the bottom. See [ADR-006](docs/adr/006-cursor-pagination-virtual-scrolling.md).

### URL-Synced Filters (nuqs)

All filter state is synchronized to URL query parameters via nuqs with 500ms throttling and history replacement. This means every filter combination produces a unique, shareable URL. Combined with the URL shortener and QR code generation, users can share exact views of the data. See [ADR-002](docs/adr/002-multi-layered-state-management.md).

### Cross-Tab Synchronization

Theme changes (both light/dark mode and accent color) are synced across browser tabs via the BroadcastChannel API with a custom `useBroadcastChannel` hook. An `isReceiving` flag prevents echo loops. See [ADR-005](docs/adr/005-broadcast-channel-cross-tab-sync.md).

### Hydration-Safe Client Components

Client components that depend on browser APIs use a consistent pattern to avoid SSR hydration mismatches: `typeof window === "undefined"` guards, `useSyncExternalStore` for mounted state, and dynamic imports with `ssr: false` for heavy components. See [ADR-004](docs/adr/004-hydration-safe-client-components.md).

### React Compiler

React 19 with React Compiler is enabled, enforcing strict purity rules across all components. This provides automatic memoization without manual `useMemo`/`useCallback` in most cases.

## Features

### Data & Performance

- 800k+ earthquake records with cursor-based infinite pagination
- Virtualized table rendering (TanStack Virtual) — only visible rows in DOM
- Redis caching with TTL-based invalidation (backend)
- BullMQ async CSV import with batch processing (5000 rows/batch)
- k6 load testing with smoke, load, and spike scenarios

### Maps & Geospatial

- Interactive Mapbox GL map with real-time Supercluster clustering (Web Worker)
- Vector Tiles map (PostGIS `ST_AsMVT` → Mapbox)
- PostGIS dual SRID (WGS 84 + Web Mercator), GIST spatial indexes
- Zoom-adaptive result limits (50k–200k points)

### Frontend Architecture

- Feature-Sliced Design with ESLint boundary enforcement + generator
- Multi-layered state: URL (nuqs) + Client (Zustand) + Server (TanStack Query)
- 3-level theme system: light/dark mode + 3 accent colors (Teal/Tomato/Mango)
- BroadcastChannel cross-tab theme synchronization
- ⌘K Command Palette with navigation and filter presets
- i18n — 3 locales (EN, DE, ES) with server-side rendering
- URL shortener + QR code generation for shareable views
- Parallel routes and intercepting routes for earthquake detail modal

### Backend Architecture

- NestJS 10 with 8 domain modules
- Prisma 7 ORM + raw SQL for spatial queries and aggregations
- Tiered rate limiting (500 req/min general, 50 req/min strict)
- Prometheus metrics endpoint + health check
- Swagger auto-generated API documentation
- Node.js cluster mode (2 workers)

### DevOps & Observability

- GitHub Actions CI/CD: tests, coverage, Storybook build, bundle analysis, CodeQL
- Semantic Release with auto-changelog and versioning
- Docker multi-stage builds (PostGIS + Redis)
- Sentry error tracking (frontend + backend)
- Husky + lint-staged + commitlint (conventional commits)

### UI & Accessibility

- shadcn/ui + Radix UI accessible primitives
- Storybook 10 with a11y addon, deployed to GitHub Pages
- Skeleton loaders, error boundaries, Suspense fallbacks
- Cookie consent banner (GDPR compliance)
- JSON-LD structured data, dynamic sitemap, robots.txt
- Responsive design with mobile navigation

### Code Quality

- Zero `any` types (enforced via ESLint)
- `noUncheckedIndexedAccess: true` in TypeScript config
- Max 300 lines per file (ESLint enforced)
- Plop code generator (7 files per feature)
- Automated import sorting (simple-import-sort)
- Architecture Decision Records (docs/adr/)

## Getting Started

### Prerequisites

- Node.js 22+ (see `.nvmrc`)
- Mapbox access token ([mapbox.com](https://www.mapbox.com/))

### Setup

```bash
cp .env.example .env.local       # set API URL and Mapbox token
npm install
npm run dev                       # http://localhost:3000
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your-mapbox-token
NEXT_PUBLIC_MAPBOX_STYLE=mapbox://styles/mapbox/dark-v11
```

## Pages

| Route              | Description                                           |
| ------------------ | ----------------------------------------------------- |
| `/`                | Landing page with hero and CTA                        |
| `/dashboard`       | KPI cards, filters, earthquake table, CSV import      |
| `/map`             | Interactive Mapbox map with Web Worker clustering     |
| `/tiles-map`       | Vector tiles map (PostGIS MVT)                        |
| `/analytics`       | Time-series charts, aggregate stats, heatmap          |
| `/earthquake/[id]` | Detail page with static map + JSON-LD structured data |
| `/about`           | Project showcase — architecture, features, decisions  |
| `/s/[code]`        | Short URL redirect                                    |

## Scripts

```bash
npm run dev               # Development server
npm run build             # Production build
npm run lint              # ESLint with FSD boundary check
npm run format            # Prettier
npm test                  # Vitest (unit + component tests)
npm run test:coverage     # Coverage report (v8)
npm run storybook         # Component playground on :6006
npm run generate          # Plop — scaffold new feature module
```

## Architecture Decision Records

| ADR                                                        | Decision                                        |
| ---------------------------------------------------------- | ----------------------------------------------- |
| [001](docs/adr/001-feature-sliced-design.md)               | Feature-Sliced Design as architectural pattern  |
| [002](docs/adr/002-multi-layered-state-management.md)      | Multi-layered state management strategy         |
| [003](docs/adr/003-dual-map-architecture.md)               | Dual map architecture (GeoJSON + MVT)           |
| [004](docs/adr/004-hydration-safe-client-components.md)    | Hydration-safe client component patterns        |
| [005](docs/adr/005-broadcast-channel-cross-tab-sync.md)    | Cross-tab synchronization with BroadcastChannel |
| [006](docs/adr/006-cursor-pagination-virtual-scrolling.md) | Cursor pagination with virtual scrolling        |
| [007](docs/adr/007-map-adapter-pattern.md)                 | MapAdapter as reusable map abstraction          |

## Deployment

**Frontend:** Deployed on [Vercel](https://vercel.com). Push to `main` triggers automatic build and deployment.

**Backend:** Deployed on DigitalOcean Droplet (Ubuntu 24.04 LTS) via GitHub Actions. Docker Compose runs NestJS (cluster mode), PostgreSQL (PostGIS), and Redis behind Nginx with Let's Encrypt SSL.

## License

MIT
