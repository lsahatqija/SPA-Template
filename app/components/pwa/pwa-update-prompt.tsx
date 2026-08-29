import { RefreshCw, WifiOff, X } from "lucide-react";
import { useRegisterSW } from "virtual:pwa-register/react";

import { Button } from "~/components/ui/button";

export function PwaUpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!offlineReady && !needRefresh) return null;

  const dismiss = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <aside
      className="border-border bg-card text-card-foreground fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-2xl border p-4 shadow-xl"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        {needRefresh ? (
          <RefreshCw className="text-primary mt-0.5 size-5" aria-hidden="true" />
        ) : (
          <WifiOff className="text-success mt-0.5 size-5" aria-hidden="true" />
        )}
        <div className="flex-1">
          <p className="font-medium">{needRefresh ? "Update available" : "Ready offline"}</p>
          <p className="text-muted-foreground mt-1 text-sm">
            {needRefresh
              ? "Reload to use the latest version."
              : "The application shell is cached for offline use."}
          </p>
          {needRefresh && (
            <Button className="mt-3" onClick={() => void updateServiceWorker(true)}>
              Reload
            </Button>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={dismiss} aria-label="Dismiss notification">
          <X aria-hidden="true" />
        </Button>
      </div>
    </aside>
  );
}
