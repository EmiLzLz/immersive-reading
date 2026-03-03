"use client";

import { useActionState, useEffect } from "react";
import { signUp } from "../actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

function RegisterPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signUp, undefined);

  useEffect(() => {
    if (state?.success) {
      toast.success("Check your email to confirm your account please");
      router.push("/checkEmail");
    }
  }, [state?.success, router]);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.error]);

  return (
    <div className="auth-page">
      {/* Left panel */}
      <div className="auth-left">
        <p className="auth-left-title">FOLIO</p>
        <p className="auth-left-tagline">
          Read any PDF your way.
          <br />
          Your library, your pace.
        </p>
      </div>

      {/* Right panel */}
      <div className="auth-right">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold font-serif tracking-tight text-text-primary">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Start your reading journey with FOLIO
            </p>
          </div>

          <form action={formAction} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-text-secondary"
              >
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
              <label
                htmlFor="password"
                className="text-sm font-medium text-text-secondary"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                placeholder="Min. 8 characters"
                className="auth-input"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="mt-2 w-full py-2.5 rounded-sm text-sm font-medium bg-[#5F8A7E] hover:bg-[#4A6E64] transition-colors duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ color: "#F2EDE8" }}
            >
              {isPending ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-accent">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
