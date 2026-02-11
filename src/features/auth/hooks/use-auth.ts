import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { login, logout, me } from "../api";

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
    mutationFn: login,
    onSuccess: (userData) => {
      queryClient.setQueryData(["me"], userData);
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
