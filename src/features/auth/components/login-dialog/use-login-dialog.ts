import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { getErrorMessage } from "@/shared/lib/utils";

import { type LoginFormValues, loginSchema } from "./schema";

export function useLoginDialog() {
  const [open, setOpen] = useState(false);
  const { login, isLoggingIn } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      await login(values);
      setOpen(false);
      reset();
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return {
    open,
    setOpen,
    register,
    isLoggingIn,
    errors,
    handleSubmit,
    onSubmit,
  };
}
