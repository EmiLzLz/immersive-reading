import { ReadingSettings } from "@/lib/reading-types";

interface DocumentContentProps {
  title: string;
  content: string;
  readingSettings: ReadingSettings
}

const DocumentContent = ({
  title,
  content,
  readingSettings,
}: DocumentContentProps) => {
  const widthClasses = {
    narrow: "max-w-2xl",
    normal: "max-w-4xl",
    wide: "max-w-6xl",
  };

  const fontTypes =
    readingSettings.font === "serif" ? "font-serif" : "font-sans";

  return (
    <div className={`content-container ${widthClasses[readingSettings.width]}`}>
      <h1 className={fontTypes} style={{ fontSize: readingSettings.fontSize }}>
        {title}
      </h1>
      <p className={fontTypes} style={{ fontSize: readingSettings.fontSize }}>
        {content}
      </p>
    </div>
  );
};

export default DocumentContent;
