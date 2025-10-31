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

  // 🌿 Navbar minimal di halaman /aboutus
  if (pathname === "/aboutus") {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gradient-to-b from-teal-900/50 via-teal-800/30 to-transparent">
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

  // 🌿 Default Navbar (halaman selain /aboutus)
  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        bg-white/70 backdrop-blur-md shadow-sm
        transition-all duration-300
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3">
        {/* 🟢 Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/images/logo2.png"
            alt="Ecosrot Logo"
            className="h-12 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* 🟢 Menu Navigasi */}
        <div className="hidden md:flex items-center gap-10 font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative text-[16px] font-semibold transition duration-300
                  ${
                    isActive
                      ? "text-teal-700"
                      : "text-gray-700 hover:text-teal-700"
                  }
                `}
              >
                {item.label}
                {/* underline highlight */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-[#01814E] to-[#1F4993] transform transition-transform duration-300 ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* 🟢 Search + Auth Buttons */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Cari UMKM..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="
                rounded-full bg-gray-100 border border-gray-300
                pl-10 pr-4 py-2 text-sm text-gray-700 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-teal-500
                transition-all duration-300 w-48 md:w-56
              "
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>

          {/* Tombol Masuk */}
          <Link
            href="/login"
            className="
              border border-teal-600 text-teal-700 font-medium
              px-4 py-1.5 rounded-full
              hover:bg-teal-50 hover:shadow-sm
              transition-all duration-300
            "
          >
            Masuk
          </Link>

          {/* Tombol Daftar */}
          <Link
            href="/register"
            className="
              bg-gradient-to-r from-[#01814E] to-[#1F4993]
              px-5 py-1.5 rounded-full font-semibold
              text-white shadow-md
              hover:shadow-lg hover:brightness-110
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
