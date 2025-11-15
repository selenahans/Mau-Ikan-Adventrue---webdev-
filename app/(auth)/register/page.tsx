"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { Mail, Lock, Leaf } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailClean = email.trim().toLowerCase();

    if (!emailClean.includes("@") || !emailClean.includes(".")) {
      return toast.error("Format email tidak valid");
    }

    const { error } = await supabase.auth.signUp({
      email: emailClean,
      password,
    });

    if (error) return toast.error(error.message);
    toast.success("Registrasi berhasil! Silakan verifikasi email Anda.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f7ed] via-white to-[#74C365]/60 px-4">
      <div className="relative w-full max-w-md">
        {/* Background glow */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#74C365] opacity-50 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#DBE64C] opacity-50 rounded-full blur-3xl" />

        {/* card form */}
        <form
          onSubmit={handleRegister}
          className="relative bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-8"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gradient-to-br from-[#74C365] to-[#00804c] p-3 rounded-full shadow-md mb-3">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-green-800">
              Buat Akun Baru
            </h1>
            <p className="text-gray-500 text-sm mt-1 text-center">
              Daftarkan akun untuk bergabung di platform UMKM ECOsrot
            </p>
          </div>

          {/* email input */}
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Alamat Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
            />
          </div>

          {/* password input */}
          <div className="relative mb-5">
            <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password (min 6 karakter)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
            />
          </div>

          {/* button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-br from-[#74C365] to-[#00804c] text-white rounded-lg py-2 font-semibold shadow-md hover:shadow-lg hover:brightness-110 transition-all"
          >
            Daftar Sekarang
          </button>

          {/* login link */}
          <p className="text-sm text-center mt-5 text-gray-600">
            Sudah punya akun?{" "}
            <a
              href="/login"
              className="text-green-700 font-medium hover:underline"
            >
              Masuk di sini
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
