"use client";

import { Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

import { type Locale, LOCALE_META, LOCALES } from "../constants";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const subscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const mounted = useMounted();
  const [open, setOpen] = useState(false);

  if (!mounted) return null;

  const currentLocale = pathname.split("/")[1] as Locale;
  const currentMeta = LOCALE_META[currentLocale];

  function switchLanguage(locale: Locale) {
    if (locale === currentLocale) {
      setOpen(false);

      return;
    }
    const segments = pathname.split("/");
    segments[1] = locale;
    setOpen(false);
    router.push(segments.join("/"));
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9"
          aria-label="Change language"
        >
          <span className="text-xl leading-none">{currentMeta.flag}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-44 p-1">
        <div role="listbox" aria-label="Language">
          {LOCALES.map((locale) => {
            const meta = LOCALE_META[locale];
            const isActive = currentLocale === locale;

            return (
              <Button
                key={locale}
                variant="ghost"
                role="option"
                aria-selected={isActive}
                onClick={() => switchLanguage(locale)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm transition-colors",
                  "focus-visible:outline-ring focus-visible:outline-2",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-accent/50",
                )}
              >
                <span className="text-lg leading-none">{meta.flag}</span>
                <span className="flex-1 text-left font-medium">
                  {meta.label}
                </span>
                {isActive && <Check className="text-primary size-3.5" />}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
