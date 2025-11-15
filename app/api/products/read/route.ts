import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase.from("product").select(
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
  );

  if (error)
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 400 }
    );

  return NextResponse.json({ ok: true, data });
}
