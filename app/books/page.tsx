import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Notes() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: books } = await supabase.from("book").select();

  return <pre>{JSON.stringify(books)}</pre>;
}
