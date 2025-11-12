"use client";

import { useEffect, useState } from "react";
import { Search, Sparkles, TrendingUp, Award } from "lucide-react";
import Link from "next/link";

interface Umkm {
  id: number;
  name: string;
  Kategori_usaha: string;
  description: string;
  image_url: string;
}

export default function UmkmPage() {
  const [umkmList, setUmkmList] = useState<Umkm[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching UMKM data...");
      const res = await fetch("/api/umkm/read");
      const json = await res.json();
      if (json.success) setUmkmList(json.data);
    };
    fetchData();
  }, []);

  const filteredList = umkmList.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.Kategori_usaha.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F6F7ED] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 -left-30 w-96 h-96 bg-[#74C365] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" 
      style={{ animationDuration: "6s", animationDelay: "2s" }}/>
      <div className="absolute -top-40 left-30 w-96 h-96 bg-[#DBE64C] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" 
      style={{ animationDuration: "6s", animationDelay: "3s"}}/>
      <div className="absolute -top-40 right-30 w-96 h-96 bg-[#DBE64C] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" 
      style={{ animationDuration: "6s", animationDelay: "1s"}}/>
      <div
        className="absolute -top-10 -right-40 w-96 h-96 bg-[#74C365] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDuration: "6s", animationDelay: "2s" }}
      />

      <div className="relative z-10 pt-32 pb-20 px-4">
        {/* Hero Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#74C365] rounded-full mb-6 animate-bounce">
            <Sparkles className="w-4 h-4 text-[#F6F7ED]" />
            <span className="text-sm font-semibold text-[#F6F7ED]">
              Lebih dari 100+ UMKM Terdaftar
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00804c] to-[#74C365] mb-6 leading-tight">
            Temukan UMKM
            <br />
            <span className="text-5xl md:text-6xl">Ramah Lingkungan 🌿</span>
          </h1>

          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Dukung bisnis lokal yang peduli lingkungan dan berdampak positif
            untuk masa depan yang lebih hijau
          </p>
        </div>

        {/* Enhanced Search Bar */}
        <div className="flex justify-center items-center mb-16">
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#74C365] to-[#00804c] rounded-2xl blur opacity-20" />
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-2">
              <div className="flex items-center gap-3">
                <div className="pl-4">
                  <Search className="text-gray-800 w-6 h-6" />
                </div>
                <input
                  type="text"
                  placeholder="Cari nama UMKM atau kategori usaha..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent py-4 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none text-lg"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="mr-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-600 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="max-w-4xl mx-auto mb-16 grid grid-cols-3 gap-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/40 shadow-lg">
            <TrendingUp className="w-6 h-6 text-[#00804c] mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {filteredList.length}
            </p>
            <p className="text-sm text-gray-600">UMKM Tersedia</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/40 shadow-lg">
            <Award className="w-6 h-6 text-[#00804c] mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">100%</p>
            <p className="text-sm text-gray-600">Eco-Friendly</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/40 shadow-lg">
            <Sparkles className="w-6 h-6 text-[#00804c] mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">Lokal</p>
            <p className="text-sm text-gray-600">Produk Asli</p>
          </div>
        </div>

        {/* Grid UMKM */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto px-6">
          {filteredList.map((umkm, index) => (
            <div
              key={umkm.id}
              className="group relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00804c] to-[#00804c] rounded-3xl opacity-0 group-hover:opacity-30 blur transition-all duration-500" />

              {/* Card */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 h-full flex flex-col">
                {/* Image Container */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={umkm.image_url}
                    alt={umkm.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    <span className="text-xs font-bold text-[#00804c] flex items-center gap-1">
                      <span className="w-2 h-2 bg-[#00804c] rounded-full animate-pulse" />
                      Verified
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl mb-4 self-start border border-[#00804c]">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                      {umkm.Kategori_usaha}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3 transition-colors line-clamp-1">
                    {umkm.name}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {umkm.description}
                  </p>

                  <Link
                    href={`/umkm/${umkm.id}`}
                    className="w-full bg-[#00804c] hover:bg-[#74C365] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <span>Lihat Detail</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredList.length === 0 && (
          <div className="text-center mt-24">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto shadow-2xl border border-white/50">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Tidak Ada Hasil
              </h3>
              <p className="text-gray-600">
                Coba kata kunci lain atau hapus filter pencarian
              </p>
              <button
                onClick={() => setQuery("")}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Reset Pencarian
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
