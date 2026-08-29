import { z } from "zod";

const envSchema = z.object({
  VITE_APP_ENV: z.enum(["development", "staging", "production"]).default("development"),
  VITE_API_BASE_URL: z.string().min(1).default("/api"),
  VITE_ENABLE_API_MOCKS: z.stringbool().default(false),
  VITE_API_TIMEOUT_MS: z.coerce.number().int().positive().default(10_000),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  throw new Error(`Invalid public environment configuration: ${z.prettifyError(parsed.error)}`);
}

export const env = {
  appEnvironment: parsed.data.VITE_APP_ENV,
  apiBaseUrl: parsed.data.VITE_API_BASE_URL.replace(/\/$/, ""),
  enableApiMocks: parsed.data.VITE_ENABLE_API_MOCKS,
  apiTimeoutMs: parsed.data.VITE_API_TIMEOUT_MS,
} as const;
