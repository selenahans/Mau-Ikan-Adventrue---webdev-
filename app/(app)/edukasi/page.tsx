"use client";

import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Lightbulb,
  Store,
  BookOpen,
  Users,
  Leaf,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import HeroCarousel from "@/components/heroEdukasi";

type TabKey = "inspirasi" | "umkm" | "panduan" | "komunitas";

const navItems = [
  { id: "inspirasi" as TabKey, label: "Inspirasi Hijau", icon: Lightbulb },
  { id: "umkm" as TabKey, label: "Cerita UMKM", icon: Store },
  { id: "panduan" as TabKey, label: "Tips & Panduan", icon: BookOpen },
  { id: "komunitas" as TabKey, label: "Komunitas", icon: Users },
];

const mentorImages = [
  "https://images.pexels.com/photos/3119215/pexels-photo-3119215.jpeg",
  "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg",
  "https://images.pexels.com/photos/25047761/pexels-photo-25047761.jpeg",
];

const mentorData = [
  {
    name: "Dr. Sarah Green",
    role: "Environmental Activist",
    description:
      "Pelopor gerakan zero waste di Indonesia dengan pengalaman 15 tahun",
  },
  {
    name: "Ahmad Syarif",
    role: "Sustainable Business Coach",
    description:
      "Membantu 100+ UMKM bertransformasi menjadi bisnis ramah lingkungan",
  },
  {
    name: "Lisa Wijaya",
    role: "Eco-Innovation Expert",
    description:
      "Spesialis dalam inovasi produk berkelanjutan dan circular economy",
  },
];

const greenTips = [
  {
    title: "Gunakan Bahan Baku Ramah Lingkungan",
    desc: "Pilih material yang dapat terurai secara alami atau berasal dari sumber berkelanjutan",
  },
  {
    title: "Kurangi Penggunaan Plastik Sekali Pakai",
    desc: "Beralih ke kemasan yang dapat digunakan ulang atau biodegradable",
  },
  {
    title: "Terapkan Sistem Produksi Hemat Energi",
    desc: "Optimalkan penggunaan energi dengan teknologi efisien dan renewable energy",
  },
  {
    title: "Kelola Limbah Secara Bertanggung Jawab",
    desc: "Implementasikan sistem daur ulang dan pengolahan limbah yang tepat",
  },
  {
    title: "Digitalisasi Dokumen dan Promosi",
    desc: "Minimalkan penggunaan kertas dengan beralih ke sistem digital",
  },
  {
    title: "Bangun Budaya Kerja Ramah Lingkungan",
    desc: "Edukasi tim tentang pentingnya praktik berkelanjutan dalam operasional",
  },
  {
    title: "Sediakan Produk Refill atau Kemasan Isi Ulang",
    desc: "Tawarkan opsi refill untuk mengurangi waste dari kemasan",
  },
  {
    title: "Pilih Supplier yang Berkomitmen pada Lingkungan",
    desc: "Jalin kerjasama dengan supplier yang memiliki nilai keberlanjutan sama",
  },
  {
    title: "Edukasi Konsumen tentang Dampak Positif",
    desc: "Komunikasikan manfaat praktik hijau kepada konsumen secara konsisten",
  },
];

export default function EdukasiPage() {
  const [active, setActive] = useState<TabKey>("inspirasi");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const inspirasiRef = useRef<HTMLElement | null>(null);
  const umkmRef = useRef<HTMLElement | null>(null);
  const panduanRef = useRef<HTMLElement | null>(null);
  const komunitasRef = useRef<HTMLElement | null>(null);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Observe sections
  useEffect(() => {
    const sections: Array<[TabKey, HTMLElement | null]> = [
      ["inspirasi", inspirasiRef.current],
      ["umkm", umkmRef.current],
      ["panduan", panduanRef.current],
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F7ED] via-[#F6F7ED] to-[#E8F5E9]">
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
              {/* Logo for mobile */}
              <div className="flex items-center gap-2 md:hidden">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00804c] to-[#74C365] flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-[#00804c] text-lg">
                  Edukasi
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

            {/* Mobile Menu */}
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-full shadow-lg">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
              <span className="text-sm font-bold text-white tracking-wide">
                Platform Edukasi Berkelanjutan
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-[#00804c] to-[#74C365] bg-clip-text text-transparent">
                Learn, Grow,
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#74C365] to-[#DBE64C] bg-clip-text text-transparent">
                Be Green
              </span>
            </h1>

            <p className="text-xl text-gray-700 leading-relaxed">
              Temukan inspirasi, tips, dan panduan praktis untuk membangun
              bisnis yang berkelanjutan dan ramah lingkungan
            </p>

            <div className="relative w-64 h-64">
              <img
                src="/images/gifhlmbgs.gif"
                alt="ECOsrot"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-2xl blur opacity-25 group-hover:opacity-40 transition" />
                <img
                  src="/images/edu1.png"
                  alt="Edu 1"
                  className="relative w-full rounded-2xl transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#74C365] to-[#DBE64C] rounded-2xl blur opacity-25 group-hover:opacity-40 transition" />
                <img
                  src="/images/edu2.png"
                  alt="Edu 2"
                  className="relative w-full rounded-2xl transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#DBE64C] to-[#74C365] rounded-2xl blur opacity-25 group-hover:opacity-40 transition" />
                <img
                  src="/images/edu3.png"
                  alt="Edu 3"
                  className="relative w-full rounded-2xl transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inspirasi Hijau Section */}
      <section
        id="inspirasi"
        ref={inspirasiRef}
        className="scroll-mt-28 relative z-10"
      >
        <div
          className="bg-cover bg-center py-20"
          style={{ backgroundImage: "url('/images/bgrumput.png')" }}
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur rounded-full mb-6 shadow-lg">
              <Lightbulb className="w-5 h-5 text-[#00804c]" />
              <span className="text-sm font-bold text-[#00804c] tracking-wide">
                Tokoh Inspiratif
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg">
              Inspirasi Hijau
            </h2>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 px-6">
            {mentorImages.map((img, i) => (
              <div
                key={i}
                className="group relative"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative">
                  {/* Image Container */}
                  <div className="relative w-full aspect-square">
                    <div className="absolute -inset-2 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-full blur opacity-30 group-hover:opacity-50 transition" />
                    <Image
                      src={img}
                      width={300}
                      height={300}
                      alt={mentorData[i].name}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Hover Card */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gradient-to-br from-[#00804c] to-[#74C365] rounded-full w-[90%] h-[90%] flex flex-col items-center justify-center p-8 text-center shadow-2xl">
                      <h3 className="text-white text-2xl font-bold mb-2">
                        {mentorData[i].name}
                      </h3>
                      <p className="text-white/90 text-sm font-semibold mb-3">
                        {mentorData[i].role}
                      </p>
                      <p className="text-white/80 text-xs leading-relaxed">
                        {mentorData[i].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Card Below */}
                <div className="mt-6 bg-white rounded-2xl p-6 shadow-xl group-hover:shadow-2xl transition-all">
                  <h3 className="text-xl font-bold text-[#00804c] mb-1">
                    {mentorData[i].name}
                  </h3>
                  <p className="text-gray-600 text-sm">{mentorData[i].role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cerita UMKM Section */}
      <section
        id="umkm"
        ref={umkmRef}
        className="scroll-mt-28 py-20 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-full mb-6 shadow-lg">
              <Store className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white tracking-wide">
                Success Stories
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-[#00804c] to-[#74C365] bg-clip-text text-transparent">
              Cerita UMKM
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Kisah inspiratif dari pelaku UMKM yang berhasil menerapkan praktik
              berkelanjutan
            </p>
          </div>

          <HeroCarousel />
        </div>
      </section>

      {/* Tips & Panduan Section */}
      <section
        id="panduan"
        ref={panduanRef}
        className="scroll-mt-28 py-20 relative z-10"
        style={{
          backgroundImage: "url('/images/bgtips.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur rounded-full mb-6 shadow-lg">
              <BookOpen className="w-5 h-5 text-[#00804c]" />
              <span className="text-sm font-bold text-[#00804c] tracking-wide">
                Panduan Praktis
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg mb-4">
              Tips Ramah Lingkungan
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
              Panduan lengkap untuk menjalankan bisnis yang berkelanjutan dan
              ramah lingkungan
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {greenTips.map((tip, i) => (
              <div
                key={i}
                className="group relative"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-2xl blur opacity-25 group-hover:opacity-40 transition" />
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`/images/tips/${i + 1}.png`}
                      width={800}
                      height={500}
                      alt={tip.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#00804c] to-[#74C365] flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <CheckCircle2 className="w-6 h-6 text-[#00804c] flex-shrink-0 mt-1" />
                      <h3 className="text-lg font-bold text-[#00804c] leading-tight">
                        {tip.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {tip.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Komunitas Section */}
      <section
        id="komunitas"
        ref={komunitasRef}
        className="scroll-mt-28 py-24 relative z-10"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-3xl blur opacity-25 group-hover:opacity-40 transition" />
            <div className="relative bg-white rounded-3xl p-12 md:p-16 text-center shadow-2xl border-2 border-white">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-full mb-8 shadow-lg">
                <Users className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white tracking-wide">
                  Join Us
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#00804c] to-[#74C365] bg-clip-text text-transparent mb-6">
                Komunitas Hijau
              </h2>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                Bergabung dengan ribuan pelaku bisnis dan aktivis lingkungan
                untuk berbagi ide, pengalaman, dan menciptakan dampak nyata
                bersama-sama
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group/btn px-8 py-4 bg-gradient-to-r from-[#00804c] to-[#74C365] hover:from-[#74C365] hover:to-[#00804c] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                  Gabung Sekarang
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white border-2 border-[#00804c] text-[#00804c] hover:bg-[#00804c] hover:text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  Pelajari Lebih Lanjut
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200">
                <div>
                  <p className="text-4xl font-black bg-gradient-to-r from-[#00804c] to-[#74C365] bg-clip-text text-transparent mb-2">
                    5K+
                  </p>
                  <p className="text-gray-600 font-semibold">Anggota Aktif</p>
                </div>
                <div>
                  <p className="text-4xl font-black bg-gradient-to-r from-[#00804c] to-[#74C365] bg-clip-text text-transparent mb-2">
                    100+
                  </p>
                  <p className="text-gray-600 font-semibold">Event Bulanan</p>
                </div>
                <div>
                  <p className="text-4xl font-black bg-gradient-to-r from-[#00804c] to-[#74C365] bg-clip-text text-transparent mb-2">
                    50+
                  </p>
                  <p className="text-gray-600 font-semibold">Kota</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
