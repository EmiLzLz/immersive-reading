import { createClientSS } from "@/lib/supabase/server";
import Link from "next/link";

async function LibraryPage() {
  const supabase = await createClientSS();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-text-secondary">
          There was an error, please log out and try again.
        </p>
      </div>
    );
  }

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user?.id);

  return (
    <div className="min-h-screen px-8 py-16 max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Your Library</h1>
        <p className="text-sm text-text-secondary">{user.email}</p>
      </div>

      {!documents || documents.length === 0 ? (
        <p className="text-text-secondary">You don't have documents yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {documents.map((document) => (
            <Link
              href={`/document/${document.id}`}
              key={document.id}
              className="book-card"
            >
              <span className="book-title">{document.title}</span>
              {document.metadata?.numPages && (
                <span className="book-pages">
                  {document.metadata.numPages} pages
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default LibraryPage;
