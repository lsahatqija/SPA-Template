import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";

import { server } from "~/mocks/server";
import { GreetingCard } from "./greeting-card";

function renderSubject() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <GreetingCard />
    </QueryClientProvider>,
  );
}

describe("GreetingCard", () => {
  it("renders loading and success states", async () => {
    renderSubject();
    expect(screen.getByText("Loading greeting…")).toBeInTheDocument();
    expect(await screen.findByText(/Hello from the development API/)).toBeInTheDocument();
  });

  it("renders a recoverable error state", async () => {
    server.use(http.get("*/api/greeting", () => HttpResponse.json({}, { status: 503 })));
    renderSubject();
    expect(await screen.findByRole("button", { name: /retry/i })).toBeInTheDocument();
  });
});
