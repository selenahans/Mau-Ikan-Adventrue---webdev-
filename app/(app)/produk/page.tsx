"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Sparkles, ShoppingBag, Leaf } from "lucide-react";

interface Product {
  id: number;
  nama_produk: string;
  harga: number;
  images?: { image_url: string; is_primary: boolean }[];
}

export default function ProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/products/read")
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) setProducts(json.data);
      });
  }, []);

  const filtered = products.filter((p) =>
    p.nama_produk.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F6F7ED] relative overflow-hidden">
      {/* --- Background Blur Elements --- */}
      <div className="absolute top-0 -left-32 w-96 h-96 bg-[#74C365] rounded-full mix-blend-multiply blur-3xl opacity-10 animate-pulse" />
      <div className="absolute -top-40 left-20 w-96 h-96 bg-[#DBE64C] rounded-full mix-blend-multiply blur-3xl opacity-10 animate-pulse" />
      <div className="absolute -top-40 right-20 w-96 h-96 bg-[#DBE64C] rounded-full mix-blend-multiply blur-3xl opacity-10 animate-pulse" />
      <div className="absolute top-10 right-40 w-96 h-96 bg-[#74C365] rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse" />

      <main className="relative z-10 pt-32 pb-20 px-4">
        {/* --- HERO HEADER --- */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#74C365] rounded-full mb-6 animate-bounce">
            <Sparkles className="w-4 h-4 text-[#F6F7ED]" />
            <span className="text-sm font-semibold text-[#F6F7ED]">
              Lebih dari 100+ Produk Eco Friendly Terdaftar
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-[#00804c] to-[#74C365] bg-clip-text text-transparent mb-6 leading-tight">
            Temukan Produk
            <br />
            <span className="text-5xl md:text-6xl">Ramah Lingkungan 🌱</span>
          </h1>

          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Dukung bisnis lokal yang peduli lingkungan dan berdampak positif
            untuk masa depan yang lebih hijau
          </p>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="flex justify-center w-full mt-4 mb-14">
          <div className="relative w-full max-w-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#74C365] to-[#00804c] rounded-2xl blur-lg opacity-20" />
            <div className="relative bg-white/90 backdrop-blur-xl rounded-xl shadow-md border px-4 h-[56px] flex items-center">
              <Search className="text-gray-800 w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="Cari nama Produk"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-base"
              />
            </div>
          </div>
        </div>

        {/* --- STATISTICS BAR --- */}
        <div className="max-w-4xl mx-auto mb-16 grid grid-cols-3 gap-4">
          <StatBox
            icon={<ShoppingBag className="w-6 h-6 text-[#00804c]" />}
            title={filtered.length}
            subtitle="Produk Tersedia"
          />
          <StatBox
            icon={<Leaf className="w-6 h-6 text-[#00804c]" />}
            title="100%"
            subtitle="Eco Friendly"
          />
          <StatBox
            icon={<Sparkles className="w-6 h-6 text-[#00804c]" />}
            title="Lokal"
            subtitle="UMKM Terverifikasi"
          />
        </div>

        {/* --- GRID PRODUK --- */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto px-6">
          {filtered.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              delay={index * 50}
            />
          ))}
        </div>

        {/* --- EMPTY STATE --- */}
        {filtered.length === 0 && (
          <div className="text-center mt-20">
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Produk tidak ditemukan 😢
            </h3>
            <p className="text-gray-600">
              Coba gunakan kata kunci lain atau reset pencarian
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

/* --- STAT BOX COMPONENT --- */
function StatBox({ icon, title, subtitle }: any) {
  return (
    <div className="bg-white backdrop-blur-sm rounded-2xl p-4 text-center border shadow-lg">
      <div className="mx-auto mb-2">{icon}</div>
      <p className="text-2xl font-bold text-gray-800">{title}</p>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}

/* --- PRODUCT CARD COMPONENT --- */
function ProductCard({ product, delay }: { product: Product; delay: number }) {
  const primary = product.images?.find((img) => img.is_primary)?.image_url;
  const fallback = product.images?.[0]?.image_url;

  return (
    <div className="group relative" style={{ animationDelay: `${delay}ms` }}>
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-3xl opacity-0 group-hover:opacity-30 blur transition-all duration-500" />

      {/* Card */}
      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border h-full transition-all duration-500 group-hover:-translate-y-1">
        {/* Image */}
        <div className="h-56 overflow-hidden">
          <Image
            src={primary || fallback || "/placeholder-product.png"}
            alt={product.nama_produk}
            width={500}
            height={400}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
            {product.nama_produk}
          </h3>
          <p className="text-lg font-bold text-emerald-700 mb-4">
            Rp {product.harga.toLocaleString("id-ID")}
          </p>

          <Link
            href={`/produk/${product.id}`}
            className="bg-[#00804c] hover:bg-[#74C365] text-white py-3 rounded-xl font-semibold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Lihat Detail</span>
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
