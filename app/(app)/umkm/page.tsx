"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Search,
  Sparkles,
  TrendingUp,
  Award,
  MapPin,
  ArrowRight,
} from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/umkm/read")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setUmkmList(json.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredList = useMemo(
    () =>
      umkmList.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.Kategori_usaha.toLowerCase().includes(query.toLowerCase())
      ),
    [umkmList, query]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F7ED] via-[#F6F7ED] to-[#E8F5E9]">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#74C365]/20 to-[#DBE64C]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-[#00804c]/10 to-[#74C365]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-[#DBE64C]/15 to-[#74C365]/15 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 pt-24 pb-20 px-4">
        {/* Hero Section with Enhanced Typography */}
        <div className="text-center mb-12 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-full mb-8 shadow-lg hover:shadow-xl transition-shadow">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <span className="text-sm font-bold text-white tracking-wide">
              {umkmList.length}+ UMKM Terdaftar & Terverifikasi
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-[#00804c] via-[#74C365] to-[#00804c] bg-clip-text text-transparent animate-gradient">
              Temukan UMKM
            </span>
            <br />
            <span className="text-5xl md:text-7xl bg-gradient-to-r from-[#74C365] to-[#DBE64C] bg-clip-text text-transparent">
              Ramah Lingkungan 🌿
            </span>
          </h1>

          <p className="text-gray-700 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
            Dukung produk lokal yang peduli lingkungan dan berkontribusi untuk
            masa depan yang lebih hijau
          </p>
        </div>

        {/* Enhanced Search Bar */}
        <div className="flex justify-center w-full mb-16">
          <div className="relative w-full max-w-3xl group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-2xl blur opacity-25 group-hover:opacity-40 transition" />
            <div className="relative bg-white rounded-2xl shadow-xl border-2 border-transparent group-hover:border-[#74C365]/20 px-6 h-16 flex items-center transition-all">
              <Search className="text-[#00804c] w-6 h-6 mr-4" />
              <input
                type="text"
                placeholder="Cari UMKM berdasarkan nama atau kategori..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-lg"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="ml-2 text-gray-400 hover:text-gray-600 text-sm font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<TrendingUp className="w-7 h-7" />}
            label="UMKM Tersedia"
            value={filteredList.length.toString()}
            gradient="from-[#00804c] to-[#74C365]"
          />
          <StatCard
            icon={<Award className="w-7 h-7" />}
            label="Eco-Friendly"
            value="100%"
            gradient="from-[#74C365] to-[#DBE64C]"
          />
          <StatCard
            icon={<MapPin className="w-7 h-7" />}
            label="Produk"
            value="Lokal"
            gradient="from-[#DBE64C] to-[#74C365]"
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto px-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-3xl p-6 border shadow-lg">
                  <div className="h-48 bg-gray-200 rounded-2xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* UMKM Grid with Enhanced Cards */}
        {!isLoading && filteredList.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto px-6">
            {filteredList.map((umkm, index) => (
              <UmkmCard key={umkm.id} umkm={umkm} index={index} />
            ))}
          </div>
        )}

        {/* Enhanced Empty State */}
        {!isLoading && filteredList.length === 0 && (
          <div className="text-center mt-20">
            <div className="bg-white rounded-3xl p-12 max-w-lg mx-auto shadow-2xl border-2 border-gray-100">
              <div className="text-7xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Tidak Ada Hasil Ditemukan
              </h3>
              <p className="text-gray-600 mb-6">
                Coba kata kunci lain atau lihat semua UMKM
              </p>
              <button
                onClick={() => setQuery("")}
                className="px-8 py-4 bg-gradient-to-r from-[#00804c] to-[#74C365] hover:from-[#74C365] hover:to-[#00804c] text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                Tampilkan Semua UMKM
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

function StatCard({ icon, label, value, gradient }: any) {
  return (
    <div className="group relative">
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-30 group-hover:opacity-50 transition`}
      />
      <div className="relative bg-white rounded-2xl p-6 text-center border-2 border-white shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} text-white mb-3 shadow-lg`}
        >
          {icon}
        </div>
        <p className="text-3xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1">
          {value}
        </p>
        <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
          {label}
        </p>
      </div>
    </div>
  );
}

function UmkmCard({ umkm, index }: { umkm: Umkm; index: number }) {
  return (
    <div
      className="group relative rounded-3xl overflow-hidden bg-white border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00804c]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={umkm.image_url}
          alt={umkm.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
        />
        {/* Category Badge on Image */}
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-block text-xs font-bold bg-white/95 backdrop-blur text-[#00804c] px-3 py-1.5 rounded-full shadow-lg">
            {umkm.Kategori_usaha}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col">
        <h3 className="text-xl font-black text-gray-900 line-clamp-1 mb-3 group-hover:text-[#00804c] transition-colors">
          {umkm.name}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 mb-5 leading-relaxed">
          {umkm.description}
        </p>

        <Link
          href={`/umkm/${umkm.id}`}
          className="group/btn relative w-full bg-gradient-to-r from-[#00804c] to-[#74C365] hover:from-[#74C365] hover:to-[#00804c] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 overflow-hidden"
        >
          <span className="relative z-10">Lihat Detail</span>
          <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
