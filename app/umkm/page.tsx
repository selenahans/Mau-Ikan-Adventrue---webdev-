"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Umkm {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
}

export default function UmkmPage() {
  const [umkmList, setUmkmList] = useState<Umkm[]>([]);

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
      {
        id: 4,
        name: "Witrove",
        category: "Kerajinan Ramah Lingkungan",
        description:
          "Menggunakan bahan enceng gondok untuk membuat produk dekoratif handmade.",
        image: "/images/umkm/WITROVE.jpg",
      },
      {
        id: 5,
        name: "Bumbi",
        category: "Produk Anak & Keluarga",
        description:
          "Menyediakan perlengkapan bayi dan anak berbahan alami dengan desain lucu dan aman.",
        image: "/images/umkm/BUMBI.jpg",
      },
      {
        id: 6,
        name: "CPOP Watch",
        category: "Aksesori & Gaya Hidup",
        description:
          "Jam tangan dengan desain unik dan warna cerah yang terbuat dari bahan ramah lingkungan.",
        image: "/images/umkm/CPOPWatch.jpg",
      },
      {
        id: 7,
        name: "Dauroma",
        category: "Home Living",
        description:
          "Menyediakan lilin aromaterapi alami dan dekorasi rumah yang elegan.",
        image: "/images/umkm/DAUROMA.jpg",
      },
      {
        id: 8,
        name: "Eank Solo",
        category: "Pakaian Kasual",
        description:
          "Brand lokal yang menghadirkan busana kasual dengan bahan dan proses ramah lingkungan.",
        image: "/images/umkm/EANK.jpg",
      },
      {
        id: 9,
        name: "EcoChic",
        category: "Slow Fashion",
        description:
          "Mengusung konsep slow fashion dengan desain lembut dan bahan organik yang berkelanjutan.",
        image: "/images/umkm/ECOCHIC.jpg",
      },
      {
        id: 10,
        name: "Kreskros",
        category: "Kerajinan Tangan",
        description:
          "Mengubah sampah plastik menjadi tas dan dompet stylish hasil karya pengrajin lokal.",
        image: "/images/umkm/KRESKROS.jpg",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/50 to-white pt-28 pb-20">
      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold text-teal-700 tracking-tight mb-3">
          Daftar UMKM
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Temukan pelaku UMKM ramah lingkungan dan produk berkualitas lokal 🌿
        </p>
        <div className="w-24 h-[3px] bg-gradient-to-r from-teal-500 to-green-500 mx-auto rounded-full"></div>
      </div>

      {/* GRID UMKM */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-6">
        {umkmList.map((umkm) => (
          <div
            key={umkm.id}
            className="
              group bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden
              border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2
              transition-all duration-500
            "
          >
            {/* Gambar UMKM */}
            <div className="relative overflow-hidden">
              <img
                src={umkm.image}
                alt={umkm.name}
                className="w-full h-60 object-contain bg-gradient-to-b from-gray-50 to-white group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>

            {/* Konten Kartu */}
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-teal-700 transition-colors duration-300">
                {umkm.name}
              </h2>
              <p className="text-sm text-green-700 font-medium mt-1 mb-3">
                {umkm.category}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-5">
                {umkm.description}
              </p>
              <button
                className="
                  w-full py-2.5 rounded-full text-sm font-semibold
                  bg-gradient-to-r from-teal-600 to-green-600
                  text-white shadow-md hover:shadow-lg hover:brightness-110
                  transition-all duration-300
                "
              >
                <Link href={`/umkm/${umkm.id}`} className="w-full h-full block">
                  Lihat Detail
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
