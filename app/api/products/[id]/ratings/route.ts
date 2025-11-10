import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// 🔹 Ambil semua rating produk
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const supabase = await supabaseServer();
  const { data: ratings, error } = await supabase
    .from("product_ratings")
    .select("rating, comment, created_at, user_id")
    .eq("product_id", id)
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );

  const avg =
    ratings.length > 0
      ? ratings.reduce((a, b) => a + b.rating, 0) / ratings.length
      : 0;

  return NextResponse.json({ ok: true, data: ratings, average: avg });
}

// 🔹 Tambah ulasan produk
export async function POST(req: Request) {
  const body = await req.json();
  const { product_id, user_id, rating, comment } = body;

  const supabase = await supabaseServer();
  const { error } = await supabase.from("product_ratings").insert([
    {
      product_id,
      user_id,
      rating,
      comment,
    },
  ]);

  if (error)
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );

  return NextResponse.json({
    ok: true,
    message: "Ulasan berhasil ditambahkan!",
  });
}
