import { supabaseServer } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const supabase = await supabaseServer();

  const { data: ratings, error } = await supabase
    .from("umkm_ratings")
    .select("rating, comment, created_at, user_id")
    .eq("umkm_id", id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ ok: false, message: error.message });

  const avg =
    ratings && ratings.length > 0
      ? ratings.reduce((a, b) => a + b.rating, 0) / ratings.length
      : 0;

  return NextResponse.json({
    ok: true,
    data: ratings,
    average: avg,
  });
}
