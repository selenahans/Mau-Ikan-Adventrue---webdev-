"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface Umkm {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
}

export default function UmkmPage() {
  const [umkmList, setUmkmList] = useState<Umkm[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setUmkmList([
      {
        id: 1,
        name: "Namira Ecoprint",
        category: "Fashion Ramah Lingkungan",
        description:
          "Menghasilkan kain bermotif alami dengan teknik ecoprint yang ramah lingkungan.",
        image: "/images/umkm/NamiraEcoprint.jpg",
      },
      {
        id: 2,
        name: "PLASMA",
        category: "Daur Ulang Plastik",
        description:
          "Mengolah limbah plastik menjadi produk bernilai guna tinggi dengan inovasi berkelanjutan.",
        image: "/images/umkm/PLASMALIVING.jpg",
      },
      {
        id: 3,
        name: "Re-Thread",
        category: "Fashion Daur Ulang",
        description:
          "Menciptakan tas dan aksesori dari denim bekas untuk mendukung konsep upcycling.",
        image: "/images/umkm/RE-THREAD.jpg",
      },
    ]);
  }, []);

  const filteredList = umkmList.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F3FFF7] pt-24 pb-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-[#023C2E] mb-3 tracking-tight">
          Daftar UMKM
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Temukan pelaku UMKM ramah lingkungan dan produk berkualitas lokal 🌿
        </p>

        {/* Search Bar */}
        <div className="flex justify-center items-center gap-2 max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari UMKM..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300"
            />
          </div>
          <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-md font-medium transition-all duration-300">
            Cari
          </button>
        </div>
      </div>

      {/* Grid UMKM */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-6">
        {filteredList.map((umkm) => (
          <div
            key={umkm.id}
            className="
              bg-white border border-green-100 rounded-xl overflow-hidden
              shadow-sm hover:shadow-md hover:-translate-y-1
              transition-all duration-300
            "
          >
            {/* Gambar */}
            <div className="overflow-hidden">
              <img
                src={umkm.image}
                alt={umkm.name}
                className="w-full h-60 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Konten */}
            <div className="p-5">
              <span
                className="
                  inline-block px-3 py-1 text-sm font-medium text-green-700
                  bg-green-50 rounded-full mb-3
                "
              >
                {umkm.category}
              </span>

              <h2 className="text-lg font-bold text-gray-900 mb-2">
                {umkm.name}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {umkm.description}
              </p>

              <button
                className="
                  bg-green-600 hover:bg-green-700 text-white
                  px-4 py-2 rounded-lg font-semibold text-sm
                  transition-all duration-300
                "
              >
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
