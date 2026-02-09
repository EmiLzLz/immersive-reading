"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { pdfParser } from "@/lib/pdfParser";
import { uploadDocument } from "./actions/uploadDocument";

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
      const file = formData.get("file") as File;

      if (!file) {
        setErr("Please, upload a PDF file");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setErr("The file exceeds the maximum size: 10MB");
        return;
      }

      if (file.type !== "application/pdf") {
        setErr("You can upload PDF files only");
        return;
      }

      const response = await pdfParser(formData);
      const documentUpload = await uploadDocument(
        response.title,
        response.content,
        response.metadata,
      );

      if (documentUpload.error) {
        setErr(documentUpload.error);
        return;
      }

      router.push(`/document/${documentUpload.id}`);
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
