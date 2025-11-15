"use client";

import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  FileText,
  Target,
  Palette,
  Type,
  Users,
  Sparkles,
} from "lucide-react";
import HeroCarousel from "@/components/heroAboutUs";

type TabKey =
  | "deskripsi"
  | "visimisi"
  | "visi-misi"
  | "filosofi"
  | "filnama"
  | "pendiri";

const navItems = [
  { id: "deskripsi" as TabKey, label: "Deskripsi", icon: FileText },
  { id: "visimisi" as TabKey, label: "Visi & Misi", icon: Target },
  { id: "filosofi" as TabKey, label: "Filosofi Logo", icon: Palette },
  { id: "filnama" as TabKey, label: "Filosofi Nama", icon: Type },
  { id: "pendiri" as TabKey, label: "Pendiri", icon: Users },
];

export default function ECOsrotLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<TabKey>("deskripsi");
  const [isScrolled, setIsScrolled] = useState(false);

  const deskripsiRef = useRef<HTMLElement | null>(null);
  const filosofiRef = useRef<HTMLElement | null>(null);
  const pendiriRef = useRef<HTMLElement | null>(null);
  const visimisiRef = useRef<HTMLElement | null>(null);
  const filnamaRef = useRef<HTMLElement | null>(null);

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections: Array<[TabKey, HTMLElement | null]> = [
      ["deskripsi", deskripsiRef.current],
      ["visimisi", visimisiRef.current],
      ["filosofi", filosofiRef.current],
      ["filnama", filnamaRef.current],
      ["pendiri", pendiriRef.current],
    ];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
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

  const scrollTo = (id: TabKey) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F7ED] via-[#F6F7ED] to-[#E8F5E9] relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#74C365]/20 to-[#DBE64C]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-[#00804c]/10 to-[#74C365]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-[#DBE64C]/15 to-[#74C365]/15 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Enhanced Sticky Navigation */}
      <header className="relative z-50 mt-20">
        <div
          className={`sticky top-0 transition-all duration-300 ${
            isScrolled
              ? "backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-lg"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-20 flex items-center justify-between">
              {/* Logo/Brand (Optional) */}
              <div className="flex items-center gap-2 md:hidden">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00804c] to-[#74C365] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-[#00804c] text-lg">
                  ECOsrot
                </span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-2 mx-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`group relative flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-[#00804c] to-[#74C365] text-white shadow-lg scale-105"
                          : "text-gray-600 hover:bg-gray-100 hover:text-[#00804c]"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isActive ? "scale-110" : "group-hover:scale-110"
                        }`}
                      />
                      <span>{item.label}</span>

                      {/* Animated underline for non-active items */}
                      {!isActive && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-full transition-all duration-300 group-hover:w-3/4" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden relative inline-flex items-center justify-center rounded-xl p-2.5 transition-all duration-300 ${
                  mobileMenuOpen
                    ? "bg-gradient-to-r from-[#00804c] to-[#74C365] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                } shadow-lg`}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`absolute inset-0 transition-all duration-300 ${
                      mobileMenuOpen
                        ? "opacity-0 rotate-90"
                        : "opacity-100 rotate-0"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 transition-all duration-300 ${
                      mobileMenuOpen
                        ? "opacity-100 rotate-0"
                        : "opacity-0 -rotate-90"
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Enhanced Mobile Menu */}
            <div
              className={`md:hidden overflow-hidden transition-all duration-300 ${
                mobileMenuOpen ? "max-h-96 mb-4" : "max-h-0"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = active === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      style={{ animationDelay: `${index * 50}ms` }}
                      className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-[#00804c] to-[#74C365] text-white font-bold"
                          : "text-gray-700 hover:bg-gray-50"
                      } ${index !== 0 ? "border-t border-gray-100" : ""}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                          isActive
                            ? "bg-white/20"
                            : "bg-gradient-to-br from-[#00804c]/10 to-[#74C365]/10"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            isActive ? "text-white" : "text-[#00804c]"
                          }`}
                        />
                      </div>
                      <span className="flex-1">{item.label}</span>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10">
        <HeroCarousel />
      </div>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Deskripsi */}
        <section
          id="deskripsi"
          ref={deskripsiRef as any}
          className="scroll-mt-28 py-20 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-full mb-6 shadow-lg">
                <FileText className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white tracking-wide">
                  Tentang Kami
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#00804c] to-[#74C365] bg-clip-text text-transparent mb-4">
                Latar Belakang
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-2xl blur opacity-25 group-hover:opacity-40 transition" />
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&q=80&auto=format&fit=crop"
                    alt="Pertumbuhan"
                    className="w-full rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2 text-lg text-gray-700 leading-relaxed space-y-4 text-justify">
                <p>
                  Perkembangan gaya hidup berkelanjutan di kalangan generasi
                  muda, khususnya Gen Z, menunjukkan meningkatnya kesadaran
                  terhadap isu lingkungan dan tanggung jawab sosial dalam
                  konsumsi produk. Banyak dari mereka kini lebih memilih produk
                  yang tidak hanya berkualitas, tetapi juga memiliki dampak
                  positif terhadap lingkungan. Namun, masih sulit bagi konsumen
                  untuk menemukan UMKM lokal yang berinovasi dalam memanfaatkan
                  atau mentransformasikan limbah menjadi produk baru.
                </p>
                <p>
                  Melihat kondisi tersebut, muncul ide untuk mengembangkan{" "}
                  <span className="font-bold text-[#00804c]">ECOsrot</span>,
                  sebuah website direktori yang berfokus pada pengumpulan dan
                  penyajian informasi tentang UMKM ramah lingkungan di
                  Indonesia. Melalui platform ini, pengguna dapat lebih mudah
                  menemukan, mengenal, dan mendukung UMKM yang aktif
                  berkontribusi dalam pengelolaan limbah serta pengurangan
                  dampak lingkungan. ECOsrot diharapkan menjadi jembatan antara
                  pelaku UMKM berkelanjutan dan konsumen yang peduli lingkungan,
                  sekaligus mendorong ekosistem bisnis hijau di tingkat lokal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Visi & Misi */}
        <section
          id="visimisi"
          ref={visimisiRef as any}
          className="scroll-mt-28"
        >
          <div
            className="mt-12 grid md:grid-cols-2 gap-6 bg-cover bg-center py-20"
            style={{ backgroundImage: "url('/images/bgvisi.png')" }}
          >
            <div></div>
            <div className="flex flex-col space-y-8 p-6 md:p-10">
              <div className="rounded-2xl p-6 md:p-8 flex justify-center">
                <div className="text-right w-full md:w-3/4">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#F6F7ED] mb-2 flex items-center justify-center gap-2">
                    Visi
                  </h3>
                  <p className="bg-[#F6F7ED] text-gray-700 p-4 rounded-lg text-left text-justify transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg">
                    Menjadi platform utama yang menghubungkan konsumen peduli
                    lingkungan dengan UMKM lokal di Indonesia, mendorong
                    ekosistem bisnis berkelanjutan.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl p-6 md:p-8 flex justify-center">
                <div className="text-right w-full md:w-3/4">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#F6F7ED] mb-3 flex items-center justify-center gap-2">
                    Misi
                  </h3>
                  <ul>
                    {[
                      "Menjembatani produk ramah lingkungan UMKM dengan konsumen.",
                      "Memudahkan pencarian dan dukungan pada produk berkelanjutan.",
                      "Menyediakan ruang edukasi terkait gaya hidup ramah lingkungan.",
                      "Mendorong kolaborasi UMKM-komunitas untuk dampak positif bersama.",
                    ].map((t, i) => (
                      <li
                        key={i}
                        className="bg-[#F6F7ED] text-gray-700 p-4 rounded-lg text-left text-justify mb-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg"
                      >
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filosofi Logo */}
        <section
          id="filosofi"
          ref={filosofiRef as any}
          className="scroll-mt-28 py-20 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-full mb-6 shadow-lg">
                <Palette className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white tracking-wide">
                  Makna Logo
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#00804c] to-[#74C365] bg-clip-text text-transparent">
                Filosofi Logo
              </h2>
            </div>

            <div className="grid md:grid-cols-[30%_70%] gap-6 items-center mb-8">
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-white rounded-2xl shadow-xl p-6 flex items-center justify-center group hover:shadow-2xl transition-all">
                  <img
                    src="/images/warna.png"
                    alt="Warna Logo"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
              </div>
              <div className="text-gray-700 leading-relaxed text-lg text-justify">
                <p>
                  Gradasi hijau melambangkan kehidupan, pertumbuhan, dan
                  keseimbangan alam, kepedulian terhadap lingkungan dapat
                  diwujudkan melalui berbagai cara dan langkah, baik besar
                  maupun kecil. Setiap tingkat warna hijau merepresentasikan
                  keragaman upaya dalam menjaga bumi, dari pengelolaan limbah
                  hingga inovasi produk berkelanjutan.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-[70%_30%] gap-6 items-center">
              <div className="text-gray-700 leading-relaxed text-lg text-justify">
                <p>
                  Elemen dedaunan pada logo melambangkan semangat hidup, harapan
                  baru, serta keterhubungan antara manusia dan alam. Dedaunan
                  juga mencerminkan bahwa setiap tindakan dan tujuan yang
                  dijalankan oleh ECOsrot selalu berorientasi pada kebaikan bumi
                  dan keberlanjutan kehidupan di dalamnya.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-white rounded-2xl shadow-xl p-6 flex items-center justify-center group hover:shadow-2xl transition-all">
                  <img
                    src="/images/daun.png"
                    alt="Daun Logo"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filosofi Nama */}
        <section id="filnama" ref={filnamaRef as any} className="scroll-mt-28">
          <div
            className="py-20 px-4 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/bgnama.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur rounded-full mb-6 shadow-lg">
                  <Type className="w-5 h-5 text-[#00804c]" />
                  <span className="text-sm font-bold text-[#00804c] tracking-wide">
                    Arti Nama
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg">
                  Filosofi Nama
                </h2>
              </div>

              <div className="space-y-6">
                <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                  <p className="text-gray-700 text-lg text-justify leading-relaxed">
                    Nama{" "}
                    <span className="font-bold text-[#00804c]">ECOsrot</span>{" "}
                    berasal dari dua kata, yaitu
                    <span className="font-bold text-[#00804c]">
                      {" "}
                      "ECO"
                    </span> dan{" "}
                    <span className="font-bold text-[#00804c]">"srot"</span>.
                    ECO diambil dari kata ekologis, yang berarti berhubungan
                    dengan ekologi, cabang ilmu yang mempelajari hubungan timbal
                    balik antara makhluk hidup dengan lingkungannya. Secara
                    luas, ecologis menggambarkan segala sesuatu yang selaras
                    dengan alam, berkelanjutan, dan tidak merusak lingkungan.
                    Srot berasal dari bahasa India (Sanskrit) yang berarti
                    sumber atau asal mula.
                  </p>
                </div>

                <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                  <p className="text-gray-700 text-lg text-justify leading-relaxed">
                    Dengan demikian, ECOsrot bermakna{" "}
                    <span className="font-bold text-[#00804c]">
                      "sumber yang ekologis"
                    </span>
                    — yaitu tempat atau wadah yang menampilkan berbagai sumber
                    daya, gagasan, dan produk yang berakar pada prinsip
                    keberlanjutan lingkungan. Filosofi ini mencerminkan tujuan
                    utama platform ECOsrot: menjadi sumber informasi dan
                    inspirasi bagi masyarakat untuk mengenal serta mendukung
                    UMKM yang mempraktikkan usaha ramah lingkungan, memanfaatkan
                    limbah secara kreatif, dan menjaga keseimbangan ekosistem
                    bumi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pendiri */}
        <section
          id="pendiri"
          ref={pendiriRef as any}
          className="scroll-mt-28 py-20 px-4"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-full mb-6 shadow-lg">
                <Users className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white tracking-wide">
                  Tim Kami
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#00804c] to-[#74C365] bg-clip-text text-transparent mb-4">
                Pendiri
              </h2>
              <p className="text-2xl md:text-3xl text-gray-600 italic font-semibold">
                "Mau Ikan Adventure"
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-3 gap-6 mb-8">
              <div className="my-auto group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-2xl blur opacity-25 group-hover:opacity-40 transition" />
                <div className="relative bg-white rounded-2xl p-7 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-[#00804c] mb-1">
                    Selena Hans
                  </h3>
                  <p className="text-gray-600 font-medium">
                    Co-Founder & Design
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-full blur opacity-30 group-hover:opacity-50 transition" />
                <div className="relative rounded-full overflow-hidden shadow-2xl ring-4 ring-white hover:ring-[#74C365] transition-all hover:scale-105">
                  <img
                    src="/images/aboutus_pendiri.jpg"
                    alt="Pendiri"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="my-auto group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-2xl blur opacity-25 group-hover:opacity-40 transition" />
                <div className="relative bg-white rounded-2xl p-7 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-[#00804c] mb-1">
                    Nico Ferrarel
                  </h3>
                  <p className="text-gray-600 font-medium">
                    Co-Founder & Production
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-2xl blur opacity-30 group-hover:opacity-50 transition" />
                <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#00804c] mb-1">
                    Aileen Joyce David
                  </h3>
                  <p className="text-gray-600 font-semibold text-lg">Founder</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
