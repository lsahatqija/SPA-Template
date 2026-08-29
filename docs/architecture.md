# Architecture

## Dependency direction

Routes compose features. Features may depend on shared UI and infrastructure contracts. Infrastructure must not import feature UI. Components do not read environment variables, call `fetch`, or access browser storage directly.

```text
route module → feature → infrastructure boundary
                    ↘ shared UI
```

## State ownership

- TanStack Query owns data retrieved from a backend.
- Component state and reducers own transient UI state.
- Context is reserved for stable, low-frequency concerns such as theme and authentication session state.
- Add Zustand only when real cross-feature client state cannot live in these places.

## Boundary validation

Zod schemas validate public environment configuration and untrusted API responses. TypeScript types alone do not validate runtime data. Feature folders own their transport schemas unless a contract is genuinely shared across multiple features.

## Routing

React Router Framework Mode provides typed route modules and code splitting. This project uses SPA mode (`ssr: false`), so only the root can use a build-time server loader. Product data should use client-side query hooks or `clientLoader` when route-level loading is specifically beneficial.

## Error handling

The API client converts transport failures into `ApiError`. Feature UI decides how errors should appear and whether retry is safe. The root error boundary handles unexpected route failures without exposing stack traces to users.

## Rules for dependencies

Add a dependency to solve a current requirement. Do not preinstall authentication vendors, analytics, databases, WebSockets, offline mutation queues, or global state libraries. Document and introduce those choices in the product that needs them.
