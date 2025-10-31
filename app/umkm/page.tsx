"use client";

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
        name: "Warung Bu Siti",
        category: "Kuliner",
        description: "Menyediakan makanan tradisional khas Surabaya.",
        image: "/images/warung-bu-siti.jpg",
      },
      {
        id: 2,
        name: "Batik Arjuna",
        category: "Kerajinan",
        description: "Produk batik tulis berkualitas tinggi.",
        image: "/images/batik-arjuna.jpg",
      },
      {
        id: 3,
        name: "Kopi Gunung Gragal",
        category: "Minuman",
        description: "Kopi arabika hasil petani lokal dengan aroma khas.",
        image: "/images/kopi-gragal.jpg",
      },
      {
        id: 3,
        name: "Kopi Gunung Gragal",
        category: "Minuman",
        description: "Kopi arabika hasil petani lokal dengan aroma khas.",
        image: "/images/kopi-gragal.jpg",
      },
      {
        id: 3,
        name: "Kopi Gunung Gragal",
        category: "Minuman",
        description: "Kopi arabika hasil petani lokal dengan aroma khas.",
        image: "/images/kopi-gragal.jpg",
      },
      {
        id: 3,
        name: "Kopi Gunung Gragal",
        category: "Minuman",
        description: "Kopi arabika hasil petani lokal dengan aroma khas.",
        image: "/images/kopi-gragal.jpg",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 ">
      <h1 className="text-4xl font-bold text-center text-teal-700 mb-8">
        Daftar UMKM
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {umkmList.map((umkm) => (
          <div
            key={umkm.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={umkm.image}
              alt={umkm.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {umkm.name}
              </h2>
              <p className="text-sm text-teal-600 font-medium mb-2">
                {umkm.category}
              </p>
              <p className="text-gray-600 text-sm">{umkm.description}</p>
              <button className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700 transition">
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
