// document/[id]/page.tsx
import { supabase } from "@/lib/supabase";
import { Document } from "@/lib/types";
import { notFound } from "next/navigation";
import ClientWrapper from "./components/ClientWrapper";

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
    <main className="min-h-screen bg-surface-base">
      <ClientWrapper
        title={supabaseFetch.data.title}
        content={supabaseFetch.data.content}
      />
    </main>
  );
}