// ReadingControls.tsx
import { Type, AlignLeft, AlignCenter, AlignJustify } from "lucide-react";
import { ReadingSettings } from "@/lib/reading-types";

interface ReadingControlsProps {
  readingSettings: ReadingSettings;
  onUpdateFont: (newFont: "sans-serif" | "serif") => void;
  onUpdateWidth: (newSize: "narrow" | "normal" | "wide") => void;
  onUpdateFontSize: (increment: number) => void;
}

const ReadingControls = ({
  readingSettings,
  onUpdateFont,
  onUpdateWidth,
  onUpdateFontSize,
}: ReadingControlsProps) => {
  const activeClass = "bg-surface-raised text-text-primary";
  const baseBtn =
    "flex h-11 items-center gap-2 rounded-lg px-3 text-sm text-text-secondary transition-colors duration-150 hover:bg-surface-raised hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring";

  return (
    <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-center gap-6 border-b border-surface-raised bg-surface-base/90 px-6 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-1">
        <button
          onClick={() => onUpdateFont("sans-serif")}
          aria-label="Sans-serif font"
          aria-pressed={readingSettings.font === "sans-serif"}
          className={`${baseBtn} ${readingSettings.font === "sans-serif" ? activeClass : ""}`}
        >
          <Type size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Sans-serif</span>
        </button>
        <button
          onClick={() => onUpdateFont("serif")}
          aria-label="Serif font"
          aria-pressed={readingSettings.font === "serif"}
          className={`${baseBtn} ${readingSettings.font === "serif" ? activeClass : ""}`}
        >
          <Type size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Serif</span>
        </button>
      </div>

      <div className="h-5 w-px bg-surface-raised" aria-hidden="true" />

      <div className="flex items-center gap-1">
        <button
          onClick={() => onUpdateFontSize(-2)}
          aria-label="Decrease font size"
          className={baseBtn}
        >
          <span className="text-xs font-semibold">A−</span>
        </button>
        <span className="min-w-8 text-center text-sm text-text-secondary">
          {readingSettings.fontSize}
        </span>
        <button
          onClick={() => onUpdateFontSize(2)}
          aria-label="Increase font size"
          className={baseBtn}
        >
          <span className="text-base font-semibold">A+</span>
        </button>
      </div>

      <div className="h-5 w-px bg-surface-raised hidden sm:block" aria-hidden="true" />

      <div className="items-center gap-1 hidden sm:flex">
        <button
          onClick={() => onUpdateWidth("narrow")}
          aria-label="Narrow width"
          aria-pressed={readingSettings.width === "narrow"}
          className={`${baseBtn} ${readingSettings.width === "narrow" ? activeClass : ""}`}
        >
          <AlignCenter size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Narrow</span>
        </button>
        <button
          onClick={() => onUpdateWidth("normal")}
          aria-label="Normal width"
          aria-pressed={readingSettings.width === "normal"}
          className={`${baseBtn} ${readingSettings.width === "normal" ? activeClass : ""}`}
        >
          <AlignJustify size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Normal</span>
        </button>
        <button
          onClick={() => onUpdateWidth("wide")}
          aria-label="Wide width"
          aria-pressed={readingSettings.width === "wide"}
          className={`${baseBtn} ${readingSettings.width === "wide" ? activeClass : ""}`}
        >
          <AlignLeft size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Wide</span>
        </button>
      </div>
    </div>
  );
};

export default ReadingControls;