import { CheckCircle2, CircleAlert, LoaderCircle, RotateCcw } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useGreeting } from "../hooks/use-greeting";

export function GreetingCard() {
  const greeting = useGreeting();

  return (
    <section className="border-border bg-card rounded-2xl border p-5 shadow-sm" aria-live="polite">
      <div className="flex items-start gap-3">
        {greeting.isPending ? (
          <LoaderCircle className="text-primary mt-0.5 size-5 animate-spin" aria-hidden="true" />
        ) : greeting.isError ? (
          <CircleAlert className="text-destructive mt-0.5 size-5" aria-hidden="true" />
        ) : (
          <CheckCircle2 className="text-success mt-0.5 size-5" aria-hidden="true" />
        )}

        <div className="min-w-0 flex-1">
          <h2 className="font-medium">API boundary</h2>
          {greeting.isPending && (
            <p className="text-muted-foreground mt-1 text-sm">Loading greeting…</p>
          )}
          {greeting.isError && (
            <>
              <p className="text-muted-foreground mt-1 text-sm">
                The example API is unavailable. This is the expected production fallback until a
                backend is connected.
              </p>
              <Button className="mt-4" variant="outline" onClick={() => void greeting.refetch()}>
                <RotateCcw aria-hidden="true" /> Retry
              </Button>
            </>
          )}
          {greeting.isSuccess && (
            <p className="text-muted-foreground mt-1 text-sm">
              {greeting.data.message} <span className="text-success">Mock adapter connected.</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
