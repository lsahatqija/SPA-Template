import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { AppProviders } from "./app/providers";
import { PwaUpdatePrompt } from "./components/pwa/pwa-update-prompt";
import { Button } from "./components/ui/button";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "manifest", href: "/manifest.webmanifest" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111827" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <main className="bg-background grid min-h-screen place-items-center px-6">
      <p className="text-muted-foreground text-sm">Preparing the application…</p>
    </main>
  );
}

export default function App() {
  return (
    <AppProviders>
      <Outlet />
      <PwaUpdatePrompt />
    </AppProviders>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const isRouteError = isRouteErrorResponse(error);
  const title = isRouteError && error.status === 404 ? "Page not found" : "Something went wrong";
  const details =
    isRouteError && error.status === 404
      ? "The page you requested does not exist."
      : "The application could not complete this request.";

  return (
    <main className="bg-background text-foreground grid min-h-screen place-items-center px-6">
      <section className="max-w-md space-y-4 text-center" aria-labelledby="error-title">
        <p className="text-primary text-sm font-medium">{isRouteError ? error.status : "Error"}</p>
        <h1 id="error-title" className="text-3xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground">{details}</p>
        <Button asChild>
          <a href="/">Return home</a>
        </Button>
      </section>
    </main>
  );
}
