"use client";

import * as pdfjsLib from "pdfjs-dist";
import type { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";

export async function pdfParser(formData: FormData) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const file = formData.get("file") as File;

  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  // type guard
  function isTextItem(item: TextItem | TextMarkedContent): item is TextItem {
    return (item as TextItem).str !== undefined;
  }

  let completeText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const items = textContent.items.filter(isTextItem)
    let lastY;
    let pageText = "";

    for(const item of items){
      const currentY = item.transform[5];

      if(lastY !== undefined && Math.abs(lastY - currentY) > 2){
        pageText += "\n"
      }

      pageText += item.str;
      lastY = currentY;
    }
    completeText += pageText + "\n\n";
  }

  return {
    content: completeText,
    title: file.name.replace(/\.pdf$/i, ""),
    metadata: { numPages: pdf.numPages },
  };
}
