import type { Metadata } from "next";
import { Suspense } from "react";

import { SignInClient } from "./SignInClient";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to AWS SBG VJIT with your Google account.",
};

export default function SignInPage() {
  return (
    <Suspense>
      <SignInClient />
    </Suspense>
  );
}
