import { env } from "~/config/env";
import { ApiError } from "./api-error";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  timeoutMs?: number;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(
    () => controller.abort(new DOMException("Request timed out", "TimeoutError")),
    options.timeoutMs ?? env.apiTimeoutMs,
  );

  try {
    const response = await fetch(`${env.apiBaseUrl}${path}`, {
      ...options,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(options.body === undefined ? {} : { "Content-Type": "application/json" }),
        ...options.headers,
      },
      signal: options.signal ?? controller.signal,
    });

    if (!response.ok) {
      const details = await readJsonSafely(response);
      throw new ApiError({
        message: getErrorMessage(details) ?? `Request failed with status ${response.status}`,
        status: response.status,
        details,
      });
    }

    if (response.status === 204) return undefined as T;
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError({ message: "The request was cancelled.", code: "REQUEST_CANCELLED" });
    }
    throw new ApiError({
      message: error instanceof Error ? error.message : "The request could not be completed.",
      code: "NETWORK_ERROR",
    });
  } finally {
    window.clearTimeout(timeout);
  }
}

async function readJsonSafely(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return undefined;
  }
}

function getErrorMessage(value: unknown): string | undefined {
  if (typeof value !== "object" || value === null || !("message" in value)) return undefined;
  return typeof value.message === "string" ? value.message : undefined;
}
