"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return toast.error(error.message);

    toast.success("Login berhasil!");
    router.push("/"); // arahkan ke halaman utama
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center text-green-800 mb-6">
          Login
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />
        <button
          type="submit"
          className="w-full bg-green-700 text-white rounded-lg py-2 hover:bg-green-800 transition"
        >
          Login
        </button>
        <p className="text-sm text-center mt-3 text-gray-500">
          Belum punya akun?{" "}
          <a href="/register" className="text-green-700 font-medium">
            Daftar sekarang
          </a>
        </p>
      </form>
    </div>
  );
}
