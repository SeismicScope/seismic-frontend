import Link from "next/link";

import { Button } from "@/shared/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-muted-foreground text-lg">Page not found</p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
