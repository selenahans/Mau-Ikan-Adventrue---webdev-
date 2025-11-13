"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Instagram, Phone } from "lucide-react";
import UmkmRating from "@/components/ulasanUmkm";

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
    { id: "produk", label: "Produk" },
    { id: "ulasan", label: "Ulasan" },
    { id: "lokasi", label: "Lokasi" },
    { id: "kontak", label: "Kontak" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el)
      window.scrollTo({
        top: el.offsetTop - 90,
        behavior: "smooth",
      });
  };

  return (
    <div className="min-h-screen bg-[#F6F7ED] relative overflow-hidden">
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
      {/* 🟢 Sub Navbar */}
      <header className="mt-30">
        <div className="sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center justify-center">
              <nav className="hidden md:flex items-center gap-6 backdrop-blur-lg rounded-2xl px-4 py-2">
                {subnavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`relative font-semibold text-lg tracking-wide transition-all duration-300 pb-1
      ${active === item.id ? "text-[#00804c]" : "text-gray-400"}
      after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:h-[2px]
      after:bg-[#00804c] after:rounded-full after:transition-all after:duration-300 hover:text-[#74C365]
      ${active === item.id ? "after:w-full" : ""}
    `}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* 🟢 Header UMKM */}
      <div className="mt-10 mb-5 relative w-48 aspect-square mx-auto rounded-full overflow-hidden shadow transition-all duration-300 hover:shadow-lg hover:scale-105">
        <img
          src={umkm.image_url || "/images/placeholder-product.png"}
          alt={umkm.name}
          className="w-full h-full object-cover"
        />
      </div>

      <header className="text-center pt-2 pb-8">
        <h1 className="text-5xl font-extrabold text-[#00804c] tracking-tight mb-2">
          {umkm.name}
        </h1>
      </header>

      {/* 🟢 Deskripsi */}
      <section
        id="deskripsi"
        className="max-w-6xl mx-auto grid md:grid-cols-[60%_40%] gap-8 px-6"
      >
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg hover:scale-102">
          <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
            Deskripsi
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            {umkm.description ||
              "Belum ada deskripsi untuk UMKM ini. Data akan segera diperbarui."}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-102">
          <div className="space-y-3 text-gray-700">
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
      </section>

      {/* 🟢 Produk */}
      <section
        id="produk"
        className="max-w-6xl mx-auto mt-12 px-6 py-10 bg-white rounded-2xl shadow-md border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Produk Unggulan
        </h2>

        <div className="flex flex-wrap justify-center text-sm text-gray-600 gap-6 mb-8">
          <span>
            <strong>Total Produk:</strong> {products.length || 0}
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
          <p>
            <strong>Kategori Produk:</strong> {umkm.Kategori_usaha}
          </p>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Belum ada produk.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p: any) => (
              <a
                key={p.id}
                href={`/umkm/${umkm.id}/${p.id}`}
                className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Gambar */}
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={p.image_url || "/images/placeholder-product.webp"}
                    alt={p.nama_produk}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>

                {/* Info Produk */}
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 text-lg line-clamp-1 mb-1">
                    {p.nama_produk}
                  </h3>
                  <p className="text-green-700 font-bold text-sm mb-2">
                    Rp {p.harga?.toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2 h-[40px]">
                    {p.description || "Tidak ada deskripsi produk."}
                  </p>
                </div>

                {/* Hover effect text */}
                <div className="absolute inset-0 flex items-center justify-center bg-green-700/70 text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Lihat Detail
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* 🟢 Ulasan */}
      <section
        id="ulasan"
        className="max-w-6xl mx-auto mt-12 px-6 py-6 bg-white rounded-2xl shadow-md border border-gray-100"
      >
        <UmkmRating umkmId={umkm.id} />
      </section>


      {/* 🟢 Lokasi */}
      <section
        id="lokasi"
        className="max-w-6xl mx-auto mt-12 px-6 py-8 bg-white rounded-2xl shadow-md border border-gray-100 text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-green-800">Lokasi</h2>
        <p className="text-gray-600 mb-4">
          {umkm.alamat || "Alamat belum tersedia"}
        </p>

        {umkm.gmaps_url ? (
          <div className="flex justify-center">
            <div
              className="rounded-lg overflow-hidden shadow-inner center"
              dangerouslySetInnerHTML={{ __html: umkm.gmaps_url }}
            />
          </div>
        ) : (
          <p className="text-gray-500">Lokasi belum tersedia untuk UMKM ini.</p>
        )}
      </section>

      {/* 🟢 Kontak */}
      <section
        id="kontak"
        className="max-w-6xl mx-auto mt-12 px-6 py-10 bg-white rounded-2xl shadow-md border border-gray-100 text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-[#00804c]">Kontak</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {/* WhatsApp */}
          <div className="w-64 border border-green-600 bg-green-50 rounded-xl p-6 flex flex-col items-center justify-between hover:shadow-lg transition-all">
            <Phone className="text-green-700 w-8 h-8 mb-2" />
            <h3 className="font-semibold text-[#00804c]">WhatsApp</h3>
            <p className="text-sm text-gray-600">
              {umkm.nomer === "-" ? "Nomor belum tersedia" : umkm.nomer}
            </p>
            {umkm.nomer !== "-" && (
              <a
                href={`https://wa.me/${umkm.nomer.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 px-4 py-1.5 text-[#00804c] border border-[#00804c] rounded-md text-sm hover:bg-[#00804c] hover:text-white transition"
              >
                Hubungi Kami
              </a>
            )}
          </div>

          {/* Instagram */}
          <div className="w-64 border border-green-600 bg-green-50 rounded-xl p-6 flex flex-col items-center justify-between hover:shadow-lg transition-all">
            <Instagram className="text-[#00804c] w-8 h-8 mb-2" />
            <h3 className="font-semibold text-[#00804c]">Instagram</h3>
            <p className="text-sm text-gray-600">
              {umkm.akun_toko === "-" ? "Akun belum tersedia" : '@' + umkm.akun_toko}
            </p>
            {umkm.akun_toko !== "-" &&  (
              <a
                href={`https://instagram.com/${umkm.akun_toko}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 px-4 py-1.5 text-[#00804c] border border-[#00804c] rounded-md text-sm hover:bg-[#00804c] hover:text-white transition"
              >
                Kunjungi Akun
              </a>
            )}
          </div>

          {/* Email */}
          <div className="w-64 border border-green-600 bg-green-50 rounded-xl p-6 flex flex-col items-center justify-between hover:shadow-lg transition-all">
            <svg
              xmlns="https://www.iconpacks.net/icons/1/free-mail-icon-142-thumb.png"
              className="w-8 h-8 text-[#00804c] mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12H8m8-4H8m0 8h8m4 4H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="font-semibold text-[#00804c]">Email</h3>
            <p className="text-sm text-gray-600">
              {umkm.email === "-" ? "Email belum tersedia" : umkm.email}
            </p>
            {umkm.email !== "-" && (
              <a
                href={`mailto:${umkm.email}`}
                className="mt-3 px-4 py-1.5 text-[#00804c] border border-[#00804c] rounded-md text-sm hover:bg-[#00804c] hover:text-white transition"
              >
                Kirim Email
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
