"use client";

import { useEffect, useState } from "react";
import { Variants, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";

export default function TentangKami() {
  const [section, setSection] = useState(1);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("down");
  const router = useRouter();

  // deteksi arah scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScrollDir = () => {
      const newY = window.scrollY;
      if (newY > lastScrollY) setScrollDir("down");
      else if (newY < lastScrollY) setScrollDir("up");
      lastScrollY = newY > 0 ? newY : 0;
    };
    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  // deteksi posisi section aktif
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      if (scrollY < height * 0.8) setSection(1);
      else if (scrollY < height * 1.8) setSection(2);
      else if (scrollY < height * 2.8) setSection(3);
      else setSection(4);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // pindah ke /umkm hanya setelah section ke-4 tersentuh bawah
  useEffect(() => {
    const handleBottomScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY + height >= docHeight - 500) {
        router.push("/umkm");
      }
    };

    window.addEventListener("scroll", handleBottomScroll);
    return () => window.removeEventListener("scroll", handleBottomScroll);
  }, [router]);

  const bgPosition =
    section === 1 ? "top" : section === 2 ? "center" : "bottom";

  return (
    <div
      className="relative w-full text-white transition-all duration-700 ease-in-out"
      style={{
        backgroundImage: "url('/images/about-us.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: bgPosition,
      }}
    >
      <div className="relative z-10 flex flex-col">
        {/* Section 1 */}
        <FadeSection index={1} direction={scrollDir}>
          <img
            src="/images/about1.png"
            alt="About Ecosrot"
            className="mx-auto"
          />
        </FadeSection>

        {/* Section 2 */}
        <FadeSection index={2} direction={scrollDir}>
          <img
            src="/images/about2.png"
            alt="Ecosrot Vision"
            className="max-w-lg mx-auto"
          />
        </FadeSection>

        {/* Section 3 */}
        <FadeSection index={3} direction={scrollDir}>
          <img
            src="/images/about2.png"
            alt="Ecosrot Mission"
            className="max-w-lg mx-auto"
          />
          <p className="text-2xl leading-relaxed max-w-3xl mx-auto mt-6">
            Menjadi wadah bagi pelaku UMKM ramah lingkungan untuk memperkenalkan
            produk dan usahanya kepada masyarakat luas.
          </p>
        </FadeSection>

        {/* 🟢 Section 4 — penutup kecil */}
        <FadeSection index={4} direction={scrollDir}>
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold mb-4">
              Siap mengenal pelaku UMKM kami?
            </p>
            <p className="text-lg text-white/80">
              Gulir sedikit lagi untuk melanjutkan ke halaman UMKM →
            </p>
          </div>
        </FadeSection>
      </div>
    </div>
  );
}

/* 🎞️ Komponen Section dengan animasi dua arah */
function FadeSection({
  children,
  index,
  direction,
}: {
  children: React.ReactNode;
  index: number;
  direction: "up" | "down";
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.4 });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("exit");
  }, [inView, controls]);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "down" ? 80 : -80,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: direction === "down" ? -80 : 80,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="flex flex-col items-center justify-center text-center h-screen px-6"
      style={{ minHeight: "100vh" }}
    >
      {children}
    </motion.section>
  );
}
