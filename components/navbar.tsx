"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ChevronDown, Menu, X, LogOut, User } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/aboutus", label: "Tentang Kami" },
    { href: "/umkm", label: "UMKM" },
    { href: "/produk", label: "Produk" },
    { href: "/edukasi", label: "Edukasi" },
  ];

  // Check user session
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/login");
  };

  if (pathname !== "/") {
    return (
      <>
        <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-white shadow-lg rounded-2xl transition-all duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group z-50">
              <img
                src="/images/logo2.png"
                alt="Ecosrot Logo"
                className="h-10 md:h-12 transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 font-medium">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative text-base font-semibold transition duration-300 text-gray-700 hover:text-[#00804c] group"
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-[#00804c] to-[#74C365] transform transition-transform duration-300 ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="border-2 border-[#00804c] text-[#00804c] font-semibold px-5 py-2 rounded-full hover:bg-[#00804c] hover:text-white transition-all duration-300"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-[#00804c] to-[#74C365] px-5 py-2 rounded-full font-semibold text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Daftar
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 border-2 border-[#00804c] text-[#00804c] px-4 py-2 rounded-full font-semibold hover:bg-[#00804c] hover:text-white transition-all duration-300"
                  >
                    <User size={18} />
                    <span className="max-w-[120px] truncate">{user.email}</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {dropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setDropdownOpen(false)}
                      />
                      {/* Dropdown */}
                      <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50">
                        <div className="p-3 border-b border-gray-100 bg-gray-50">
                          <p className="text-xs text-gray-500 mb-1">
                            Masuk sebagai
                          </p>
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {user.email}
                          </p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 font-semibold"
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 rounded-xl bg-gradient-to-r from-[#00804c] to-[#74C365] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all z-50"
              aria-label="Toggle menu"
            >
              <Menu
                size={24}
                className={`absolute transition-all duration-300 ${
                  mobileMenuOpen
                    ? "opacity-0 rotate-90"
                    : "opacity-100 rotate-0"
                }`}
              />
              <X
                size={24}
                className={`absolute transition-all duration-300 ${
                  mobileMenuOpen
                    ? "opacity-100 rotate-0"
                    : "opacity-0 -rotate-90"
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Menu */}
        <div
          className={`fixed top-[88px] left-1/2 -translate-x-1/2 w-[95%] max-w-7xl bg-white rounded-2xl shadow-2xl z-40 lg:hidden transition-all duration-300 ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="p-6">
            {/* Mobile Navigation Links */}
            <div className="space-y-2 mb-6">
              {navItems.map((item, index) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className={`block px-4 py-3 rounded-xl font-semibold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#00804c] to-[#74C365] text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth Section */}
            <div className="pt-6 border-t border-gray-200">
              {!user ? (
                <div className="space-y-3">
                  <Link
                    href="/login"
                    className="block w-full text-center border-2 border-[#00804c] text-[#00804c] font-semibold px-5 py-3 rounded-xl hover:bg-[#00804c] hover:text-white transition-all duration-300"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-center bg-gradient-to-r from-[#00804c] to-[#74C365] px-5 py-3 rounded-xl font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Daftar
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="px-4 py-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Masuk sebagai</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}
