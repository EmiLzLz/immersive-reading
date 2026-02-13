import { Upload } from "lucide-react";

interface UploadFABProps {
  onOpen: () => void;
}

function UploadFAB({ onOpen }: UploadFABProps) {
  return (
    <button
      onClick={onOpen}
      aria-label="Upload a PDF"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-colors duration-150 hover:bg-accent-hover focus-visible:outline
      focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
    >
      <Upload size={22} aria-hidden="true" />
    </button>
  );
}

export default UploadFAB;