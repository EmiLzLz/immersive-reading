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

export async function uploadDocument(
  title: string,
  content: string,
  metadata: { numPages: number },
) {
  if (!title) {
    return { error: "The file doesnt have a title" };
  }
  if (!content) {
    return { error: "The file doesn't have a description" };
  }
  if (!metadata) {
    return { error: "The file doesn't have metadata" };
  }

  try {
    // Insert a supabase
    const { data, error } = await supabase
      .from("documents")
      .insert([{ title, content, metadata }])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return { error: "Failed to save document" };
    }

    if (!data || data.length === 0) {
      return { error: "No data returned from database" };
    }

    return { success: true, id: data[0].id };
  } catch (error) {
    console.error("Error uploading: ", error);
    return { error: "Failed to save document" };
  }
}
