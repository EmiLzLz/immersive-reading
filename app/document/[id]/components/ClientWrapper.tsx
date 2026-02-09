"use client";

import { useState } from "react";

interface ClientWrapperProps {
  title: string;
  content: string;
}

interface ReadingSettings {
  font: "serif" | "sans-serif";
  width: "narrow" | "normal" | "wide";
  fontSize: number;
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
    <section>
      <ReadingControls
        readingSettings={readingSettings}
        onUpdateFont={updateFont}
        onUpdateWidth={updateWidth}
        onUpdateFontSize={updateFontSize}
      />
      <DocumentContent
        title={title}
        content={content}
        readingSettings={readingSettings}
      />
    </section>
  );
};

export default ClientWrapper;
