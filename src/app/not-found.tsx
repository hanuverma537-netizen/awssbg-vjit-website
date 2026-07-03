import Link from "next/link";

import { routes } from "@/lib/constants/routes";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/Logo";

/*
 * Owner: Rishikesh
 * Status: functional; polish welcome (illustration, on-brand copy).
 */
export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo />
      <p className="eyebrow">Error 404</p>
      <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
        This page did not provision.
      </h1>
      <p className="text-muted-foreground max-w-md">
        The page you are looking for does not exist or was moved. Let us get you
        back to solid ground.
      </p>
      <Button asChild>
        <Link href={routes.home}>Back to home</Link>
      </Button>
    </div>
  );
}
