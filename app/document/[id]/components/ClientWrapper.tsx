"use client";

import { useState } from "react";
import ReadingControls from "./ReadingControls";
import DocumentContent from "./DocumentContent";
import { ReadingSettings } from "@/lib/reading-types";
import { BookOpen, Home } from "lucide-react";
import Link from "next/link";

interface ClientWrapperProps {
  title: string;
  content: string;
}

const ClientWrapper = ({ title, content }: ClientWrapperProps) => {
  const [readingSettings, setReadingSettings] = useState<ReadingSettings>({
    font: "sans-serif",
    width: "normal",
    fontSize: 16,
  });

  const updateFont = (newFont: "sans-serif" | "serif") => {
    setReadingSettings({ ...readingSettings, font: newFont });
  };

  const updateFontSize = (increment: number) => {
    const newSize = readingSettings.fontSize + increment;
    if (newSize >= 12 && newSize <= 50) {
      setReadingSettings({ ...readingSettings, fontSize: newSize });
    }
  };

  const updateWidth = (size: "narrow" | "normal" | "wide") => {
    setReadingSettings({ ...readingSettings, width: size });
  };

  return (
    <section className="pt-20">
      <ReadingControls
        readingSettings={readingSettings}
        onUpdateFont={updateFont}
        onUpdateWidth={updateWidth}
        onUpdateFontSize={updateFontSize}
      />
      <nav className="reading-subnav">
        <Link href="/" className="reading-subnav-link">
          <Home size={14} aria-hidden="true" />
          Home
        </Link>
        <Link href="/library" className="reading-subnav-link">
          <BookOpen size={14} aria-hidden="true" />
          My Library
        </Link>
      </nav>
      <DocumentContent
        title={title}
        content={content}
        readingSettings={readingSettings}
      />
    </section>
  );
};

export default ClientWrapper;
