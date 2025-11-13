"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/aboutus", label: "Tentang Kami" },
    { href: "/umkm", label: "UMKM" },
    { href: "/produk", label: "Produk" },
    { href: "/edukasi", label: "Edukasi" },
  ];

  // 🔹 Cek session user saat halaman dimuat
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    // 🔹 Update realtime kalau login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 🔹 Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  if (pathname !== "/") {
    return (
      <nav
        className="
  fixed top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50
  bg-white shadow-sm rounded-2xl
  transition-all duration-300
"


      >
        <div className="max-w-7xl mx-auto flex items-center px-8 py-3">
          {/* 🟢 Logo */}
          <Link href="/" className="flex items-center gap-2 group mr-8">
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
                        ? "text-[#74C365]-700"
                        : "text-gray-700 hover:text-[#74C365]"
                    }
                  `}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-[#00804c] to-[#74C365] transform transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          {/* 🟢 Kanan: Auth */}
          <div className="flex items-center gap-4 relative ml-auto">
            {!user ? (
              <>
                {/* Tombol Masuk */}
                <Link
                  href="/login"
                  className="border border-[#00804c] text-[#00804c] font-medium
                    px-4 py-1.5 rounded-full
                    hover:bg-teal-50 hover:shadow-sm
                    transition-all duration-300"
                >
                  Masuk
                </Link>

                {/* Tombol Daftar */}
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-[#00804c] to-[#74C365]
                    px-5 py-1.5 rounded-full font-semibold
                    text-white shadow-md
                    hover:shadow-lg hover:brightness-110
                    transition-all duration-300"
                >
                  Daftar
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 border border-[#00804c] text-[#00804c] px-4 py-1.5 rounded-full font-medium hover: transition"
                >
                  <span>Halo, {user.email}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md overflow-hidden">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
