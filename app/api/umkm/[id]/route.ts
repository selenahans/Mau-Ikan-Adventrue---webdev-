import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const umkmId = parseInt(id);
  const supabase = await supabaseServer();

  // Ambil data UMKM
  const { data: umkm, error: umkmErr } = await supabase
    .from("umkm")
    .select("*")
    .eq("id", umkmId)
    .single();

  if (umkmErr || !umkm) {
    return NextResponse.json(
      { ok: false, message: "UMKM tidak ditemukan" },
      { status: 404 }
    );
  }

  // Ambil produk + semua fotonya
  const { data: products, error: productErr } = await supabase
    .from("product")
    .select(
      `
      id,
      umkm_id,
      nama_produk,
      harga,
      deskripsi,
      info_penting,
      stok,
      images:product_images (
        id,
        image_url,
        is_primary
      )
    `
    )
    .eq("umkm_id", umkmId);
  console.log(products);
  if (productErr) {
    return NextResponse.json(
      { ok: false, message: "Gagal memuat produk" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    data: { umkm, products },
  });
}
