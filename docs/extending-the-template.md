# Extending the template

## Replace the example

1. Delete `app/features/hello` and its route composition.
2. Create `app/features/<feature-name>` with only the folders the feature needs.
3. Register route modules in `app/routes.ts`.
4. Keep page metadata in the matching route module.
5. Add MSW handlers for backend calls before building UI against them.

## Connect a backend

Set `VITE_API_BASE_URL`, disable API mocks outside development, and add feature-specific endpoint functions that use `apiRequest`. Validate response payloads with Zod. Keep credentials in secure HTTP-only cookies when possible; never put secrets in `VITE_*` variables or local storage.

## Add authentication

Introduce an authentication feature and a session provider only when the backend contract is known. Keep token/cookie behavior in infrastructure, route access decisions near routing, and user-facing sign-in behavior in the feature. Avoid coupling generic components to a provider SDK.

## Add forms

Use native React form state for small forms. Use the installed React Hook Form and Zod resolver for forms with several fields, conditional sections, or nontrivial validation. Schemas belong to the feature that owns the input.

## Add local persistence

Create a focused adapter under `app/infrastructure/storage`. Local storage is suitable for small non-sensitive preferences. Use IndexedDB for larger browser-owned data. Offline server mutations require product-specific synchronization and conflict policies and are intentionally absent.

## Branding checklist

- Update package metadata and document titles.
- Replace tokens in `app/app.css` for light and dark themes.
- Replace all manifest icons and theme colors.
- Update PWA name, short name, description, and social metadata.
- Replace the Hello World feature and tests.
