"use client";

import { Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";

import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
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
  const t = useTranslations();
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
        <Button variant="default" size="sm" aria-label={t("general.login")}>
          {t("general.login")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("general.login")}</DialogTitle>
        </DialogHeader>
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>{t("auth.credentialsForDemo")}</AlertTitle>
          <AlertDescription>
            <p>
              {t("general.username")}:{" "}
              <span className="font-bold">oleinikdev</span>
            </p>
            <p>
              {t("general.password")}:{" "}
              <span className="font-bold">Oleinikdev1996</span>
            </p>
          </AlertDescription>
        </Alert>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">{t("general.username")}</Label>
            <Input
              id="username"
              placeholder={t("auth.enterUsername")}
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
            <Label htmlFor="password">{t("general.password")}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("auth.enterPassword")}
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
            {isLoggingIn ? t("auth.loggingIn") : t("general.login")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
