"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, Leaf, Sparkles } from "lucide-react";

type TabKey = "deskripsi" | "filosofi" | "pendiri";

export default function ECOsrotLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<TabKey>("deskripsi");

  // refs untuk scroll-spy
  const deskripsiRef = useRef<HTMLElement | null>(null);
  const filosofiRef = useRef<HTMLElement | null>(null);
  const pendiriRef = useRef<HTMLElement | null>(null);

  // --- Scroll Spy (IntersectionObserver) ---
  useEffect(() => {
    const sections: Array<[TabKey, HTMLElement | null]> = [
      ["deskripsi", deskripsiRef.current],
      ["filosofi", filosofiRef.current],
      ["pendiri", pendiriRef.current],
    ];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          // prioritas section yang paling banyak terlihat
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id as TabKey);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.2, 0.4, 0.6, 0.8] }
    );

    sections.forEach(([, el]) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // helper class link nav
  const linkCls = (key: TabKey) =>
    [
      "relative px-4 py-2 rounded-xl font-medium transition-colors",
      active === key
        ? "text-emerald-700"
        : "text-gray-600 hover:text-emerald-600",
    ].join(" ");

  // underline anim untuk link aktif
  const underline = (key: TabKey) => (
    <span
      className={[
        "absolute left-3 right-3 -bottom-1 h-0.5 rounded-full transition-all",
        active === key ? "bg-emerald-600 opacity-100" : "opacity-0",
      ].join(" ")}
    />
  );

  // smooth scroll + offset aman
  const scrollTo = (id: TabKey) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
      {/* ======= Sub-Nav (di bawah navbar utama) ======= */}
      <header className="mt-20">
        <div className="sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center justify-center">
              <nav className="hidden md:flex items-center gap-6 bg-white/80 backdrop-blur-lg border border-white/60 shadow-sm rounded-2xl px-4 py-2">
                <button
                  onClick={() => scrollTo("deskripsi")}
                  className={linkCls("deskripsi")}
                >
                  Deskripsi
                  {underline("deskripsi")}
                </button>
                <button
                  onClick={() => scrollTo("filosofi")}
                  className={linkCls("filosofi")}
                >
                  Filosofi Logo
                  {underline("filosofi")}
                </button>
                <button
                  onClick={() => scrollTo("pendiri")}
                  className={linkCls("pendiri")}
                >
                  Pendiri
                  {underline("pendiri")}
                </button>
              </nav>

              {/* Mobile toggler */}
              <button
                onClick={() => setMobileMenuOpen((s) => !s)}
                className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/80 backdrop-blur-lg shadow-sm px-3 py-2 text-gray-700"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden bg-white/90 backdrop-blur-lg shadow-sm rounded-2xl mb-2 overflow-hidden">
                {[
                  ["deskripsi", "Deskripsi"],
                  ["filosofi", "Filosofi Logo"],
                  ["pendiri", "Pendiri"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => scrollTo(key as TabKey)}
                    className={`w-full text-center px-4 py-3 ${
                      active === key
                        ? "text-emerald-700 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ======= Hero ======= */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="pointer-events-none absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-emerald-300/30 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-teal-300/30 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-6 ring-1 ring-white/60">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">
              Platform UMKM Ramah Lingkungan
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-700 to-green-700 mb-6 tracking-tight">
            ECOsrot
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Menghubungkan konsumen peduli lingkungan dengan UMKM lokal
            Indonesia.
          </p>

          {/* Hero Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {[
              "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1566442015928-c7a4c00e5add?w=1200&q=80&auto=format&fit=crop",
            ].map((img, idx) => (
              <figure
                key={idx}
                className="group relative overflow-hidden rounded-3xl bg-white border border-white/60 shadow-md h-64"
              >
                <img
                  src={img}
                  alt={`Hero ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ======= Deskripsi ======= */}
      <section
        id="deskripsi"
        ref={deskripsiRef as any}
        className="scroll-mt-28 py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/60 shadow-md p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-bold text-emerald-800 text-center mb-10">
              Latar Belakang
            </h2>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <img
                  src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&q=80&auto=format&fit=crop"
                  alt="Pertumbuhan"
                  className="w-full rounded-2xl border border-white/60 shadow"
                />
              </div>
              <div className="order-1 md:order-2 text-gray-700 leading-relaxed space-y-4">
                <p>
                  Perkembangan gaya hidup berkelanjutan—khususnya pada Gen
                  Z—menunjukkan meningkatnya kesadaran terhadap isu lingkungan
                  dan tanggung jawab sosial dalam konsumsi produk. Tantangannya,
                  konsumen sering kesulitan menemukan UMKM lokal yang sejalan
                  dengan nilai tersebut.
                </p>
                <p>
                  <span className="font-semibold text-emerald-800">
                    ECOsrot
                  </span>{" "}
                  hadir sebagai direktori yang menampilkan produk UMKM
                  berkomitmen pada keberlanjutan, memudahkan pengguna menemukan,
                  memilih, dan mendukung bisnis lokal yang inovatif serta
                  mengolah limbah secara kreatif.
                </p>
              </div>
            </div>

            {/* Visi & Misi */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-3 flex items-center gap-2">
                  <Leaf className="w-7 h-7" />
                  Visi
                </h3>
                <p className="text-gray-700">
                  Menjadi platform utama yang menghubungkan konsumen peduli
                  lingkungan dengan UMKM lokal di Indonesia, mendorong ekosistem
                  bisnis berkelanjutan.
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-3 flex items-center gap-2">
                  <Leaf className="w-7 h-7" />
                  Misi
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    "Menjembatani produk ramah lingkungan UMKM dengan konsumen.",
                    "Memudahkan pencarian dan dukungan pada produk berkelanjutan.",
                    "Menyediakan ruang edukasi terkait gaya hidup ramah lingkungan.",
                    "Mendorong kolaborasi UMKM–komunitas untuk dampak positif bersama.",
                  ].map((t, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">
                        {i + 1}
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= Filosofi Logo ======= */}
      <section
        id="filosofi"
        ref={filosofiRef as any}
        className="scroll-mt-28 py-20 px-4 bg-gradient-to-br from-teal-50 to-emerald-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/60 shadow-md p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-bold text-emerald-800 text-center mb-10">
              Filosofi Logo
            </h2>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="rounded-2xl p-8 bg-gradient-to-br from-emerald-100 to-teal-100 text-center border border-white/60">
                <div className="w-44 h-44 md:w-52 md:h-52 mx-auto rounded-2xl overflow-hidden flex items-center justify-center">
                  <img
                    src="/images/logo2.png"
                    alt="ECOsrot Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="mt-4 text-emerald-700 font-semibold">
                  Identitas & Keberlanjutan
                </p>
              </div>

              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  Gradasi hijau merepresentasikan kehidupan, pertumbuhan, dan
                  komitmen terhadap alam. Palet ini dipilih untuk mencerminkan
                  tanggung jawab lingkungan.
                </p>
                <p>
                  Unsur daun melambangkan semangat hidup dan kesinambungan.
                  Setiap elemen mengingatkan bahwa aktivitas ECOsrot berfokus
                  pada kelestarian bumi.
                </p>
              </div>
            </div>

            <div className="mt-10 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4">
                Filosofi Nama
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Nama <span className="font-bold text-emerald-700">ECO</span>{" "}
                  berkaitan dengan ekologi; sedangkan{" "}
                  <span className="font-bold text-emerald-700">srot</span>{" "}
                  merujuk pada pertumbuhan cepat dan alami.
                </p>
                <p>
                  Maknanya:{" "}
                  <span className="font-bold text-emerald-700">
                    “sumber yang ekologis”
                  </span>
                  , yakni wadah produk ramah lingkungan dan inspirasi bagi
                  masyarakat untuk mendukung UMKM berkelanjutan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= Pendiri ======= */}
      <section
        id="pendiri"
        ref={pendiriRef as any}
        className="scroll-mt-28 py-20 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl border border-white/60 shadow-md p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-emerald-800">
              Pendiri
            </h2>
            <p className="text-xl md:text-2xl text-emerald-700 italic font-semibold mt-2">
              “Mau Ikan Adventure”
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-7 shadow-sm border border-white/60">
                <div className="mx-auto mb-5 relative w-36 h-36 rounded-full overflow-hidden shadow ring-8 ring-white/80">
                  <img
                    src="/images/aboutus_pendiri.jpg"
                    alt="Pendiri 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-emerald-800">
                  Aileen Joyce David
                </h3>
                <p className="text-teal-700">Co-Founder</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-7 shadow-sm border border-white/60">
                <div className="mx-auto mb-5 relative w-36 h-36 rounded-full overflow-hidden shadow ring-8 ring-white/80">
                  <img
                    src="/images/aboutus_pendiri.jpg"
                    alt="Pendiri 2"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-emerald-800">
                  Selena Hans
                </h3>
                <p className="text-teal-700">Co-Founder</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-7 shadow-sm border border-white/60 sm:col-span-2">
                <div className="mx-auto mb-5 relative w-36 h-36 rounded-full overflow-hidden shadow ring-8 ring-white/80">
                  <img
                    src="/images/aboutus_pendiri.jpg"
                    alt="Pendiri 3"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-emerald-800">
                  Nico Ferrarel
                </h3>
                <p className="text-teal-700">Product & Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= Footer ======= */}
      <footer className="bg-emerald-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf className="w-7 h-7" />
            <span className="text-2xl font-bold tracking-tight">ECOsrot</span>
          </div>
          <p className="text-emerald-200">
            Platform UMKM Ramah Lingkungan Indonesia
          </p>
          <p className="text-emerald-300 text-sm mt-1">
            © 2024 ECOsrot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
