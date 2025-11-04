"use client";

import { useEffect, useState, useRef } from "react";
import { Variants, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import "./HoverButton.css";

export default function TentangKami() {
  const [section, setSection] = useState(1);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("down");
  const router = useRouter();
  const ref = useRef<any>(null);

  // // deteksi arah scroll
  // useEffect(() => {
  //   let lastScrollY = window.scrollY;
  //   const updateScrollDir = () => {
  //     const newY = window.scrollY;
  //     if (newY > lastScrollY) setScrollDir("down");
  //     else if (newY < lastScrollY) setScrollDir("up");
  //     lastScrollY = newY > 0 ? newY : 0;
  //   };
  //   window.addEventListener("scroll", updateScrollDir);
  //   return () => window.removeEventListener("scroll", updateScrollDir);
  // }, []);

  // // deteksi posisi section aktif
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY;
  //     const height = window.innerHeight;
  //     if (scrollY < height * 0.8) setSection(1);
  //     else if (scrollY < height * 1.8) setSection(2);
  //     else if (scrollY < height * 2.8) setSection(3);
  //     else setSection(4);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // // pindah ke /umkm hanya setelah section ke-4 tersentuh bawah
  // useEffect(() => {
  //   const handleBottomScroll = () => {
  //     const scrollY = window.scrollY;
  //     const height = window.innerHeight;
  //     const docHeight = document.documentElement.scrollHeight;

  //     if (scrollY + height >= docHeight - 500) {
  //       router.push("/umkm");
  //     }
  //   };

  //   window.addEventListener("scroll", handleBottomScroll);
  //   return () => window.removeEventListener("scroll", handleBottomScroll);
  // }, [router]);

  // const bgPosition =
  //   section === 1 ? "top" : section === 2 ? "center" : "bottom";

  const HoverButton = () => {
    return (
      <a href="/umkm" className="btn">
        <span>Lihat UMKM</span>
        <svg width="10px" height="20px" viewBox="0 0 13 18">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 0 12 6 8 12" />
        </svg>
      </a>
    );
  };

  useEffect(() => {
    let position = 0;
    let paused = false;
    const interval = setInterval(() => {
      if (!ref.current || paused) return;
      if (position === 0) {
        position += 0.5;
        ref.current.scrollTo(position);
      }
      if (position === 0.5) {
        paused = true;
        setTimeout(() => {
          paused = false;
          position += 0.5;
          ref.current.scrollTo(position);
        }, 2000); // delay 1s
      }
      // if (position > 2) position = 0; // loop back
    }, 1000); // scroll interval
    return () => clearInterval(interval);
  }, []);

  const [isHovered, setIsHovered] = useState(false);

  const HoverLogo = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "40%",
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
          src={isHovered ? "/images/gifdoangfix.gif" : "/images/logointro.png"}
          alt="About"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            transition: "opacity 0.3s ease",
          }}
        />
      </div>
    );
  };

  return (
    <div>
      <Parallax pages={2} ref={ref}>
        <ParallaxLayer
          offset={1.3}
          speed={0.3}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            scale: "100%",
            zIndex: 9999,
            pointerEvents: "auto",
          }}
        >
          <HoverButton />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0}
          speed={2}
          factor={4}
          style={{
            backgroundImage: "url(/images/about_us.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            transform: "scale(1.2)",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        ></ParallaxLayer>
        <ParallaxLayer
          offset={0}
          speed={0.2}
          style={{
            backgroundImage: "url(/images/about1rev.png)",
            backgroundPosition: "center",
            pointerEvents: "none",
            backgroundSize: "60%",
          }}
        ></ParallaxLayer>
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

        {/* <ParallaxLayer
          offset={0.6}
          speed={0.4}
          style={{
            backgroundImage: "url(/images/about2.png)",
            backgroundPosition: "center",
            pointerEvents: "none",
            backgroundSize: "40%", 
          }}
          sticky={{ start: 0.6, end: 0.8 }}
        ></ParallaxLayer> */}

        <ParallaxLayer
          offset={1.1}
          speed={0.2}
          style={{
            backgroundImage: "url(/images/about3.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            pointerEvents: "none",
            backgroundSize: "60%",
          }}
        />
        {/* <ParallaxLayer
          offset={1.8}
          speed={0.3}
          factor={0.2}
          className="gradient-anim"
          style={{
            backgroundBlendMode: "overlay",
            opacity: 0.8,
          }}
        ></ParallaxLayer> */}
      </Parallax>
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

  // return (
  //   <motion.section
  //     ref={ref}
  //     initial="hidden"
  //     animate={controls}
  //     variants={variants}
  //     className="flex flex-col items-center justify-center text-center h-screen px-6"
  //     style={{ minHeight: "100vh" }}
  //   >
  //     {children}
  //   </motion.section>
  // );
}
