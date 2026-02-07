import * as pdfjsLib from "pdfjs-dist";

export async function pdfParser(formData: FormData) {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "//mozilla.github.io/pdf.js/build/pdf.worker.mjs";

  const file = formData.get("file") as File;

  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(" ");
    fullText += pageText + "\n\n";
  }

  return {
    content: fullText,
    title: file.name.replace(/\.pdf$/i, ""),
    metadata: { numPages: pdf.numPages },
  };
}
