"use client";

import { useEffect, useState } from "react";
import ClientWrapper from "../document/[id]/components/ClientWrapper";

interface DocumentData {
  title: string;
  content: string;
}

function Page() {
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);

  useEffect(() => {
    const savedTitle = sessionStorage.getItem("title");
    const savedContent = sessionStorage.getItem("content");

    if (savedTitle && savedContent) {
      setDocumentData({ title: savedTitle, content: savedContent });
    }
  }, []);

  if (!documentData) {
    return <p>There's no data in this session</p>;
  }

  return (
    <div className="min-h-screen bg-surface-base">
      <ClientWrapper
        title={documentData.title}
        content={documentData.content}
      />
    </div>
  );
}

export default Page;
