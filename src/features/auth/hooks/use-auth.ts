import { useQuery } from "@tanstack/react-query";

import { api } from "@/shared/lib/axios";

export function useAuth() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.get("/me");

      return data;
    },
    retry: false,
  });
}
