import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useFilters } from "@/entities/filter/hooks/use-filters";

import { useCommandPaletteStore } from "../store/use-command-palette-store";

export function useCommandPalette() {
  const { open, setOpen } = useCommandPaletteStore();
  const router = useRouter();
  const { setFilters, resetFilters } = useFilters();

  function handleNavigate(path: string): void {
    router.push(path);
    setOpen(false);
  }

  function handleFilter(action: () => object | null): void {
    const result = action();
    if (result === null) {
      resetFilters();
    } else {
      setFilters(result);
    }
    setOpen(false);
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return {
    handleNavigate,
    handleFilter,
    open,
    setOpen,
  };
}
