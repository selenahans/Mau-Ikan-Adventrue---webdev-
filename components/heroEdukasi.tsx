"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function HeroCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Your slide grouping (2 UMKM items per slide)
  const groupedSlides = [
    [1], // slide 1
    [2], // slide 2 (if needed add more)
    [3],
    [4] // slide 3
  ];

  const umkmData = [
    {
      judul:
        "Dauroma, Parfum Ramah Lingkungan dari Limbah Kulit Buah Karya Mahasiswa Surabaya",
      foto: "https://asset.kompas.com/crops/Gk9kNFeeTLjIE6mQooIa_sdWtVY=/0x122:4086x2846/1200x800/data/photo/2025/09/19/68ccf7fa0ef95.jpg",
      tanggal: "19 September 2025",
      sumber:
        "https://surabaya.kompas.com/read/2025/09/19/150516078/dauroma-parfum-ramah-lingkungan-dari-limbah-kulit-buah-karya-mahasiswa?page=all",
    },
    {
      judul:
        "EANK Solo, UMKM Inovatif Asal Solo, Sulap Limbah PVC Jadi Sangkar Burung dan Akuarium Berkualitas Ekspor ke Asia Tenggara",
      foto: "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/84/2025/10/08/BRI-SANGKAR-2915072270.jpeg",
      tanggal: "8 Oktober 2025",
      sumber:
        "https://radarsolo.jawapos.com/ekonomi/846676181/eank-solo-umkm-inovatif-asal-solo-sulap-limbah-pvc-jadi-sangkar-burung-dan-akuarium-berkualitas-ekspor-ke-asia-tenggara",
    },
    {
      judul:
        "C-Pop Watch: Jam Tangan Daur Ulang Mahasiswa ITS, Gaya Sekaligus Selamatkan Lingkungan",
      foto: "https://klikku.id/wp-content/uploads/2025/10/IMG_20251016_155925-750x420.jpg",
      tanggal: "16 Oktober 2025",
      sumber:
        "https://klikku.id/2025/10/16/c-pop-watch-jam-tangan-daur-ulang-mahasiswa-its-gaya-sekaligus-selamatkan-lingkungan/",
    },
    {
      judul: "Kreskros, Sulap Plastik Kresek Jadi Kerajinan Bernilai Tinggi",
      foto: "https://humas.jatengprov.go.id/foto/1558805370576-IMG-20190525-WA0048_detail.png",
      tanggal: "25 May 2019",
      sumber: "https://humas.jatengprov.go.id/detail_berita_gubernur?id=2775",
    },
  ];

  const totalSlides = groupedSlides.length;

  const scrollToSlide = (slide: number) => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({
      left: slide * width,
      behavior: "smooth",
    });
  };

  const next = () => {
    if (activeSlide < totalSlides - 1) {
      scrollToSlide(activeSlide + 1);
      setActiveSlide(activeSlide + 1);
    }
  };

  const prev = () => {
    if (activeSlide > 0) {
      scrollToSlide(activeSlide - 1);
      setActiveSlide(activeSlide - 1);
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto text-center select-none">
      {/* CAROUSEL */}
      <div
        ref={scrollRef}
        className="relative mt-6 flex overflow-hidden w-full"
      >
        {groupedSlides.map((slideItems, slideIndex) => (
          <div
            key={slideIndex}
            className="relative flex justify-center w-full shrink-0 px-6"
          >
            {/* Left Arrow */}
            {slideIndex === activeSlide && activeSlide > 0 && (
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30
                h-10 w-10 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]
                border border-gray-200 flex items-center justify-center"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  stroke="#00804c"
                  strokeWidth="2.5"
                  fill="none"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            {/* Right Arrow */}
            {slideIndex === activeSlide && activeSlide < totalSlides - 1 && (
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30
                h-10 w-10 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]
                border border-gray-200 flex items-center justify-center"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  stroke="#00804c"
                  strokeWidth="2.5"
                  fill="none"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            )}

            {/* Slide Content — REPLACED with your UMKM layout */}
            <div className="max-w-5xl items-center mx-auto gap-10 px-4">
              {slideItems.map((i) => (
                <div
                  key={i}
                  className="bg-white grid mt-6 md:grid-cols-2 rounded-xl p-6 overflow-hidden shadow transition-all duration-300 hover:shadow-lg hover:scale-105"
                  onClick={() => window.open(umkmData[i - 1].sumber, "_blank")}
                >
                  <Image
                    src={umkmData[i - 1].foto}
                    width={800}
                    height={500}
                    alt="umkm"
                    className="w-full rounded-lg"
                  />
                  <div className="p-6 text-left">
                    <h3 className="font-semibold text-lg text-[#00804c]">
                      {umkmData[i - 1].judul}
                    </h3>
                    <p className="text-gray-600 text-sm mt-3">
                      {umkmData[i - 1].tanggal}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="mt-4 flex justify-center gap-3">
        {groupedSlides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSlide === i
                ? "bg-[#00804c] scale-125"
                : "bg-gray-300 opacity-60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
