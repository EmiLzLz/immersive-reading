/**
 * The function `processPdf` processes a PDF file by extracting text content from its pages and saving
 * the extracted data in a Supabase database.
 * @param {FormData} formData - The `processPdf` function you provided processes a PDF file uploaded
 * via a form and extracts text content from it. Here's a breakdown of the function:
 * @returns The `processPdf` function returns an object with different properties based on the
 * processing result:
 */
"use server";
import { supabase } from "@/lib/supabase";
import * as pdfjsLib from "pdfjs-dist";

//deactivate worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = '';

export async function processPdf(formData: FormData) {
  const file = formData.get("file") as File;
  
  if (file.size > 10 * 1024 * 1024) {
    return { error: "The file exceed thew max size. 10MB" };
  }

  if (!file || file.type !== "application/pdf") {
    return { error: "The file is not a valid PDF" };
  }

  try {
    // convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // load PDF
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(buffer),
      useWorkerFetch: false,
      isEvalSupported: false,
    });

    const pdf = await loadingTask.promise;
    let extractedText = "";

    if (pdf.numPages > 500) {
      return { error: "The PDF exceed the max pages (500 pages)" };
    }

    // iterate pages
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      extractedText += pageText + " ";
    }

    // save in supabase
    const extractedData = {
      title: file.name.replace(/\.pdf$/i, ""),
      content: extractedText.trim(),
      metadata: { numPages: pdf.numPages},
    };

    const { data, error } = await supabase
      .from("documents")
      .insert([extractedData])
      .select();

    if (error) throw error;
    return { success: true, id: data[0].id };
  } catch (error) {
    console.error("Fail processing PDF: ", error);
    return { error: "Fail reading PDF content" };
  }
}
