import { supabase } from "@/lib/supabase";
import { Document } from "@/lib/types";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DocumentPage({ params }: PageProps) {
  const { id } = await params;

  const supabaseFetch = await supabase
    .from("documents")
    .select("*")
    .eq("id", id)
    .single<Document>();

  if (supabaseFetch.data == null || supabaseFetch.error) {
    notFound();
  }

  return (
    <main>
      <h1>{supabaseFetch.data.title}</h1>
      <div className="content-container">
        <p>{supabaseFetch.data.content}</p>
      </div>
    </main>
  );
}
