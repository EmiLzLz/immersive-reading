/**
 * The function `uploadDocument` uploads a document with a title, content, and metadata to a Supabase
 * database, handling error cases appropriately.
 * @param {string} title - The `title` parameter is a string that represents the title of the document
 * being uploaded. It is a required field and must be provided when calling the `uploadDocument`
 * function.
 * @param {string} content - The `content` parameter in the `uploadDocument` function represents the
 * description or text content of the document that you want to upload. It is a required parameter and
 * should contain the textual content of the document you are uploading. Make sure to provide a valid
 * string for the `content` parameter when calling
 * @param metadata - The `metadata` parameter in the `uploadDocument` function is an object that should
 * contain information about the document, specifically the number of pages in the document. It is
 * structured as follows:
 * @returns The `uploadDocument` function returns an object with either a success message and the ID of
 * the uploaded document if the upload was successful, or an error message if there was an issue during
 * the upload process.
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
