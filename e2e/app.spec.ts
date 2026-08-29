import { expect, test } from "@playwright/test";

test("renders the application and supports client-side fallback routes", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Hello, world." })).toBeVisible();

  await page.goto("/missing-page");
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
});

test("exposes an installable manifest and service worker", async ({ page, request }) => {
  await page.goto("/");
  const manifestHref = await page.locator('link[rel="manifest"]').getAttribute("href");
  expect(manifestHref).toBeTruthy();

  const manifestResponse = await request.get(manifestHref!);
  expect(manifestResponse.ok()).toBeTruthy();
  const manifest = (await manifestResponse.json()) as { name?: string; icons?: unknown[] };
  expect(manifest.name).toBe("Mature SPA Template");
  expect(manifest.icons).toHaveLength(3);

  await expect
    .poll(() => page.evaluate(() => navigator.serviceWorker.ready.then(() => true)))
    .toBe(true);
});
