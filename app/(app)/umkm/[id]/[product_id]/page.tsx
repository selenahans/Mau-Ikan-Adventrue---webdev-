"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import UmkmRating from "@/components/ulasanUmkm";
import axios from "axios";
import UlasanProduk from "@/components/ulasanProduk";

export default function ProductDetailPage() {
  const { id, product_id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [active, setActive] = useState("deskripsi");

  useEffect(() => {
    if (!id || !product_id) return;
    axios.get(`/api/umkm/${id}/products/${product_id}`).then((res) => {
      if (res.data.ok) {
        setProduct(res.data.data.product);
        setRelated(res.data.data.related);
      }
    });
  }, [id, product_id]);

  // 🔹 Update tab aktif saat scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el)
      window.scrollTo({
        top: el.offsetTop - 90,
        behavior: "smooth",
      });
  };

  if (!product)
    return <p className="text-center mt-10 text-gray-500">Memuat data...</p>;

  const subnavItems = [
    { id: "deskripsi", label: "Deskripsi" },
    { id: "info", label: "Informasi Penting" },
    { id: "ulasan", label: "Ulasan" },
    { id: "lainnya", label: "Produk Lainnya" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-16 pb-20">
      {/* 🟢 Sub Navbar */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b z-40 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-center flex-wrap gap-6 py-3">
          {subnavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative font-semibold text-sm tracking-wide transition-all duration-300 pb-1 ${
                active === item.id
                  ? "text-green-700 after:w-full"
                  : "text-gray-500 hover:text-green-700 after:w-0"
              } after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:bg-green-700 after:rounded-full after:transition-all after:duration-300`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🟢 Header Produk */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mt-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Gambar Produk */}
          <div className="relative bg-gray-50 rounded-xl overflow-hidden border">
            <Image
              src={product.image_url || "/images/placeholder-product.webp"}
              alt={product.nama_produk}
              width={600}
              height={600}
              className="object-cover w-full h-[400px]"
            />
          </div>

          {/* Info Produk */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Nama Produk */}
              <h1 className="text-3xl font-bold text-green-900 mb-2 leading-snug">
                {product.nama_produk}
              </h1>

              {/* Harga */}
              <p className="text-green-700 text-2xl font-semibold mb-3">
                Rp {product.harga?.toLocaleString("id-ID")}
              </p>

              {/* Rating Produk */}
              <div className="flex items-center gap-2 mb-4">
                {product.average_rating && product.total_reviews > 0 ? (
                  <>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(product.average_rating)
                              ? "fill-yellow-400"
                              : "fill-gray-200 text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-700 text-sm font-medium">
                      {product.average_rating.toFixed(1)} / 5
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({product.total_reviews} ulasan)
                    </span>
                  </>
                ) : (
                  <span className="text-gray-500 text-sm italic">
                    Belum ada ulasan
                  </span>
                )}
              </div>

              {/* Deskripsi Singkat (opsional ringkas) */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {product.deskripsi ||
                  "Deskripsi produk belum tersedia. Informasi akan segera diperbarui."}
              </p>
            </div>

            {/* Tombol Aksi */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() =>
                  document.getElementById("ulasan")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="flex items-center justify-center gap-2 border border-green-700 text-green-700 hover:bg-green-50 rounded-md px-6 py-2 font-medium transition"
              >
                <Star className="w-4 h-4 text-green-700" />
                Lihat Ulasan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 Informasi Penting */}
      <section
        id="info"
        className="max-w-6xl mx-auto mt-12 bg-white rounded-2xl shadow-md border border-gray-100 p-8"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
          Informasi Penting
        </h2>
        <p className="text-gray-600 leading-relaxed text-justify">
          {product.info_penting ||
            "Informasi penting produk belum tersedia. Informasi akan segera diperbarui."}
        </p>
      </section>

      {/* 🟢 Ulasan */}
      <section
        id="ulasan"
        className="max-w-6xl mx-auto mt-12 bg-white rounded-2xl shadow-md border border-gray-100 p-8"
      >
        <UlasanProduk productId={Number(product_id)} />
      </section>

      {/* 🟢 Produk Lainnya */}
      <section
        id="lainnya"
        className="max-w-6xl mx-auto mt-12 mb-20 bg-white rounded-2xl shadow-md border border-gray-100 p-8"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Produk Lainnya
        </h2>
        {related.length === 0 ? (
          <p className="text-gray-500 text-center">
            Belum ada rekomendasi produk lainnya.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((r: any) => (
              <a
                key={r.id}
                href={`/umkm/${id}/${r.id}`}
                className="group border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={r.image_url || "/images/placeholder-product.webp"}
                    alt={r.nama_produk}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-1 mb-1">
                    {r.nama_produk}
                  </h3>
                  <p className="text-green-700 font-bold text-sm">
                    Rp {r.harga?.toLocaleString("id-ID")}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
