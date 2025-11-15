import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("umkm")
    .select("id, name, Kategori_usaha, description, image_url")
    .order("name", { ascending: true });

  if (error) {
    console.error("Supabase error:", error.message);
    return NextResponse.json({ success: false, error: error.message });
  }

  return NextResponse.json({ success: true, data });
}
