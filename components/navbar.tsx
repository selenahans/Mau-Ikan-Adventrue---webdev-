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

  if (pathname !== "/") {
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
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
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
}
