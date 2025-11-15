"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ArrowLeft,
  Package,
  MessageSquare,
  Grid3x3,
  AlertCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import UlasanProduk from "@/components/ulasanProduk";
import axios from "axios";

export default function ProductDetailPage() {
  const { id, product_id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [active, setActive] = useState("deskripsi");
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!id || !product_id) return;
    axios
      .get(`/api/umkm/${id}/products/${product_id}`)
      .then((res) => {
        if (res.data.ok) {
          setProduct(res.data.data.product);
          setRelated(res.data.data.related);
        }
      })
      .finally(() => setIsLoading(false));
  }, [id, product_id]);

  useEffect(() => {
    if (product && !product.selectedImage) {
      const primary =
        product.images?.find((i: any) => i.is_primary)?.image_url ||
        product.images?.[0]?.image_url;

      setProduct((prev: any) => ({
        ...prev,
        selectedImage: primary,
      }));
    }
  }, [product]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el)
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: "smooth",
      });
  };

  const handleNextImage = () => {
    if (product?.images?.length > 0) {
      const nextIndex = (currentImageIndex + 1) % product.images.length;
      setCurrentImageIndex(nextIndex);
      setProduct((prev: any) => ({
        ...prev,
        selectedImage: product.images[nextIndex].image_url,
      }));
    }
  };

  const handlePrevImage = () => {
    if (product?.images?.length > 0) {
      const prevIndex =
        currentImageIndex === 0
          ? product.images.length - 1
          : currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setProduct((prev: any) => ({
        ...prev,
        selectedImage: product.images[prevIndex].image_url,
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F6F7ED] via-[#F6F7ED] to-[#E8F5E9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00804c] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">Memuat produk...</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const subnavItems = [
    { id: "deskripsi", label: "Deskripsi", icon: Package },
    { id: "info", label: "Info Penting", icon: AlertCircle },
    { id: "ulasan", label: "Ulasan", icon: MessageSquare },
    { id: "lainnya", label: "Produk Lain", icon: Grid3x3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F7ED] via-[#F6F7ED] to-[#E8F5E9] mt-20">
      {/* Enhanced Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#74C365]/20 to-[#DBE64C]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-[#00804c]/10 to-[#74C365]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Product Header Section */}
        <section id="deskripsi" className="scroll-mt-24 mb-16">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00804c] to-[#74C365] rounded-3xl blur opacity-20 group-hover:opacity-30 transition" />
            <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-white overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Image Gallery */}
                <div>
                  {/* Main Image with Navigation */}
                  <div className="relative rounded-2xl overflow-hidden border-4 border-gray-100 mb-4 bg-gray-50 aspect-square">
                    <Image
                      src={
                        product.selectedImage ||
                        product.images?.find((img: any) => img.is_primary)
                          ?.image_url ||
                        product.images?.[0]?.image_url ||
                        "/images/placeholder-product.webp"
                      }
                      alt={product.nama_produk}
                      fill
                      className="object-cover"
                    />

                    {/* Navigation Arrows */}
                    {product.images && product.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center hover:bg-white transition-all group/btn"
                        >
                          <ChevronLeft className="w-6 h-6 text-gray-800 group-hover/btn:text-[#00804c]" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center hover:bg-white transition-all group/btn"
                        >
                          <ChevronRight className="w-6 h-6 text-gray-800 group-hover/btn:text-[#00804c]" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    {product.images && product.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur text-white text-sm font-semibold">
                        {currentImageIndex + 1} / {product.images.length}
                      </div>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {product.images && product.images.length > 0 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {product.images.map((img: any, idx: number) => (
                        <button
                          key={img.id}
                          onClick={() => {
                            setCurrentImageIndex(idx);
                            setProduct((prev: any) => ({
                              ...prev,
                              selectedImage: img.image_url,
                            }));
                          }}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-3 transition-all ${
                            currentImageIndex === idx
                              ? "border-[#00804c] scale-105 shadow-lg"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Image
                            src={img.image_url}
                            alt="thumbnail"
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                  <div className="flex-1">
                    <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
                      {product.nama_produk}
                    </h1>

                    {/* Price */}
                    <div className="mb-6">
                      <p className="text-4xl font-black bg-gradient-to-r from-[#00804c] to-[#74C365] bg-clip-text text-transparent">
                        Rp {product.harga?.toLocaleString("id-ID")}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                      {product.average_rating && product.total_reviews > 0 ? (
                        <>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-6 h-6 ${
                                  i < Math.round(product.average_rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-gray-800">
                              {product.average_rating.toFixed(1)}
                            </span>
                            <span className="text-sm text-gray-600">/ 5</span>
                          </div>
                          <span className="text-sm text-gray-600 ml-auto">
                            {product.total_reviews} ulasan
                          </span>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-500">
                          <Star className="w-5 h-5" />
                          <span className="text-sm font-medium">
                            Belum ada ulasan
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                        Deskripsi Produk
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {product.deskripsi ||
                          "Deskripsi produk belum tersedia. Informasi akan segera diperbarui."}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => scrollTo("ulasan")}
                    className="w-full py-4 bg-gradient-to-r from-[#00804c] to-[#74C365] hover:from-[#74C365] hover:to-[#00804c] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Lihat Semua Ulasan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Info Section */}
        <section id="info" className="scroll-mt-24 mb-16">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition" />
            <div className="relative bg-white rounded-3xl shadow-xl p-8 border-2 border-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Informasi Penting
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.info_penting ||
                  "Informasi penting produk belum tersedia. Informasi akan segera diperbarui."}
              </p>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="ulasan" className="scroll-mt-24 mb-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-white">
            <UlasanProduk productId={Number(product_id)} />
          </div>
        </section>

        {/* Related Products Section */}
        <section id="lainnya" className="scroll-mt-24">
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00804c] to-[#74C365] flex items-center justify-center">
                <Grid3x3 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Produk Lainnya
              </h2>
            </div>

            {related.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-semibold">
                  Tidak ada produk lainnya
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {related.map((r: any, index: number) => {
                  const cover =
                    r.images?.find((img: any) => img.is_primary)?.image_url ||
                    r.images?.[0]?.image_url ||
                    "/images/placeholder-product.webp";

                  return (
                    <RelatedProductCard
                      key={r.id}
                      product={r}
                      cover={cover}
                      umkmId={id}
                      index={index}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

// Related Product Card Component
function RelatedProductCard({ product, cover, umkmId, index }: any) {
  return (
    <a
      href={`/umkm/${umkmId}/${product.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-gray-50"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <Image
          src={cover}
          alt={product.nama_produk}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-sm line-clamp-2 mb-2 group-hover:text-[#00804c] transition-colors">
          {product.nama_produk}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-base font-black bg-gradient-to-r from-[#00804c] to-[#74C365] bg-clip-text text-transparent">
            Rp {product.harga?.toLocaleString("id-ID")}
          </p>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#00804c] transition-colors" />
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        <ExternalLink className="w-5 h-5 text-[#00804c]" />
      </div>
    </a>
  );
}
