"use client";

import { uploadDocument } from "@/app/actions/uploadDocument";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface UploadModalProps {
  onClose: () => void;
}

function UploadModal({ onClose }: UploadModalProps) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const { pdfParser } = await import("@/lib/pdfParser");
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

      if (!documentUpload.id) {
        setErr("Something went wrong");
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>Select a PDF file to upload</label>
        <input type="file" id="file" name="file" accept="application/pdf" />
        <input type="submit" value="Upload PDF" disabled={loading} />
        {err && <div>{err}</div>}
      </form>
    </div>
  );
}

export default UploadModal;
