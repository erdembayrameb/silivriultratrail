/**
 * `public/` altındaki dosyalara giden düz `<a href>` bağlantıları için.
 *
 * `next/link` ve `next/image` basePath önekini kendileri ekler; ham `<a href>`
 * ve `<img src>` eklemez. Proje sayfası olarak yayınlandığımızda
 * (kullanici.github.io/depo-adi) bu bağlantılar öneksiz kalıp 404 verir.
 *
 * Değer derleme anında gömülür: `NEXT_PUBLIC_BASE_PATH` workflow tarafından
 * GitHub'dan alınır, özel domain bağlandığında boş gelir.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
