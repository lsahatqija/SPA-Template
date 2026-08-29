import { Link } from "react-router";

import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <main className="bg-background text-foreground grid min-h-screen place-items-center px-6">
      <section className="max-w-md space-y-4 text-center" aria-labelledby="not-found-title">
        <p className="text-primary text-sm font-medium">404</p>
        <h1 id="not-found-title" className="text-3xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="text-muted-foreground">The page you requested does not exist.</p>
        <Button asChild>
          <Link to="/">Return home</Link>
        </Button>
      </section>
    </main>
  );
}
