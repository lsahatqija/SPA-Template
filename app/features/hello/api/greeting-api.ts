import { apiRequest } from "~/infrastructure/api/api-client";
import { greetingSchema, type Greeting } from "../schemas/greeting";

export async function getGreeting(): Promise<Greeting> {
  const response = await apiRequest<unknown>("/greeting");
  return greetingSchema.parse(response);
}
