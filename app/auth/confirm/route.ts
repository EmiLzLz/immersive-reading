/**
 * This TypeScript function handles a GET request by verifying an OTP token and redirecting the user
 * based on the verification result.
 * @param {Request} request - The `request` parameter in the `GET` function represents the incoming
 * HTTP request that triggers this function. It contains information about the request such as the URL,
 * headers, method, and other relevant details. In this code snippet, the `request` parameter is used
 * to extract query parameters from the URL
 * @returns If the `token_hash` and `type` parameters are provided in the request URL, the code will
 * attempt to verify the OTP using Supabase. If there is no error during the OTP verification, the code
 * will redirect to the URL specified in the `next` parameter. If there is an error during OTP
 * verification or if the `token_hash` and `type` parameters are not provided,
 */
import { createClientSS } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/library";

  if (token_hash && type) {
    const supabase = await createClientSS();

    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }
  return NextResponse.redirect(
    new URL("/", request.url),
  );
}
