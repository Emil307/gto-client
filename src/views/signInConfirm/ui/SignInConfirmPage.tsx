import { SignInConfirm } from "@/src/widgets/auth/ui/SignInConfirm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <SignInConfirm />
    </Suspense>
  );
}
