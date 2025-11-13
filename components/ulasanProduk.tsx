"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import Image from "next/image";

export default function UlasanProduk({ productId }: { productId: number }) {
  const [ratings, setRatings] = useState<any[]>([]);
  const [avg, setAvg] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [hasReviewed, setHasReviewed] = useState(false);

  // 🔹 Ambil user login
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  // 🔹 Ambil semua ulasan
  useEffect(() => {
    fetch(`/api/products/${productId}/ratings`)
      .then((r) => r.json())
      .then((res) => {
        if (res.ok) {
          setRatings(res.data);
          setAvg(res.average);
        }
      });
  }, [productId]);

  // 🔹 Cek apakah user sudah memberi review
  useEffect(() => {
    const checkReview = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("product_ratings")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .maybeSingle();

      setHasReviewed(!!data);
    };
    checkReview();
  }, [user, productId]);

  // 🔹 Submit rating
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Silakan login dulu untuk memberi ulasan.");
    if (!rating) return toast.error("Pilih rating dulu ya!");

    const { error } = await supabase.from("product_ratings").insert([
      {
        product_id: productId,
        user_id: user.id,
        rating,
        comment,
      },
    ]);

    if (error) return toast.error(error.message);
    toast.success("Terima kasih atas ulasannya!");
    setHasReviewed(true);

    // Refresh ulasan
    const res = await fetch(`/api/products/${productId}/ratings`).then((r) =>
      r.json()
    );
    setRatings(res.data);
    setAvg(res.average);
  };

  return (
    <section className="max-w-6xl mx-auto rounded-xl p-6 relative">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-3xl font-bold text-[#00804c]">
          Ulasan Produk{" "}
          <span>({ratings?.length ?? 0})</span>
        </h2>
      </div>

      {!hasReviewed && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-xl shadow-sm mb-8"
        >
          <p className="font-semibold text-gray-700 mb-2">
            Beri Penilaian untuk produk ini:
          </p>
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRating(num)}
                className={`text-2xl ${
                  num <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tulis ulasan kamu di sini..."
            className="w-full border rounded-lg p-2 text-sm mb-3"
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-1.5 rounded-md hover:bg-green-800 transition"
          >
            Kirim Ulasan
          </button>
        </form>
      )}

      <div className="text-center mb-6">
        <p className="text-lg text-green-700 font-semibold">
          Rata-rata: {(avg ?? 0).toFixed(1)} / 5 ⭐
        </p>
      </div>

      {ratings?.length === 0 ? (
        <p className="text-center text-gray-500">
          Belum ada ulasan untuk produk ini.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ratings.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src="/images/avatar-placeholder.png"
                  alt="user avatar"
                  width={40}
                  height={40}
                  className="rounded-full border"
                />
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {r.user_id?.slice(0, 6) || "Pengguna"}
                  </p>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                    <span className="text-gray-500 text-xs ml-2">
                      ({r.rating})
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-xs mb-1">
                {new Date(r.created_at).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {r.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
