"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const groupedImages = [
    [
      "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg",
      "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg",
    ],
    [
      "https://images.pexels.com/photos/1158783/pexels-photo-1158783.jpeg",
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    ],
    [
      "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg",
      "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg",
    ],
  ];

  const totalSlides = groupedImages.length;

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
      {/* GIF HERO */}
      <div className="flex justify-center">
        <img src="/images/gifhlmbgs.gif" className="w-1/2 scale-75" />
      </div>

      {/* CAROUSEL */}
      <div
        ref={scrollRef}
        className="relative mt-6 flex overflow-hidden w-full"
      >
        {groupedImages.map((pair, slideIndex) => (
          <div
            key={slideIndex}
            className="relative flex justify-center gap-6 w-full shrink-0 px-6"
          >
            {/* Panah kiri — ditempel ke wrapper */}
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

            {/* Panah kanan — ditempel ke wrapper */}
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

            {/* 2 gambar */}
            {pair.map((img, i) => (
              <figure
                key={i}
                className="relative overflow-hidden rounded-3xl bg-white border border-white/60 shadow-md h-64 w-1/2"
              >
                <img src={img} className="w-full h-full object-cover" />
              </figure>
            ))}
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="mt-4 flex justify-center gap-3">
        {groupedImages.map((_, i) => (
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
