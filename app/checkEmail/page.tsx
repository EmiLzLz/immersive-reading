import Link from "next/link";
import { MailCheck } from "lucide-react";

function CheckEmailPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <MailCheck size={48} className="text-accent mb-6" strokeWidth={1.5} />
      <h1 className="text-3xl font-bold mb-3">Check your email</h1>
      <p className="text-text-secondary max-w-sm mb-8">
        We sent you a confirmation link. Please verify your email to continue.
      </p>
      <Link
        href="/"
        className="nav-link text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-150"
      >
        ← Return to Home
      </Link>
    </div>
  );
}

export default CheckEmailPage;
