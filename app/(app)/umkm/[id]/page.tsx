"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import {
  Instagram,
  Phone,
  Mail,
  MapPin,
  Package,
  Store,
  ArrowLeft,
  ExternalLink,
  Tag,
  User,
} from "lucide-react";
import Link from "next/link";
import UmkmRating from "@/components/ulasanUmkm";

export default function UmkmDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [active, setActive] = useState("deskripsi");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/umkm/${id}`)
      .then((res) => {
        if (res.data.ok) setData(res.data.data);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  // Highlight menu saat scroll
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F6F7ED] via-[#F6F7ED] to-[#E8F5E9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00804c] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">Memuat data UMKM...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { umkm, products } = data;

  const subnavItems = [
    { id: "deskripsi", label: "Deskripsi", icon: Store },
    { id: "produk", label: "Produk", icon: Package },
    { id: "ulasan", label: "Ulasan", icon: Tag },
    { id: "lokasi", label: "Lokasi", icon: MapPin },
    { id: "kontak", label: "Kontak", icon: Phone },
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
    <div className="min-h-screen bg-gradient-to-br from-[#F6F7ED] via-[#F6F7ED] to-[#E8F5E9] ">
      {/* Enhanced Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#74C365]/20 to-[#DBE64C]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-[#00804c]/10 to-[#74C365]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 mt-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Profile Image with Gradient Border */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00804c] to-[#74C365] rounded-full blur-lg opacity-50" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl transform hover:scale-105 transition-transform">
              <img
                src={umkm.image_url || "/images/placeholder-product.png"}
                alt={umkm.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-[#00804c] to-[#74C365] bg-clip-text text-transparent mb-4">
            {umkm.name}
          </h1>

          <div className="flex items-center justify-center gap-3 text-gray-600">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full shadow-sm font-semibold">
              <Tag className="w-4 h-4 text-[#00804c]" />
              {umkm.Kategori_usaha || "Kategori"}
            </span>
            {umkm.kota_asal && (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full shadow-sm font-semibold">
                <MapPin className="w-4 h-4 text-[#00804c]" />
                {umkm.kota_asal}
              </span>
            )}
          </div>
        </div>

        {/* Deskripsi Section */}
        <section id="deskripsi" className="mb-16 scroll-mt-24">
          <div className="grid md:grid-cols-[2fr_1fr] gap-8">
            {/* Main Description */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-3xl blur opacity-20 group-hover:opacity-30 transition" />
              <div className="relative bg-white rounded-3xl p-8 shadow-xl border-2 border-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00804c] to-[#74C365] flex items-center justify-center">
                    <Store className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Tentang Kami
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {umkm.description ||
                    "Belum ada deskripsi untuk UMKM ini. Data akan segera diperbarui."}
                </p>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <InfoCard icon={User} label="Pemilik" value={umkm.akun_toko} />
              <InfoCard icon={MapPin} label="Alamat" value={umkm.alamat} />
              <InfoCard icon={Mail} label="Email" value={umkm.email} />
            </div>
          </div>
        </section>

        {/* Produk Section */}
        <section id="produk" className="mb-16 scroll-mt-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00804c] to-[#74C365] flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl font-black text-gray-800">
                Produk Unggulan
              </h2>
            </div>

            {products.length > 0 && (
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="px-6 py-3 bg-white rounded-full shadow-md">
                  <span className="font-bold text-[#00804c]">
                    {products.length}
                  </span>
                  <span className="text-gray-600 ml-1">Produk Tersedia</span>
                </div>
                <div className="px-6 py-3 bg-white rounded-full shadow-md">
                  <span className="font-bold text-[#00804c]">
                    Rp{" "}
                    {Math.min(
                      ...products.map((p: any) => p.harga)
                    ).toLocaleString("id-ID")}
                  </span>
                  <span className="text-gray-600 mx-1">-</span>
                  <span className="font-bold text-[#00804c]">
                    Rp{" "}
                    {Math.max(
                      ...products.map((p: any) => p.harga)
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            )}
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl shadow-xl">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-semibold">
                Belum ada produk tersedia
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p: any, index: number) => {
                const cover =
                  p.images?.find((img: any) => img.is_primary)?.image_url ||
                  p.images?.[0]?.image_url ||
                  "/images/placeholder-product.webp";

                return (
                  <ProductCard
                    key={p.id}
                    product={p}
                    cover={cover}
                    umkmId={umkm.id}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </section>

        {/* Ulasan Section */}
        <section id="ulasan" className="mb-16 scroll-mt-24">
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-white">
            <UmkmRating umkmId={umkm.id} />
          </div>
        </section>

        {/* Lokasi Section */}
        <section id="lokasi" className="mb-16 scroll-mt-24">
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-white">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00804c] to-[#74C365] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Lokasi Kami</h2>
            </div>

            <p className="text-gray-600 text-center mb-6 text-lg">
              {umkm.alamat || "Alamat belum tersedia"}
            </p>

            {umkm.gmaps_url ? (
              <div className="flex justify-center">
                <div
                  className="rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100 w-full max-w-4xl"
                  dangerouslySetInnerHTML={{ __html: umkm.gmaps_url }}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Peta lokasi belum tersedia</p>
              </div>
            )}
          </div>
        </section>

        {/* Kontak Section */}
        <section id="kontak" className="scroll-mt-24">
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-white">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00804c] to-[#74C365] flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Hubungi Kami</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <ContactCard
                icon={Phone}
                title="WhatsApp"
                value={umkm.nomer}
                action={() =>
                  window.open(`https://wa.me/${umkm.nomer}`, "_blank")
                }
                gradient="from-green-500 to-green-600"
              />
              <ContactCard
                icon={Instagram}
                title="Instagram"
                value={`@${umkm.akun_toko}`}
                action={() =>
                  window.open(
                    `https://instagram.com/${umkm.akun_toko}`,
                    "_blank"
                  )
                }
                gradient="from-pink-500 to-purple-600"
              />
              <ContactCard
                icon={Mail}
                title="Email"
                value={umkm.email}
                action={() => window.open(`mailto:${umkm.email}`)}
                gradient="from-blue-500 to-blue-600"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Info Card Component
function InfoCard({ icon: Icon, label, value }: any) {
  if (!value || value === "-") return null;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-50 hover:shadow-xl transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00804c]/10 to-[#74C365]/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-[#00804c]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-500 mb-1">{label}</p>
          <p className="text-gray-800 font-medium break-words">{value}</p>
        </div>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ product, cover, umkmId, index }: any) {
  return (
    <a
      href={`/umkm/${umkmId}/${product.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-gray-50"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <Image
          src={cover}
          alt={product.nama_produk}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-base line-clamp-2 mb-2 group-hover:text-[#00804c] transition-colors">
          {product.nama_produk}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-lg font-black bg-gradient-to-r from-[#00804c] to-[#74C365] bg-clip-text text-transparent">
            Rp {product.harga.toLocaleString("id-ID")}
          </p>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#00804c] transition-colors" />
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        <ExternalLink className="w-5 h-5 text-[#00804c]" />
      </div>
    </a>
  );
}

// Contact Card Component
function ContactCard({ icon: Icon, title, value, action, gradient }: any) {
  if (!value || value === "-") return null;

  return (
    <div className="group relative">
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-25 group-hover:opacity-40 transition`}
      />
      <div className="relative bg-white rounded-2xl p-6 text-center border-2 border-white shadow-lg hover:shadow-2xl transition-all">
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="font-bold text-gray-800 mb-2 text-lg">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 break-words">{value}</p>
        <button
          onClick={action}
          className={`w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r ${gradient} hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2`}
        >
          Hubungi
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
