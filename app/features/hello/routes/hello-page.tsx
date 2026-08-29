import { Braces, Moon, Sun } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useTheme } from "~/features/preferences/theme-provider";
import { GreetingCard } from "../components/greeting-card";

export function HelloPage() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <main className="bg-background text-foreground relative min-h-screen overflow-hidden px-6 py-8 sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-accent-glow),transparent_40%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-primary text-primary-foreground grid size-10 place-items-center rounded-xl shadow-sm">
              <Braces className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="leading-tight font-semibold">SPA Template</p>
              <p className="text-muted-foreground text-xs">React · TypeScript · PWA</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
          >
            {resolvedTheme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </Button>
        </header>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.35fr_0.65fr]">
          <section aria-labelledby="page-title">
            <p className="border-border bg-card/70 text-muted-foreground mb-5 inline-flex rounded-full border px-3 py-1 text-xs font-medium backdrop-blur">
              Production-shaped. Business-agnostic.
            </p>
            <h1
              id="page-title"
              className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] sm:text-7xl"
            >
              Hello, world.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-8">
              A small starting point with mature boundaries for routing, remote data, validation,
              testing, accessibility, and progressive web app delivery.
            </p>
          </section>

          <div className="space-y-4">
            <GreetingCard />
            <section className="border-border bg-card/70 rounded-2xl border p-5 backdrop-blur">
              <h2 className="font-medium">Ready to become your product</h2>
              <p className="text-muted-foreground mt-1 text-sm leading-6">
                Remove the hello feature, keep the boundaries, and add only what the next project
                actually needs.
              </p>
            </section>
          </div>
        </div>

        <footer className="border-border text-muted-foreground border-t py-5 text-xs">
          Installable · Offline shell · Keyboard accessible · Backend agnostic
        </footer>
      </div>
    </main>
  );
}
