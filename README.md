# Mature SPA Template

A reusable React single-page application that is also an installable PWA. The visible product is deliberately small; the project boundaries, validation, tests, and hosting contract are ready for a mature application.

## Requirements

- Node.js 24 LTS
- pnpm 11 through Corepack

## Start locally

```bash
corepack enable
pnpm install
cp .env.example .env
pnpm dev
```

The development API is mocked by MSW when `VITE_ENABLE_API_MOCKS=true`. Variables prefixed with `VITE_` are public browser configuration and must never contain secrets.

## Validate

```bash
pnpm validate
pnpm test:e2e
```

`validate` runs route type generation, strict TypeScript, ESLint, formatting checks, unit/component tests, and a production build. The browser suite builds the application and verifies navigation, the manifest, and service-worker registration.

## Production output

```bash
pnpm build
pnpm preview
```

Deploy `build/client`. The host must rewrite unknown application routes to `/index.html`, avoid long-lived caching for `index.html`, `sw.js`, and the manifest, and may cache fingerprinted assets immutably. The included Dockerfile demonstrates this contract with Nginx; it is an example, not deployment automation.

## Architecture

- `app/routes`: route modules and navigation coordination
- `app/features`: feature-owned UI, contracts, API functions, and hooks
- `app/infrastructure`: replaceable browser and backend integration adapters
- `app/components/ui`: small accessible UI foundation
- `app/config`: validated public runtime configuration
- `app/mocks`: development and test API adapter
- `e2e`: production browser smoke tests
- `docs`: extension, PWA, and hosting guidance

Read [Architecture](docs/architecture.md), [Extending the template](docs/extending-the-template.md), [PWA behavior](docs/pwa.md), and [Deployment contract](docs/deployment.md) before starting a real product.

## Create a new project

Use this repository as a template, rename the package and application metadata, replace the icons, remove `app/features/hello`, and add the first real feature. Do not retain example abstractions that the product does not use.

Licensed under the [MIT License](LICENSE).
