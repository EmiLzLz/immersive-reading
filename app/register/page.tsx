"use client";

import { useActionState, useEffect } from "react";
import { signUp } from "../actions/auth";
import { useRouter } from "next/navigation";

function registerPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signUp, undefined);

  useEffect(() => {
    if (state?.success) {
      router.push("/check-email");
    }
  }, [state?.success, router]);

  useEffect(() => {
    if(state?.error){
        
    }
  }, [state?.error])

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
          {isPending ? "Loading" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default registerPage;
