import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const supabase = await supabaseServer();

    // 🔹 Ambil detail produk
    const { data: product, error: prodErr } = await supabase
      .from("product")
      .select(
        `
    id,
    nama_produk,
    harga,
    deskripsi,
    info_penting,
    stok,
    umkm_id,
    images:product_images (id, image_url, is_primary)
  `
      )
      .eq("id", id)
      .single();

    if (prodErr || !product)
      throw new Error("Produk tidak ditemukan untuk UMKM ini.");

    // 🔹 Ambil produk lain (rekomendasi)
    const { data: related, error: relErr } = await supabase
      .from("product")
      .select(
        `
    id,
    nama_produk,
    harga,
    images:product_images (
      id,
      image_url,
      is_primary
    )
  `
      )
      .neq("id", id)
      .limit(4);

    if (relErr) throw relErr;

    // 🔹 Ambil rating produk
    const { data: ratings, error: ratingErr } = await supabase
      .from("product_ratings")
      .select("rating")
      .eq("product_id", id);

    if (ratingErr) throw ratingErr;

    const average_rating =
      ratings && ratings.length > 0
        ? ratings.reduce((a, b) => a + b.rating, 0) / ratings.length
        : 0;

    const total_reviews = ratings?.length || 0;

    return NextResponse.json(
      {
        ok: true,
        data: {
          product: {
            ...product,
            average_rating,
            total_reviews,
          },
          related,
        },
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("GET PRODUCT DETAIL ERROR:", e.message);
    return NextResponse.json(
      { ok: false, message: e.message },
      { status: 500 }
    );
  }
}
