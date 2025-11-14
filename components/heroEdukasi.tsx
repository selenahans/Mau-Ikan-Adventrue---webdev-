"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function HeroCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Your slide grouping (2 UMKM items per slide)
  const groupedSlides = [
    [1, 2], // slide 1
    [3, 4], // slide 2 (if needed add more)
    [5, 6], // slide 3
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
      <div ref={scrollRef} className="relative mt-6 flex overflow-hidden w-full">
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
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-4">
              {slideItems.map((i) => (
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
