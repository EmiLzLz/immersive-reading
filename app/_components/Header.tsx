import { createClientSS } from "@/lib/supabase/server";
import { signOut } from "../actions/auth";
import Link from "next/link";

async function Header() {
  const supabase = await createClientSS();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return (
      <div>
        <Link href="/login">Log In</Link>
        <Link href="/register">Sign In</Link>
      </div>
    );
  }

  return (
    <div>
      <form action={signOut}>
        <button type="submit">Log Out</button>
      </form>
    </div>
  );
}

export default Header;
