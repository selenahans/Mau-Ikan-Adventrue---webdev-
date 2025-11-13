"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, Leaf, Sparkles } from "lucide-react";

type TabKey =
  | "deskripsi"
  | "visimisi"
  | "visi-misi"
  | "filosofi"
  | "filnama"
  | "pendiri";

export default function ECOsrotLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<TabKey>("deskripsi");

  const deskripsiRef = useRef<HTMLElement | null>(null);
  const filosofiRef = useRef<HTMLElement | null>(null);
  const pendiriRef = useRef<HTMLElement | null>(null);
  const visimisiRef = useRef<HTMLElement | null>(null);
  const filnamaRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sections: Array<[TabKey, HTMLElement | null]> = [
      ["deskripsi", deskripsiRef.current],
      ["visimisi", visimisiRef.current],
      ["filosofi", filosofiRef.current],
      ["pendiri", pendiriRef.current],
      ["filnama", filnamaRef.current],
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

  const linkCls = (key: TabKey) =>
    [
      "relative px-4 py-2 rounded-xl font-medium transition-colors",
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

  const scrollTo = (id: TabKey) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const HoverLogo = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "50%",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url(/images/aboutblur.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "105%",
          backgroundPosition: "center",
        }}
      >
        <img
          src={isHovered ? "/images/gifhlmbgs.gif" : "/images/logohlm.png"}
          style={{
            width: "70%",
            height: "auto",
            objectFit: "contain",
            transition: "opacity 0.3s ease",
            backgroundSize: "cover",
          }}
        />
      </div>
    );
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

      {/* ======= Sub-Nav ======= */}
      <header className="mt-30">
        <div className="sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center justify-center">
              <nav className="hidden md:flex items-center gap-6 backdrop-blur-lg rounded-2xl px-4 py-2">
                <button
                  onClick={() => scrollTo("deskripsi")}
                  className={linkCls("deskripsi")}
                >
                  Deskripsi
                  {underline("deskripsi")}
                </button>
                <button
                  onClick={() => scrollTo("visi-misi")}
                  className={linkCls("visimisi")}
                >
                  Visi & Misi
                  {underline("visimisi")}
                </button>
                <button
                  onClick={() => scrollTo("filosofi")}
                  className={linkCls("filosofi")}
                >
                  Filosofi Logo
                  {underline("filosofi")}
                </button>
                <button
                  onClick={() => scrollTo("filnama")}
                  className={linkCls("filnama")}
                >
                  Filosofi Nama
                  {underline("filnama")}
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
                className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/80 backdrop-blur-lg shadow-sm px-3 py-2 text-gray-400"
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
                  ["visi-misi", "Visi & Misi"],
                  ["filosofi", "Filosofi Logo"],
                  ["pendiri", "Pendiri"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => scrollTo(key as TabKey)}
                    className={`w-full text-center px-4 py-3 ${
                      active === key
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
        </div>
      </header>

      {/* ======= Hero ======= */}
      <div className="relative max-w-7xl mx-auto text-center">
        <div className="flex justify-center">
          <img
            src="/images/gifhlmbgs.gif"
            alt="Hero"
            className="w-1/2 scale-75"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[
            "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg",
            "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg",
            "https://images.pexels.com/photos/1158783/pexels-photo-1158783.jpeg",
          ].map((img, idx) => (
            <figure
              key={idx}
              className="group relative overflow-hidden rounded-3xl bg-white border border-white/60 shadow-md h-64 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg"
            >
              <img
                src={img}
                alt={`Hero ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 "
              />
              <figcaption className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity " />
            </figure>
          ))}
        </div>
      </div>

      {/* ======= Deskripsi ======= */}
      <section
        id="deskripsi"
        ref={deskripsiRef as any}
        className="scroll-mt-28 py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-sm rounded-3xl ">
            <h2 className="text-3xl md:text-5xl font-bold text-[#00804c] text-center mb-10">
              Latar Belakang
            </h2>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <img
                  src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&q=80&auto=format&fit=crop"
                  alt="Pertumbuhan"
                  className="w-full rounded-2xl shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                />
              </div>
              <div className="text-lg order-1 md:order-2 text-gray-900 leading-relaxed space-y-4 text-justify">
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
                  <span className="font-semibold text-[#74C365]">ECOsrot</span>,
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
        </div>
      </section>

      {/* ======= Visi & Misi ======= */}
      <section id="visi-misi" ref={visimisiRef as any}>
        <div
          className="mt-12 grid md:grid-cols-2 gap-6 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bgvisi.png')" }}
        >
          {/* Empty left side */}
          <div></div>

          {/* Right side: stacked Visi and Misi */}
          <div className="flex flex-col space-y-8 p-6 md:p-10">
            <div className="rounded-2xl p-6 md:p-8 flex justify-center">
              <div className="text-right w-full md:w-3/4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#F6F7ED] mb-2 flex items-center justify-center gap-2">
                  Visi
                </h3>
                <p
                  className="bg-[#F6F7ED] text-gray-700 p-4 rounded-lg text-left text-justify 
  transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg"
                >
                  Menjadi platform utama yang menghubungkan konsumen peduli
                  lingkungan dengan UMKM lokal di Indonesia, mendorong ekosistem
                  bisnis berkelanjutan.
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
                      className="bg-[#F6F7ED] text-gray-700 p-4 rounded-lg text-left text-justify mb-3
  transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg"
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

      {/* ======= Filosofi Logo ======= */}
      <section
        id="filosofilogo"
        ref={filosofiRef as any}
        className="scroll-mt-28 py-12 px-4 bg-[#F6F7ED]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="">
            <h2 className="text-3xl md:text-5xl font-bold text-[#00804c] text-center">
              Filosofi Logo
            </h2>
            {/* <img src="/images/logo2.png" className="scale-20 mx-auto -mt-4" /> */}

            <div className="grid md:grid-cols-[30%_70%] gap-1 items-center mt-2">
              <div className="rounded-2xl p-3 text-center">
                <div className="w-40 h-40 md:w-48 md:h-48 mx-auto rounded-2xl overflow-hidden flex items-center justify-center">
                  <img
                    src="/images/warna.png"
                    alt="Warna Logo ECOsrot"
                    className="w-full h-full object-contain transition-all duration-300 hover:-translate-y-1"
                  />
                </div>
              </div>
              <div className="text-gray-800 leading-relaxed space-y-2 text-lg text-justify">
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
            <div className="grid md:grid-cols-[70%_30%] gap-1 items-center mt-2">
              <div className="text-gray-800 leading-relaxed space-y-2 text-lg ml-2">
                <p className="text-justify">
                  Elemen dedaunan pada logo melambangkan semangat hidup, harapan
                  baru, serta keterhubungan antara manusia dan alam. Dedaunan
                  juga mencerminkan bahwa setiap tindakan dan tujuan yang
                  dijalankan oleh ECOsrot selalu berorientasi pada kebaikan bumi
                  dan keberlanjutan kehidupan di dalamnya.
                </p>
              </div>
              <div className="rounded-2xl p-3 text-center">
                <div className="w-40 h-40 md:w-48 md:h-48 mx-auto rounded-2xl overflow-hidden flex items-center justify-center">
                  <img
                    src="/images/daun.png"
                    alt="Daun Logo ECOsrot"
                    className="w-full h-full object-contain transition-all duration-300 hover:-translate-y-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="filnama" ref={filnamaRef as any} className="scroll-mt-28">
        <div
          className="mt-10 mb-10 min-h-screen flex flex-col justify-center bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/bgnama.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#F6F7ED] text-center pt-10 pb-5 mb-4">
            Filosofi Nama
          </h3>

          <div className="space-y-4 text-gray-800 bg-[#F6F7ED] rounded-2xl p-4 max-w-5xl mx-auto text-justify transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg">
            <p>
              Nama <span className="font-bold text-[#00804c]"> ECOsrot </span>{" "}
              berasal dari dua kata, yaitu
              <span className="font-bold text-[#00804c]"> “ECO”</span>
              <span> dan </span>
              <span className="font-bold text-[#00804c]">“srot”</span>. ECO
              diambil dari kata ekologis, yang berarti berhubungan dengan
              ekologi, cabang ilmu yang mempelajari hubungan timbal balik antara
              makhluk hidup dengan lingkungannya. Secara luas, ecologis
              menggambarkan segala sesuatu yang selaras dengan alam,
              berkelanjutan, dan tidak merusak lingkungan. Srot berasal dari
              bahasa India (Sanskrit) yang berarti sumber atau asal mula.
            </p>
          </div>

          <div className="space-y-4 text-gray-800 bg-[#F6F7ED] rounded-2xl p-4 max-w-5xl text-justify mx-auto mt-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg">
            <p>
              Dengan demikian, ECOsrot bermakna{" "}
              <span className="font-bold text-[#00804c]">
                “sumber yang ekologis”
              </span>
              — yaitu tempat atau wadah yang menampilkan berbagai sumber daya,
              gagasan, dan produk yang berakar pada prinsip keberlanjutan
              lingkungan. Filosofi ini mencerminkan tujuan utama platform
              ECOsrot: menjadi sumber informasi dan inspirasi bagi masyarakat
              untuk mengenal serta mendukung UMKM yang mempraktikkan usaha ramah
              lingkungan, memanfaatkan limbah secara kreatif, dan menjaga
              keseimbangan ekosistem bumi.
            </p>
          </div>
        </div>
      </section>

      {/* ======= Pendiri ======= */}
      <section
        id="pendiri"
        ref={pendiriRef as any}
        className="scroll-mt-10 py-5 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className=" rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-[#00804c]">
              Pendiri
            </h2>
            <p className="text-xl md:text-2xl text-[#00804c] italic font-semibold mt-2">
              “Mau Ikan Adventure”
            </p>

            {/* Card */}
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mt-10">
              <div className="my-auto inline-block bg-[#74C365] backdrop-blur-sm rounded-2xl p-7 transition-all duration-300 hover:shadow-lg hover:scale-102">
                <h3 className="text-xl md:text-2xl font-bold text-[#F6F7ED]">
                  Selena Hans
                </h3>
                <p className="text-[#00804c]">Co-Founder & Design</p>
              </div>
              <div className="mt-10 mb-5 relative rounded-full overflow-hidden shadow ring-50 ring-[#74C365] transition-all duration-300 hover:shadow-lg hover:scale-102">
                <img
                  src="/images/aboutus_pendiri.jpg"
                  alt="Pendiri 1"
                  className=""
                />
              </div>
              <div className="my-auto inline-block bg-[#74C365] backdrop-blur-sm rounded-2xl p-7 transition-all duration-300 hover:shadow-lg hover:scale-102">
                <h3 className="text-xl md:text-2xl font-bold text-[#F6F7ED]">
                  Nico Ferrarel
                </h3>
                <p className="text-[#00804c]">Co-Founder & Production</p>
              </div>
            </div>
              <div className="inline-block bg-[#74C365] backdrop-blur-sm rounded-2xl p-7 transition-all duration-300 hover:shadow-lg hover:scale-102">
                <h3 className="text-xl md:text-2xl font-bold text-[#F6F7ED]">
                  Aileen Joyce David
                </h3>
                <p className="text-[#00804c]">Founder</p>
              </div>
            </div>
          </div>
      </section>

      {/* ======= Footer ======= */}
      <footer className="bg-[#00804c] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf className="w-7 h-7 color-[#F6F7ED]" />
            <span className="text-2xl font-bold tracking-tight text-[#F6F7ED]">
              ECOsrot
            </span>
          </div>
          <p className="text-emerald-200">
            Platform UMKM Ramah Lingkungan Indonesia
          </p>
          <p className="text-emerald-300 text-sm mt-1">
            © 2025 ECOsrot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
