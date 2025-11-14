"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import HeroCarousel from "@/components/heroEdukasi";

type TabKey = "inspirasi" | "umkm" | "panduan" | "konsumen" | "komunitas";

export default function EdukasiPage() {
  const [active, setActive] = useState<TabKey>("inspirasi");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const inspirasiRef = useRef<HTMLElement | null>(null);
  const umkmRef = useRef<HTMLElement | null>(null);
  const panduanRef = useRef<HTMLElement | null>(null);
  const konsumenRef = useRef<HTMLElement | null>(null);
  const komunitasRef = useRef<HTMLElement | null>(null);
  const mentorImages = [
  "https://images.pexels.com/photos/3119215/pexels-photo-3119215.jpeg",
  "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg",
  "https://images.pexels.com/photos/25047761/pexels-photo-25047761.jpeg",
];
const greenTips = [
  "Gunakan Bahan Baku Ramah Lingkungan",
  "Kurangi Penggunaan Plastik Sekali Pakai",
  "Terapkan Sistem Produksi Hemat Energi",
  "Kelola Limbah Secara Bertanggung Jawab",
  "Digitalisasi Dokumen dan Promosi",
  "Bangun Budaya Kerja Ramah Lingkungan",
  "Sediakan Produk Refill atau Kemasan Isi Ulang",
  "Pilih Supplier yang Juga Berkomitmen pada Lingkungan",
  "Edukasi Konsumen tentang Dampak Positif Praktik Hijau"
];



  // ===== OBSERVE SCROLL =====
  useEffect(() => {
    const sections: Array<[TabKey, HTMLElement | null]> = [
      ["inspirasi", inspirasiRef.current],
      ["umkm", umkmRef.current],
      ["panduan", panduanRef.current],
      ["konsumen", konsumenRef.current],
      ["komunitas", komunitasRef.current],
    ];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) setActive(visible.target.id as TabKey);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.2, 0.4, 0.6] }
    );

    sections.forEach(([, el]) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: TabKey) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const linkCls = (key: TabKey) =>
    [
      "relative px-3 py-2 rounded-xl font-medium transition-colors",
      active === key ? "text-[#00804c]" : "text-gray-400 hover:text-[#74C365]",
    ].join(" ");

  const underline = (key: TabKey) => (
    <span
      className={[
        "absolute left-3 right-3 -bottom-1 h-0.5 rounded-full transition-all",
        active === key ? "bg-[#00804c] opacity-100" : "opacity-0",
      ].join(" ")}
    />
  );

  return (
    <div className="min-h-screen bg-[#F6F7ED] relative overflow-hidden">
      {/* background blur */}
      <div className="absolute top-0 -left-30 w-96 h-96 bg-[#74C365] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse pointer-events-none" />
      <div className="absolute -top-40 left-30 w-96 h-96 bg-[#DBE64C] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse pointer-events-none" />
      <div className="absolute -top-40 right-30 w-96 h-96 bg-[#DBE64C] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse pointer-events-none" />
      <div className="absolute -top-10 -right-60 w-96 h-96 bg-[#74C365] rounded-full mix-blend-multiply filter blur-3xl opacity-1 animate-pulse pointer-events-none" />

      {/* ===== Sticky SubNav ===== */}
      <header className="mt-30 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-center">
            <nav className="hidden md:flex items-center gap-6 backdrop-blur-lg rounded-2xl px-4 py-2 z-0">
              <button
                onClick={() => scrollTo("inspirasi")}
                className={linkCls("inspirasi")}
              >
                Inspirasi Hijau
                {underline("inspirasi")}
              </button>

              <button
                onClick={() => scrollTo("umkm")}
                className={linkCls("umkm")}
              >
                Cerita UMKM
                {underline("umkm")}
              </button>

              <button
                onClick={() => scrollTo("panduan")}
                className={linkCls("panduan")}
              >
                Tips Ramah Lingkungan
                {underline("panduan")}
              </button>

              <button
                onClick={() => scrollTo("komunitas")}
                className={linkCls("komunitas")}
              >
                Komunitas Hijau
                {underline("komunitas")}
              </button>
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/80 backdrop-blur-lg px-3 py-2 text-gray-400"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden bg-white/90 backdrop-blur-xl shadow rounded-2xl overflow-hidden mb-4">
              {[
                ["inspirasi", "Inspirasi Hijau"],
                ["umkm", "Cerita UMKM"],
                ["panduan", "Tips Ramah Lingkungan"],
                ["komunitas", "Komunitas Hijau"],
              ].map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => scrollTo(k as TabKey)}
                  className={`w-full px-4 py-3 text-left ${
                    active === k
                      ? "text-[#00804c] font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* =====================================================
         SECTION: INSPIRASI HIJAU
      ===================================================== */}

      <div className="max-w-6xl grid mt-15 mb-15 md:grid-cols-2 gap-8 px-4 mx-auto">
        <div className="flex flex-col justify-center">
          <h2 className="text-5xl font-bold font-['Helvetica'] relative z-10 p-6">
            <span className="bg-gradient-to-br from-[#00804c] to-[#1E488F] bg-clip-text text-transparent">
              Learn, Grow,{" "}
            </span>
          </h2>
          <h2 className="text-5xl font-bold font-['Helvetica'] relative z-10 p-6">
            <span className="bg-gradient-to-br from-[#00804c] to-[#1E488F] bg-clip-text text-transparent">
              Be Green with
            </span>
          </h2>
          <img src="/images/gifhlmbgs.gif" />
        </div>
        <div className="flex flex-col grid md:grid-cols-2 justify-center p-6">
          <div className="p-6">
            <img
              src="/images/edu1.png"
              className="rounded-2xl shadow transition hover:shadow-xl hover:scale-110"
            />
          </div>
          <div>
            <div className="p-6">
              <img
                src="/images/edu2.png"
                className="rounded-2xl shadow transition hover:shadow-xl hover:scale-110"
              />
            </div>
            <div className="p-6">
              <img
                src="/images/edu3.png"
                className="rounded-2xl shadow transition hover:shadow-xl hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>

      <section id="inspirasi" ref={inspirasiRef} className="scroll-mt-10 py-20">
        <div
          className="gap-6 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bgrumput.png')" }}
        >
          <h2
            className="text-4xl p-10 text-[#F6F7ED] text-center font-bold"
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            Inspirasi Hijau
          </h2>
          <div className="mb-12 max-w-6xl mx-auto grid md:grid-cols-3 mt-6 gap-8 px-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative group cursor-pointer hover:-translate-y-1 transition mb-20"
              >
                {/* Image on top */}
                <div className="w-full flex justify-center">
                  <Image
                    src={mentorImages[i - 1]} 
                    width={300}
                    height={300}
                    alt="mentor"
                    className="rounded-full"
                  />
                </div>

                {/* Hidden content that appears on hover */}
                <div
                  className="
  absolute 
  top-1/2 left-1/2 
  -translate-x-1/2 -translate-y-1/2
  w-[250px] h-[250px]
  bg-[#74C365] p-6 shadow 
  flex flex-col items-center justify-center 
  opacity-0 group-hover:opacity-100 
  transition-opacity duration-300 
  rounded-full
"
                >
                  <h3 className="text-[#F6F7ED] text-lg font-semibold text-center">
                    Figur Hijau {i}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
         SECTION: CERITA UMKM
      ===================================================== */}
      <section
        id="umkm"
        ref={umkmRef}
        className="scroll-mt-28 mb-40"
      >
        <h2 className="text-4xl font-bold text-[#00804c] text-center mb-10">
          Cerita UMKM
        </h2>
        <HeroCarousel />

        {/* <div className="max-w-6xl mx-auto gap-10 px-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white grid md:grid-cols-2 rounded-xl overflow-hidden shadow hover:shadow-xl transition"
            >
              <Image
                src="/images/bgvisi.png"
                width={800}
                height={500}
                alt="umkm"
                className="w-full"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl text-[#00804c]">
                  UMKM Hijau {i}
                </h3>
                <p className="text-gray-600 text-sm mt-3">
                  Kisah pelaku UMKM yang berhasil menerapkan praktik ramah
                  lingkungan.
                </p>
              </div>
            </div>
          ))}
        </div> */}
      </section>

      {/* =====================================================
         SECTION: TIPS & PANDUAN
      ===================================================== */}
      <section
        id="panduan"
        ref={panduanRef}
        className="scroll-mt-28 py-20 bg-[url('/images/bgtips.png')] bg-cover bg-center bg-fixed"
      >
        <h2 className="text-4xl font-bold text-white text-center mb-10 drop-shadow-lg">
          Tips Ramah Lingkungan
        </h2>

        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition"
            >
              <Image
                src={`/images/tips/${i+1}.png`}
                width={800}
                height={500}
                alt="tips"
                className="w-full mb-6"
              />
              <p className="text-gray-500">Tips #{i + 1}</p>
              <h1 className="text-[#00804c]  font-semibold text-2xl">{greenTips[i]}</h1>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
         SECTION: KOMUNITAS HIJAU
      ===================================================== */}
      <section
        id="komunitas"
        ref={komunitasRef}
        className="scroll-mt-28 py-24 bg-[#F6F7ED] bg-cover bg-center"
      >
        <div className="text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#00804c] drop-shadow mb-4">
            Komunitas Hijau
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-6">
            Bergabung dalam komunitas peduli lingkungan untuk berbagi ide,
            dampak, dan aksi nyata.
          </p>

          <button className="px-6 py-3 bg-white text-[#00804c] font-semibold rounded-xl shadow hover:bg-[#74C365] hover:text-[#F6F7ED] transition">
            Gabung Sekarang
          </button>
        </div>
      </section>
    </div>
  );
}
