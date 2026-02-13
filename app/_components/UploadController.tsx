"use client"

import { useState } from "react";
import UploadFAB from "./UploadFAB";
import UploadModal from "./UploadModal";

function UploadController() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <UploadFAB onOpen={handleOpen} />
      {isOpen && <UploadModal onClose={handleClose} />}
    </div>
  );
}

export default UploadController;