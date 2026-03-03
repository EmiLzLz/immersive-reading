import { createClientSS } from "@/lib/supabase/server";

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

  return (
    <div>
      <h1>Your Library</h1>
      <div className="info">
        {user.email}
      </div>
      <div className="documents-grid">
        <h2>You don't have documents yet</h2>
      </div>
    </div>
  );
}

export default LibraryPage;
