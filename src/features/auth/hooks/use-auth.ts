import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { login, logout, me } from "../api";
import type { LoginCredentials } from "../types";

export function useAuth() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    retry: false,
    refetchOnWindowFocus: false,
    meta: {
      skipGlobalErrorHandler: true,
    },
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
      queryClient.removeQueries({ queryKey: ["me"] });
    },
  });

  return {
    user,
    isLoading,
    isError,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}
