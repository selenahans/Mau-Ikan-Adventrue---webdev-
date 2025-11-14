"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

type TabKey = "inspirasi" | "umkm" | "panduan" | "konsumen" | "komunitas";

export default function EdukasiPage() {
  const [active, setActive] = useState<TabKey>("inspirasi");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const inspirasiRef = useRef<HTMLElement | null>(null);
  const umkmRef = useRef<HTMLElement | null>(null);
  const panduanRef = useRef<HTMLElement | null>(null);
  const konsumenRef = useRef<HTMLElement | null>(null);
  const komunitasRef = useRef<HTMLElement | null>(null);

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
    <div className="min-h-screen  relative overflow-hidden mt-20">
      {/* ===== Background Blobs like About Us ===== */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-[#74C365] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#DBE64C] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      {/* ===== Sticky SubNav ===== */}
      <header className="sticky top-0 z-40 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-center">
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-5 backdrop-blur-lg bg-white/30 shadow-sm px-6 py-2 rounded-2xl">
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
                Tips Panduan
                {underline("panduan")}
              </button>

              <button
                onClick={() => scrollTo("konsumen")}
                className={linkCls("konsumen")}
              >
                Edukasi Konsumen
                {underline("konsumen")}
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
                ["panduan", "Tips Panduan"],
                ["konsumen", "Edukasi Konsumen"],
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
      <section id="inspirasi" ref={inspirasiRef} className="scroll-mt-28 py-20">
        <h2 className="text-4xl font-bold text-[#00804c] text-center mb-10">
          Inspirasi Hijau
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="w-32 h-32 mx-auto mb-4">
                <Image
                  src="/images/aboutus_pendiri.jpg"
                  width={200}
                  height={200}
                  alt="mentor"
                  className="rounded-full"
                />
              </div>
              <h3 className="text-[#00804c] text-xl font-semibold text-center">
                Figur Hijau {i}
              </h3>
              <p className="text-gray-600 text-sm mt-2 text-center">
                Kisah inspiratif tentang perjalanan menciptakan dampak
                lingkungan.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
         SECTION: CERITA UMKM
      ===================================================== */}
      <section
        id="umkm"
        ref={umkmRef}
        className="scroll-mt-28 py-20 bg-[#F0F7F0]"
      >
        <h2 className="text-4xl font-bold text-[#00804c] text-center mb-10">
          Cerita UMKM
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
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
        </div>
      </section>

      {/* =====================================================
         SECTION: TIPS & PANDUAN
      ===================================================== */}
      <section
        id="panduan"
        ref={panduanRef}
        className="scroll-mt-28 py-20 bg-[url('/images/daun.png')] bg-cover bg-center bg-fixed"
      >
        <h2 className="text-4xl font-bold text-white text-center mb-10 drop-shadow-lg">
          Tips & Panduan UMKM
        </h2>

        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition"
            >
              <h3 className="text-[#00804c] font-semibold">Panduan #{i + 1}</h3>
              <p className="text-gray-600 text-sm mt-2">
                Langkah praktis membantu UMKM menerapkan inovasi hijau.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
         SECTION: EDUKASI KONSUMEN
      ===================================================== */}
      <section
        id="konsumen"
        ref={konsumenRef}
        className="scroll-mt-28 py-20 bg-[#F6F7ED]"
      >
        <h2 className="text-4xl font-bold text-[#00804c] text-center mb-10">
          Edukasi Konsumen
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
            >
              <h3 className="font-semibold text-[#00804c]">Materi #{i}</h3>
              <p className="text-sm text-gray-600 mt-2">
                Pembelajaran untuk mendukung gaya hidup ramah lingkungan.
              </p>
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
        className="scroll-mt-28 py-24 bg-[url('/images/bgvisi.png')] bg-cover bg-center"
      >
        <div className="text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white drop-shadow mb-4">
            Komunitas Hijau
          </h2>
          <p className="text-emerald-50 max-w-xl mx-auto mb-6">
            Bergabung dalam komunitas peduli lingkungan untuk berbagi ide,
            dampak, dan aksi nyata.
          </p>

          <button className="px-6 py-3 bg-white text-[#00804c] font-semibold rounded-xl shadow hover:bg-emerald-100 transition">
            Gabung Sekarang
          </button>
        </div>
      </section>
    </div>
  );
}
