import * as React from "react";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

/** Marketing shell: fixed nav over content, footer below. */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
