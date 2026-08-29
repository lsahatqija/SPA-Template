import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { env } from "~/config/env";
import { ThemeProvider } from "~/features/preferences/theme-provider";
import { queryClient } from "./query-client";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const enableDevelopmentMocks = import.meta.env.DEV && env.enableApiMocks;
  const [mocksReady, setMocksReady] = useState(!enableDevelopmentMocks);

  useEffect(() => {
    if (!enableDevelopmentMocks) return;

    void import("~/mocks/browser")
      .then(({ worker }) => worker.start({ onUnhandledRequest: "bypass" }))
      .then(() => setMocksReady(true));
  }, [enableDevelopmentMocks]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{mocksReady ? children : <AppLoading />}</ThemeProvider>
    </QueryClientProvider>
  );
}

function AppLoading() {
  return (
    <main className="bg-background grid min-h-screen place-items-center px-6">
      <p className="text-muted-foreground text-sm">Starting the local API adapter…</p>
    </main>
  );
}
