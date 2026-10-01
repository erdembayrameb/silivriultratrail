/**
 * Sitenin mutlak adresi — canonical, hreflang, og:url, sitemap ve yapısal
 * veri için gerekli. Arama motorları ve sosyal medya önizlemeleri göreli
 * adresle çalışmaz.
 *
 * Değer derleme anında gömülür. Deploy workflow'u `NEXT_PUBLIC_SITE_URL`'i
 * GitHub Pages'in bildirdiği adresten alır; adres öneki de içinde gelir.
 * Özel domain bağlandığında kendiliğinden `https://www.silivriultratrail.com`
 * olur, kodda değişiklik gerekmez.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://erdembayrameb.github.io/silivriultratrail"
).replace(/\/$/, "");

/** Göreli bir sayfa adresini mutlak adrese çevirir. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
