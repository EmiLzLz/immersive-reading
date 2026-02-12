import React from 'react'

interface UploadFABProps {
    onOpen: () => void
}

function UploadFAB({onOpen}: UploadFABProps) {
  return (
    <button onClick={onOpen}>UPLOAD PDF</button>
  )
}

export default UploadFAB