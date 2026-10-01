import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import type { PageKey } from "@/i18n/dictionary";
import { getDictionary } from "@/i18n/dictionary";
import { absoluteUrl } from "@/lib/site-url";

// `output: export` ile route handler'larin statik oldugu acikca belirtilmeli.
export const dynamic = "force-static";

/**
 * Arama motorlarına sitedeki tüm sayfaları ve dil karşılıklarını bildirir.
 * Adresler içerik dosyasındaki `routes` alanından geldiği için yeni sayfa
 * eklendiğinde burayı güncellemek gerekmiyor.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const tr = getDictionary("tr");
  const pages = Object.keys(tr.routes) as PageKey[];

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: absoluteUrl(getDictionary(locale).routes[page]),
      changeFrequency: "monthly" as const,
      priority: page === "home" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, absoluteUrl(getDictionary(l).routes[page])]),
        ),
      },
    })),
  );
}
