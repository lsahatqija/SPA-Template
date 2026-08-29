import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/api/greeting", async () => {
    await delay(250);
    return HttpResponse.json({
      message: "Hello from the development API.",
      source: "development-api",
    });
  }),
];
