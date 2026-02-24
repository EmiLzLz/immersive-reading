import Link from "next/link";

function checkEmailPage() {
  return (
    <div>
      <h1>Please go verify your email</h1>
      <Link href="/">Return Home Page</Link>
    </div>
  );
}

export default checkEmailPage;
