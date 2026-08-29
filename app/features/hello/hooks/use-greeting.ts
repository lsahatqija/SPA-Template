import { useQuery } from "@tanstack/react-query";

import { getGreeting } from "../api/greeting-api";

export function useGreeting() {
  return useQuery({
    queryKey: ["hello", "greeting"],
    queryFn: getGreeting,
  });
}
