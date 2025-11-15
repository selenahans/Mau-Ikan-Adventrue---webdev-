"use client";

import { useEffect, useState, useRef, useCallback, memo } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import "./HoverButton.css";

// Memoized HoverButton component
const HoverButton = memo(() => (
  <a href="/umkm" className="btn">
    <span>Lihat UMKM</span>
    <svg width="10px" height="20px" viewBox="0 0 13 18">
      <path d="M1,5 L11,5" />
      <polyline points="8 0 12 6 8 12" />
    </svg>
  </a>
));

HoverButton.displayName = "HoverButton";

// Memoized HoverLogo component
const HoverLogo = memo(() => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-xl mx-auto flex justify-center mt-10 rounded-2xl relative"
    >
      <div className="absolute inset-0 rounded-4xl bg-[#F6F7ED] blur-3xl mt-20 max-h-35 hover:scale-120 transition-all" />
      <img
        src={isHovered ? "/images/gifdoangfix.gif" : "/images/logointro.png"}
        alt="Logo"
        className="w-full h-auto object-contain transition-opacity duration-300 z-10"
        loading="lazy"
      />
    </div>
  );
});

HoverLogo.displayName = "HoverLogo";

// Memoized Tagline component
const Tagline = memo(() => (
  <div className="w-full max-w-2xl mx-auto flex justify-center mt-10 rounded-2xl relative">
    <div className="absolute inset-0 rounded-2xl bg-[#F6F7ED] blur-xl hover:scale-120 transition-all" />
    <p className="text-3xl font-bold font-['Helvetica'] relative z-10 p-6 group-hover:scale-105 transition-transform">
      <span className="bg-gradient-to-br from-[#00804c] to-[#1E488F] bg-clip-text text-transparent">
        The Source of ECO-friendly Solutions,
      </span>
    </p>
  </div>
));

Tagline.displayName = "Tagline";

// Memoized Description component
const Description = memo(() => (
  <div className="w-full flex justify-center mt-10">
    <p className="bg-[#F6F7ED] max-w-4xl p-6 rounded-2xl text-2xl text-[#00804c] text-center">
      Menjadi wadah bagi pelaku UMKM ramah lingkungan untuk memperkenalkan
      produk dan usahanya kepada masyarakat luas. Menampilkan beragam bisnis
      yang mengusung prinsip sustainability.
    </p>
  </div>
));

Description.displayName = "Description";

export default function TentangKami() {
  const parallaxRef = useRef<any>(null);

  // Auto-scroll effect dengan cleanup yang lebih baik
  useEffect(() => {
    let position = 0;
    let paused = false;
    let timeoutId: NodeJS.Timeout;

    const interval = setInterval(() => {
      if (!parallaxRef.current || paused) return;

      if (position === 0) {
        position = 0.6;
        parallaxRef.current.scrollTo(position);
      } else if (position === 0.6) {
        paused = true;
        timeoutId = setTimeout(() => {
          paused = false;
          position = 1.1;
          parallaxRef.current?.scrollTo(position);
        }, 2000);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Parallax pages={2} ref={parallaxRef}>
      {/* Button Layer */}
      <ParallaxLayer
        offset={1.3}
        speed={0.3}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          pointerEvents: "auto",
        }}
      >
        <HoverButton />
      </ParallaxLayer>

      {/* Video Background */}
      <ParallaxLayer
        offset={0}
        speed={1}
        factor={2}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <video
          src="/videos/langit_ges.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-120"
          preload="auto"
        />
      </ParallaxLayer>

      {/* Mountain Background 1 */}
      <ParallaxLayer
        offset={0}
        speed={0.1}
        factor={4}
        style={{
          backgroundImage: "url(/images/gunung_flipped_new.png)",
          backgroundPosition: "center 250px",
          backgroundSize: "110%",
          backgroundRepeat: "no-repeat",
          pointerEvents: "none",
          height: "100%",
        }}
      />

      {/* Mountain Background 2 */}
      <ParallaxLayer
        offset={0}
        speed={0.5}
        factor={4}
        style={{
          backgroundImage: "url(/images/gunung_sj_new.png)",
          backgroundPosition: "center 350px",
          backgroundSize: "130%",
          backgroundRepeat: "no-repeat",
          pointerEvents: "none",
        }}
      />

      {/* Tagline */}
      <ParallaxLayer offset={0.4} speed={0.2}>
        <Tagline />
      </ParallaxLayer>

      {/* Logo */}
      <ParallaxLayer
        offset={0.6}
        speed={0.8}
        sticky={{ start: 0.6, end: 0.8 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "auto",
          background: "transparent",
        }}
      >
        <HoverLogo />
      </ParallaxLayer>

      {/* Description */}
      <ParallaxLayer offset={1.4} speed={0.2}>
        <Description />
      </ParallaxLayer>
    </Parallax>
  );
}
