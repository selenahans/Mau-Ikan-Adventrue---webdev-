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
    if (!product_id) return;
    axios.get(`/api/products/${product_id}`).then((res) => {
      if (res.data.ok) {
        setProduct(res.data.data.product);
        setRelated(res.data.data.related);
      }
    });
  }, [id, product_id]);

  useEffect(() => {
    if (product && !product.selectedImage) {
      const primary =
        product.images?.find((i: any) => i.is_primary)?.image_url ||
        product.images?.[0]?.image_url;

      setProduct((prev: any) => ({
        ...prev,
        selectedImage: primary,
      }));
    }
  }, [product]);

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

  return (
    <div className="min-h-screen bg-[#F6F7ED] relative overflow-hidden ">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 -left-30 w-96 h-96 bg-[#74C365] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
        <div
          className="absolute -top-40 left-30 w-96 h-96 bg-[#DBE64C] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "3s" }}
        />
        <div
          className="absolute -top-40 right-30 w-96 h-96 bg-[#DBE64C] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />
        <div
          className="absolute -top-10 -right-40 w-96 h-96 bg-[#74C365] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
      </div>
      <div className="relative z-10 mt-40">
        {/* 🟢 Header Produk */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mt-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* ==== FOTO PRODUK (GALLERY) ==== */}
            <div>
              {/* Foto Utama */}
              <div className="relative rounded-xl overflow-hidden border mb-4">
                <Image
                  src={
                    product.selectedImage ||
                    product.images?.find((img: any) => img.is_primary)
                      ?.image_url ||
                    product.images?.[0]?.image_url ||
                    "/images/placeholder-product.webp"
                  }
                  alt={product.nama_produk}
                  width={600}
                  height={600}
                  className="object-cover w-full h-[400px]"
                />
              </div>

              {/* List Foto Thumbnail */}
              {product.images && product.images.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img: any) => (
                    <button
                      key={img.id}
                      onClick={() =>
                        setProduct((prev: any) => ({
                          ...prev,
                          selectedImage: img.image_url,
                        }))
                      }
                      className="relative w-20 h-20 rounded-lg overflow-hidden border hover:scale-105 transition"
                    >
                      <Image
                        src={img.image_url}
                        alt="thumb"
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Produk */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Nama Produk */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2 leading-snug">
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
                  className="group flex items-center justify-center gap-2 border border-[#00804c] text-[#00804c] hover:bg-[#00804c] hover:text-white rounded-md px-6 py-2 font-medium transition"
                >
                  <Star className="w-4 h-4 text-[#00804c] group-hover:text-white" />
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
          className="max-w-6xl mx-auto mt-12 px-6 py-6 bg-white rounded-2xl shadow-md border border-gray-100"
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
              Tidak ada produk lainnya.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((r: any) => {
                const cover =
                  r.images
                    ?.find((img: any) => img.is_primary)
                    ?.image_url?.trim() ||
                  r.images?.[0]?.image_url?.trim() ||
                  "/images/placeholder-product.webp";

                return (
                  <a
                    key={r.id}
                    href={`/produk/${r.id}`}
                    className="
              group 
              rounded-xl 
              overflow-hidden 
              bg-white 
              border border-gray-200 
              shadow-sm 
              hover:shadow-lg 
              hover:-translate-y-1 
              transition-all 
              duration-300 
              relative
            "
                  >
                    {/* Foto */}
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={cover}
                        alt={r.nama_produk}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-1 mb-1">
                        {r.nama_produk}
                      </h3>
                      <p className="text-green-700 font-bold text-sm">
                        Rp {r.harga?.toLocaleString("id-ID")}
                      </p>
                    </div>

                    {/* Hover Overlay */}
                    <div
                      className="
                absolute inset-0 
                bg-green-700/70 
                text-white 
                opacity-0 
                group-hover:opacity-100 
                flex 
                items-center 
                justify-center 
                font-medium 
                text-sm 
                transition-all 
                duration-300
              "
                    >
                      Lihat Detail
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
