import { createClientSS } from "@/lib/supabase/server";
import { signOut } from "../actions/auth";
import Link from "next/link";
import { LogOut, Library } from "lucide-react";

async function Header() {
  const supabase = await createClientSS();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <header className="w-full bg-surface-raised">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="nav-link font-serif text-xl font-bold tracking-tight text-text-primary hover:text-accent transition-colors duration-150"
        >
          FOLIO
        </Link>

        <nav className="flex items-center gap-6">
          {error || !user ? (
            <>
              <Link
                href="/login"
                className="nav-link text-sm text-text-secondary hover:text-accent transition-colors duration-150"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="nav-link-cta text-sm px-4 py-1.5 bg-[#5F8A7E] rounded-sm hover:bg-[#4A6E64] transition-colors duration-150"
              >
                Create Account
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/library"
                className="nav-link flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors duration-150"
              >
                <Library size={15} />
                Library
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="nav-link flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors duration-150 cursor-pointer bg-transparent border-none p-0"
                >
                  <LogOut size={15} />
                  Log Out
                </button>
              </form>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
