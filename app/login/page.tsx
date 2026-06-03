"use client";

import { useActionState, useEffect } from "react";
import { signIn } from "../actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

function LoginPage() {
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
    <div className="auth-page-reverse">

      {/* Left panel — form */}
      <div className="auth-right">
        <div className="w-full max-w-sm">

          <div className="mb-8">
            <h1 className="text-2xl font-bold font-serif tracking-tight text-text-primary">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Continue where you left off
            </p>
          </div>

          <form action={formAction} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-text-secondary">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="example@mail.com"
                className="auth-input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-text-secondary">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                placeholder="Your password"
                className="auth-input"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="mt-2 w-full py-2.5 rounded-sm text-sm font-medium bg-[#5F8A7E] hover:bg-[#4A6E64] transition-colors duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ color: "#F2EDE8" }}
            >
              {isPending ? "Signing in..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-text-secondary">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-accent">
              Create Account
            </Link>
          </p>

        </div>
      </div>

      {/* Right panel — branding */}
      <div className="auth-left">
        <p className="auth-left-title">FOLIO</p>
        <p className="auth-left-tagline">
          Your library is<br />
          waiting for you.
        </p>
      </div>

    </div>
  );
}

export default LoginPage;