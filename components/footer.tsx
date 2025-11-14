import {  Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#00804c] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Leaf className="w-7 h-7 color-[#F6F7ED]" />
          <span className="text-2xl font-bold tracking-tight text-[#F6F7ED]">
            ECOsrot
          </span>
        </div>
        <p className="text-emerald-200">
          Platform UMKM Ramah Lingkungan Indonesia
        </p>
        <p className="text-emerald-300 text-sm mt-1">
          © 2025 ECOsrot. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
