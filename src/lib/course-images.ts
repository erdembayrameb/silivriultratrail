import type { StaticImageData } from "next/image";
import hero from "@/assets/hero.jpg";

/**
 * Parkur sayfalarının arka plan görselleri.
 *
 * Şu an elimizde tek fotoğraf var, üçü de onu kullanıyor. Parkur başına ayrı
 * fotoğraflar geldiğinde `src/assets/courses/` altına konulup burada
 * eşleştirilmesi yeterli; içerik dosyasındaki `image` anahtarı değişmez.
 */
const images: Record<string, StaticImageData> = {
  hero,
};

export function courseImage(key: string): StaticImageData {
  return images[key] ?? hero;
}
