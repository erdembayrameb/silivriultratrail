import type { NextConfig } from "next";

/**
 * GitHub Pages + özel domain hedefi: tamamen statik çıktı üretiyoruz.
 * `out/` klasörü doğrudan yayınlanabilir. Sunucu tarafı özellik (API route,
 * ISR, middleware, next/image optimizasyonu) kullanılamaz.
 *
 * NEXT_PUBLIC_BASE_PATH: proje sayfası olarak yayınlanırken (örn.
 * kullanici.github.io/silivriultratrail) adres bir alt klasörde başlar ve tüm
 * bağlantıların bu önekle üretilmesi gerekir. Deploy workflow'u bu değeri
 * GitHub'dan otomatik alır; özel domain bağlandığında boş gelir.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
