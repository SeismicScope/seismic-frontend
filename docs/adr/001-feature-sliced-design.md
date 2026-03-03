# ADR-001: Feature-Sliced Design (FSD) as Frontend Architecture

## Status

Accepted

## Context

SeismicScope is a data-intensive earthquake analytics platform with multiple complex features: interactive maps with clustering, real-time dashboards, analytics charts, filter systems, and authentication. As the codebase grows, we need a scalable architecture that:

- Provides clear boundaries between features
- Makes it easy to onboard new developers
- Prevents cross-feature coupling and circular dependencies
- Scales horizontally — adding new features shouldn't require touching existing ones
- Supports code splitting and lazy loading at the feature level

Traditional folder-by-type structures (`components/`, `hooks/`, `utils/`) become unwieldy as the project grows — a single `components/` folder with 50+ files gives no indication of which feature each component belongs to.

## Decision

I adopt **Feature-Sliced Design (FSD)** as the frontend architecture, organized into layers:

```
src/
├── app/              # Next.js App Router (routing, layouts, providers)
├── features/         # Business features (earthquakes, filters, map, auth)
│   ├── earthquakes/
│   │   ├── api/      # API calls, query keys
│   │   ├── hooks/    # Feature-specific hooks
│   │   ├── components/ # Feature UI components
│   │   ├── types/    # TypeScript interfaces
│   │   └── store/    # Zustand slices
│   ├── filters/
│   ├── map/
│   └── auth/
├── shared/           # Reusable across features
│   ├── ui/           # Design system components (Button, Card, Alert)
│   ├── hooks/        # Generic hooks (useBreakpoints, useBroadcastChannel)
│   ├── lib/          # Utilities (axios, cn, generate-ld-json)
│   ├── providers/    # Context providers (theme, query)
│   └── constants/    # App-wide constants
└── widgets/          # Composite components combining multiple features
```

Key rules:

1. **Features never import from other features** — only from `shared/`
2. **Shared layer has zero business logic** — only generic, reusable code
3. **Each feature is self-contained** — contains its own API, hooks, components, types, and store

## Alternatives Considered

### Folder-by-type (traditional)

```
src/components/  src/hooks/  src/utils/  src/types/
```

Rejected because: flat structure doesn't scale. With 50+ components, it's impossible to tell which feature a component belongs to. Deleting a feature requires hunting through every folder.

### Atomic Design (atoms/molecules/organisms)

Rejected because: classification is subjective (is a FilterPanel a molecule or organism?), and the hierarchy doesn't map to business domain boundaries. Good for design systems, not for feature-rich applications.

### Module-based (NX/Turborepo monorepo)

Rejected because: over-engineering for a single frontend application. FSD provides similar boundaries without the build tooling overhead.

## Consequences

### Positive

- Clear feature boundaries make code navigation intuitive — `features/map/hooks/use-earthquake-map.ts` is self-documenting
- New features are added by creating a new directory under `features/` with no changes to existing code
- Code reviews are scoped to feature directories, reducing cognitive load
- Easy to identify dead code — delete a feature folder and see what breaks
- Aligns well with Next.js App Router's file-based routing

### Negative

- Steeper learning curve for developers unfamiliar with FSD
- Some duplication of utility patterns across features (acceptable trade-off for isolation)
- Requires discipline to maintain layer boundaries — no tooling enforcement yet (could add eslint-plugin-import restrictions)
