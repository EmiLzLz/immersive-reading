"use client";

import { useState } from "react";
import { processPdf } from "./actions/uploadDocument";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await processPdf(formData);

      if (response.error) {
        setErr(response.error);
        return;
      }

      if (response.success && response.id) {
        router.push(`/document/${response.id}`);
      }
    } catch (error) {
      setErr("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <form onSubmit={handleSubmit}>
        <label>Select a PDF file to upload</label>
        <input type="file" id="file" name="file" accept="application/pdf" />
        <input type="submit" value="Upload PDF" disabled={loading} />
        {err && <div>{err}</div>}
      </form>
    </div>
  );
}
