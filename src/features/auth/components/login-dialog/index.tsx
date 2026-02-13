"use client";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { useLoginDialog } from "./use-login-dialog";

export function LoginDialog() {
  const {
    open,
    setOpen,
    register,
    isLoggingIn,
    errors,
    handleSubmit,
    onSubmit,
  } = useLoginDialog();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" aria-label="Login">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter username"
              {...register("username")}
              aria-invalid={!!errors.username}
            />
            {errors.username && (
              <p className="text-destructive text-sm">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-destructive text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Login"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
