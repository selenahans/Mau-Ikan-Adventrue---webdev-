"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  const navItems = [
    { href: "/aboutus", label: "Tentang Kami" },
    { href: "/umkm", label: "UMKM" },
  ];

  // 🟢 Jika sedang di halaman /aboutus → tampilkan hanya logo
  if (pathname === "/aboutus") {
    return (
      <nav
        className="
          fixed top-0 left-0 w-full z-50
          bg-gradient-to-b from-teal-900/60 via-teal-800/40 to-transparent
          backdrop-blur-xl text-white transition-all duration-300
        "
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center py-4">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/images/logo.png"
              alt="Ecosrot Logo"
              className="h-16 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>
      </nav>
    );
  }

  // 🟡 Default Navbar untuk halaman lain
  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        bg-gradient-to-b from-teal-900/60 via-teal-800/40 to-transparent
        backdrop-blur-xl text-white transition-all duration-300
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/images/logo.png"
            alt="Ecosrot Logo"
            className="h-14 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-10 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative transition duration-300 ${
                pathname === item.href ? "text-lime-300" : "hover:text-lime-300"
              }`}
            >
              {item.label}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-[#01814E] to-[#1F4993] scale-x-0 origin-left transition-transform duration-300 ${
                  pathname === item.href
                    ? "scale-x-100"
                    : "group-hover:scale-x-100"
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Search + Buttons */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Cari..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="
                rounded-full bg-white/10 border border-white/20 
                pl-10 pr-4 py-2 text-sm placeholder-white/70
                focus:outline-none focus:ring-1 focus:ring-lime-400
                text-white transition-all duration-300
                hover:bg-white/20
              "
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/70" />
          </div>

          <Link
            href="/login"
            className="
              border border-white/50 px-4 py-1.5 rounded-full
              hover:bg-white/20 hover:text-white
              transition-all duration-300
            "
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="
              bg-gradient-to-r from-[#01814E] to-[#1F4993]
              px-4 py-1.5 rounded-full font-semibold
              text-white shadow-md
              hover:brightness-110 hover:shadow-lg
              transition-all duration-300
            "
          >
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
}
