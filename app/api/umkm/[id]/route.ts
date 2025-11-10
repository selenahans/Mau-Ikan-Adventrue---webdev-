import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const umkmId = parseInt(id);

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

  const { data: products, error: productErr } = await supabase
    .from("product")
    .select("*")
    .eq("umkm_id", umkmId);

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
