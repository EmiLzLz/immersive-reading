"use client";

import { useActionState, useEffect } from "react";
import { signIn } from "../actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function loginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signIn, undefined);

  useEffect(() => {
    if (state?.success) {
      toast.success("User login successfully");
      router.push("/library");
    }
  }, [state?.success, router]);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.error]);

  return (
    <div>
      <form action={formAction}>
        <input
          type="email"
          name="email"
          required
          placeholder="example@mail.com"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Mypassword123"
        />

        <button type="submit" disabled={isPending}>
          {isPending ? "Loading" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default loginPage;
