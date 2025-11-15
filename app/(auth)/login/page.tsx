"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Login berhasil! Selamat datang 👋");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f7ed] via-white to-[#74C365]/60 px-4">
      <div className="relative w-full max-w-md">
        {/* Background glow */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#74C365] opacity-50 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#DBE64C] opacity-50 rounded-full blur-3xl" />

        {/* Card */}
        <form
          onSubmit={handleLogin}
          className="relative bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-8"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gradient-to-br from-[#74C365] to-[#00804c] p-3 rounded-full shadow-md mb-3">
              <LogIn className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-[#00804c]">Masuk ke Akun</h1>
          </div>

          {/* Email Input */}
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

          {/* Password Input */}
          <div className="relative mb-5">
            <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-br from-[#74C365] to-[#00804c] text-white rounded-lg py-2 font-semibold shadow-md transition-all hover:brightness-110 hover:shadow-lg ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>

          {/* Register Link */}
          <p className="text-sm text-center mt-5 text-gray-600">
            Belum punya akun?{" "}
            <a
              href="/register"
              className="text-green-700 font-medium hover:underline"
            >
              Daftar Sekarang
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
