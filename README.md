# SeismicScope Frontend

Earthquake data visualization — interactive map with clustering, analytics dashboard with time-series charts, filterable data tables with cursor pagination.

## Links

|              | URL                                                                             |
| ------------ | ------------------------------------------------------------------------------- |
| Production   | [seismic-scope.vercel.app](https://seismic-scope.vercel.app)                    |
| Storybook    | [Storybook](https://seismicscope.github.io/seismic-frontend/storybook/)         |
| Backend repo | [SeismicScope/seismic-backend](https://github.com/SeismicScope/seismic-backend) |

## Tech Stack

|            | Technology                                    |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 16 (App Router), React 19, TypeScript |
| Styling    | Tailwind CSS 4, shadcn/ui (Radix UI)          |
| State      | Zustand, TanStack Query, nuqs (URL state)     |
| Map        | Mapbox GL 3 + Supercluster (Web Worker)       |
| Charts     | Recharts                                      |
| Tables     | TanStack Table + TanStack Virtual             |
| Testing    | Vitest, Testing Library                       |
| Docs       | Storybook 10                                  |
| Monitoring | Sentry                                        |

## Getting Started

### Prerequisites

- Node.js 22+
- Mapbox access token

### Setup

```bash
cp .env.example .env.local       # set API URL and Mapbox token
npm install
npm run dev                       # http://localhost:3000
```

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your-mapbox-token
NEXT_PUBLIC_MAPBOX_STYLE=mapbox://styles/mapbox/dark-v11
```

## Pages

| Route              | Description                                         |
| ------------------ | --------------------------------------------------- |
| `/`                | Landing page                                        |
| `/dashboard`       | KPI cards, filters, earthquake table, CSV import    |
| `/map`             | Interactive Mapbox map with real-time clustering    |
| `/analytics`       | Time-series charts, aggregate statistics            |
| `/earthquake/[id]` | Earthquake detail with static map + pulse animation |
| `/about`           | About page                                          |

## Project Structure

```
src/
  app/                     Pages (App Router)
    dashboard/             KPI cards, data table, import modal
    map/                   Mapbox GL with Web Worker clustering
    analytics/             Time-series + stats charts
    earthquake/[id]/       Detail page with static map
    about/

  features/
    filters/               Magnitude, depth, date range filters (nuqs sync)
    map/                   useEarthquakeMap, cluster worker, MapAdapter
    analytics/             useEarthquakesTimeSeries, chart helpers
    earthquakes/           useEarthquakes, table with pagination + sorting
    import/                useUploadEarthquakes, useImportStatus
    auth/                  useAuth (JWT cookie)

  shared/
    ui/                    shadcn components (table, card, dialog, skeleton, ...)
    adapters/              MapAdapter (configurable Mapbox wrapper)
    providers/             Theme, React Query, Sentry
    hooks/                 Shared hooks
    constants/             App-wide constants
```

## Key Patterns

- **MapAdapter** — encapsulates Mapbox GL with configurable options (center, zoom, interactive, controls), used for both interactive map and static detail page
- **Web Worker + Supercluster** — offloads point clustering to a worker thread for smooth map performance at 800k+ points
- **nuqs** — all filter state synced to URL query params, shareable links
- **Cursor pagination** — efficient scrolling through large datasets without offset overhead
- **React Compiler** — enabled, strict purity rules for all components

## Scripts

```bash
npm run dev               # development server
npm run build             # production build
npm run lint              # eslint --fix
npm run format            # prettier
npm test                  # vitest
npm run test:coverage     # vitest with coverage
npm run storybook         # component playground on :6006
```

### Test Coverage

[![codecov](https://codecov.io/github/SeismicScope/seismic-frontend/graph/badge.svg?token=CJ1Q2HZEII)](https://codecov.io/github/SeismicScope/seismic-frontend)

## Deployment

Deployed on Vercel. Push to `main` triggers automatic build and deployment.
