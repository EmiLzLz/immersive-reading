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
      <div>
        <h1>There wass an error, please log out and try again</h1>
      </div>
    );
  }

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user?.id);

  return (
    <div>
      <h1>Your Library</h1>
      <div className="info">{user.email}</div>
      <div className="documents-grid">
        {!documents || documents.length === 0 ? (
          <h2>You don't have documents yet</h2>
        ) : (
          documents.map((document) => <Link href={`/document/${document.id}`} key={document.id}>{document.title}</Link>)
        )}
      </div>
    </div>
  );
}

export default LibraryPage;
