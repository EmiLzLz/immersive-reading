"use client";

import { uploadDocument } from "@/app/actions/uploadDocument";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface UploadModalProps {
  onClose: () => void;
}

function UploadModal({ onClose }: UploadModalProps) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { pdfParser } = await import("@/lib/pdfParser");
    setLoading(true);
    setErr(null);
    try {
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

      router.push(`/library`);
    } catch {
      setErr("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-md rounded-2xl bg-surface-base p-8 shadow-xl z-50"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-text-secondary transition-colors duration-150 hover:bg-surface-raised hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <h2 id="modal-title" className="mb-6 text-2xl">
          Upload a PDF
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="file"
              className="text-sm font-semibold text-text-primary"
            >
              Select a PDF file
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept="application/pdf"
              className="cursor-pointer rounded-lg border border-surface-raised bg-surface-raised px-4 py-3 text-sm text-text-primary file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1 file:text-sm file:text-white hover:file:bg-accent-hover  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            />
          </div>

          {err && (
            <p role="alert" className="text-sm text-red-600">
              {err}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center rounded-lg bg-accent text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload PDF"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;
