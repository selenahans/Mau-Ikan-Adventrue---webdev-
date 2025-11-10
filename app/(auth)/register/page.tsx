"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

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

    const { data, error } = await supabase.auth.signUp({
      email: emailClean,
      password,
    });

    if (error) return toast.error(error.message);
    toast.success("Registrasi berhasil! Silakan verifikasi email Anda.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center text-green-800 mb-6">
          Daftar Akun
        </h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />
        <input
          type="password"
          placeholder="Password (min 6 karakter)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />
        <button
          type="submit"
          className="w-full bg-green-700 text-white rounded-lg py-2 hover:bg-green-800 transition"
        >
          Register
        </button>
        <p className="text-sm text-center mt-3 text-gray-500">
          Sudah punya akun?{" "}
          <a href="/login" className="text-green-700 font-medium">
            Masuk di sini
          </a>
        </p>
      </form>
    </div>
  );
}
