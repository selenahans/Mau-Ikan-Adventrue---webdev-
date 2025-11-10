"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Instagram, Phone } from "lucide-react";

export default function UmkmDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [active, setActive] = useState("deskripsi");

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/umkm/${id}`).then((res) => {
      if (res.data.ok) setData(res.data.data);
    });
  }, [id]);

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

  if (!data)
    return <p className="text-center mt-10 text-gray-500">Memuat data...</p>;

  const { umkm, products } = data;

  const subnavItems = [
    { id: "deskripsi", label: "Deskripsi" },
    { id: "produk", label: "Daftar Produk" },
    { id: "ulasan", label: "Ulasan" },
    { id: "galeri", label: "Galeri" },
    { id: "lokasi", label: "Lokasi" },
    { id: "kontak", label: "Kontak" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el)
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: "smooth",
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
      {/* 🟢 Sub Navbar */}
      <div className="sticky top-0 border-b bg-white/70 backdrop-blur z-40 mt-20">
        <div className="flex justify-center gap-8 py-3">
          {subnavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`font-semibold transition-colors duration-300 relative pb-1
                ${
                  active === item.id
                    ? "text-green-700"
                    : "text-gray-500 hover:text-green-700"
                }`}
            >
              {item.label}
              {active === item.id && (
                <span className="absolute left-0 -bottom-[2px] w-full h-[2px] bg-green-700 rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 🟢 Header UMKM */}
      <div className="text-center pt-12 pb-6">
        <h1 className="text-3xl font-bold mt-3 text-[#233D1D]">{umkm.name}</h1>
      </div>

      {/* 🟢 Profil Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 px-6">
        {/* Gambar */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <Image
            src={umkm.image_url || "/images/placeholder-product.png"}
            alt={umkm.name}
            width={600}
            height={350}
            className="object-cover w-full h-[260px]"
          />
        </div>

        {/* Info */}
        <div className="bg-white shadow-md rounded-xl p-6 text-left">
          <p className="italic text-gray-600 mb-3">
            “When Perfumes Becomes Green Action”
          </p>
          <div className="space-y-2 text-[15px] text-black">
            <p>
              <span className="font-semibold text-green-700">
                Kategori Usaha:
              </span>{" "}
              {umkm.Kategori_usaha || "-"}
            </p>
            <p>
              <span className="font-semibold text-green-700">Kota Asal:</span>{" "}
              {umkm.kota_asal || "-"}
            </p>
            <p>
              <span className="font-semibold text-green-700">Alamat:</span>{" "}
              {umkm.alamat || "-"}
            </p>
            <p>
              <span className="font-semibold text-green-700">Email:</span>{" "}
              {umkm.email || "-"}
            </p>
            <p>
              <span className="font-semibold text-green-700">Pemilik:</span>{" "}
              {umkm.akun_toko || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* 🟢 Deskripsi */}
      <section
        id="deskripsi"
        className="max-w-6xl mx-auto mt-10 px-6 bg-white shadow-md rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-3 text-center">
          Deskripsi
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          {umkm.description ||
            "Belum ada deskripsi untuk UMKM ini. Data akan segera diperbarui."}
        </p>
      </section>

      {/* 🟢 Daftar Produk */}
      <section
        id="produk"
        className="max-w-6xl mx-auto mt-10 px-6 bg-white shadow-md rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Daftar Produk
        </h2>

        <div className="flex flex-wrap justify-center text-sm text-gray-600 gap-6 mb-6">
          <span>
            <strong>Total Jenis Produk:</strong> {products.length || 0}
          </span>
          {products.length > 0 && (
            <span>
              <strong>Kisaran Harga:</strong> Rp{" "}
              {Math.min(
                ...products.map((p: any) => p.harga || 0)
              ).toLocaleString("id-ID")}{" "}
              - Rp{" "}
              {Math.max(
                ...products.map((p: any) => p.harga || 0)
              ).toLocaleString("id-ID")}
            </span>
          )}
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center">Belum ada produk.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 text-black">
            {products.map((p: any) => (
              <div
                key={p.id}
                className="border rounded-lg p-3 shadow-sm hover:shadow-lg transition bg-white"
              >
                <Image
                  src={p.image_url || "/images/placeholder-product.webp"}
                  alt={p.nama_produk}
                  width={200}
                  height={200}
                  className="rounded-md object-cover w-full h-40"
                />
                <h3 className="font-semibold mt-2 text-center">
                  {p.nama_produk}
                </h3>
                <p className="text-green-600 font-medium text-center">
                  Rp {p.harga?.toLocaleString("id-ID")}
                </p>
                <p className="text-sm text-gray-500 line-clamp-2 text-center">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🟢 Ulasan */}
      <section
        id="ulasan"
        className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded-xl"
      >
        <h2 className="text-xl font-semibold mb-3 text-green-800 text-center">
          Ulasan
        </h2>
        <p className="text-gray-600 text-center">
          Belum ada ulasan untuk UMKM ini.
        </p>
      </section>

      {/* 🟢 Galeri */}
      <section
        id="galeri"
        className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded-xl"
      >
        <h2 className="text-xl font-semibold mb-3 text-green-800 text-center">
          Galeri
        </h2>
        <p className="text-gray-600 text-center">
          Galeri foto akan segera tersedia.
        </p>
      </section>

      {/* 🟢 Lokasi */}
      <section
        id="lokasi"
        className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded-xl"
      >
        <h2 className="text-xl font-semibold mb-3 text-green-800 text-center">
          Lokasi
        </h2>

        {/* Alamat */}
        <p className="text-gray-600 text-center mb-4">
          {umkm.alamat || "Alamat belum tersedia"}
        </p>

        {/* Peta */}
        {umkm.gmaps_url ? (
          <div
            className="w-full h-[400px] rounded-lg overflow-hidden"
            dangerouslySetInnerHTML={{ __html: umkm.gmaps_url }}
          />
        ) : (
          <p className="text-center text-gray-500">
            Lokasi belum tersedia untuk UMKM ini.
          </p>
        )}
      </section>

      {/* 🟢 Kontak */}
      <section
        id="kontak"
        className="max-w-5xl mx-auto mt-10 mb-16 p-8 bg-white shadow rounded-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">
          Kontak Kami
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
          {/* WhatsApp */}
          <div className="border border-green-700 bg-green-50 rounded-lg p-6 w-64 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition">
            <div className="flex flex-col items-center">
              {/* Ikon WhatsApp */}
              <Phone className="text-green-700 w-8 h-8 mb-2" />
              <h3 className="font-semibold text-green-800">WhatsApp</h3>
              <p className="text-sm text-gray-600">
                {umkm.nomer || "Nomor belum tersedia"}
              </p>
            </div>

            {umkm.nomer && (
              <a
                href={`https://wa.me/${umkm.nomer.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-1.5 text-green-700 border border-green-700 rounded-md text-sm hover:bg-green-700 hover:text-white transition"
              >
                Hubungi Kami
              </a>
            )}
          </div>

          {/* Instagram */}
          <div className="border border-green-700 bg-green-50 rounded-lg p-6 w-64 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition">
            <div className="flex flex-col items-center">
              {/* Ikon Instagram */}
              <Instagram className="text-green-700 w-8 h-8 mb-2" />
              <h3 className="font-semibold text-green-800">Instagram</h3>
              <p className="text-sm text-gray-600">
                @{umkm.akun_toko || "Akun belum tersedia"}
              </p>
            </div>

            {umkm.akun_toko && (
              <a
                href={`https://instagram.com/${umkm.akun_toko}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-1.5 text-green-700 border border-green-700 rounded-md text-sm hover:bg-green-700 hover:text-white transition"
              >
                Hubungi Kami
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
