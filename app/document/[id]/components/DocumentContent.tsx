// DocumentContent.tsx
import { ReadingSettings } from "@/lib/reading-types";

interface DocumentContentProps {
  title: string;
  content: string;
  readingSettings: ReadingSettings;
}

const DocumentContent = ({
  title,
  content,
  readingSettings,
}: DocumentContentProps) => {
  const widthClasses = {
    narrow: "max-w-xl",
    normal: "max-w-3xl",
    wide: "max-w-5xl",
  };

  const fontFamily =
    readingSettings.font === "serif" 
      ? '"Lora", serif' 
      : '"Source Sans 3", sans-serif';

  return (
    <div
      className={`mx-auto px-6 py-12 ${widthClasses[readingSettings.width]}`}
    >
      <h1
        className={`mb-8 font-bold leading-tight`}
        style={{ fontSize: `${readingSettings.fontSize * 1.5}px`, fontFamily }}
      >
        {title}
      </h1>
      <p
        className={`whitespace-pre-wrap `}
        style={{ fontSize: `${readingSettings.fontSize}px`, fontFamily }}
      >
        {content}
      </p>
    </div>
  );
};

export default DocumentContent;
