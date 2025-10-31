"use client";
import { useParams } from "next/navigation";

export default function UMKMDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold text-gray-800">Halaman UMKM</h1>
      <p className="mt-4 text-lg text-gray-600">
        Selamat datang di halaman UMKM kami!{" "}
        {id && `Anda melihat detail UMKM dengan ID: ${id}`}
      </p>
    </div>
  );
}
