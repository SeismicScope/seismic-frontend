"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";

export function useNavbar() {
  const { logout, user } = useAuth();

  async function handleLogout(): Promise<void> {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  }

  return {
    logout: handleLogout,
    user,
  };
}
