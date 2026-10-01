import type { Metadata, Viewport } from "next";
import { Anton, Barlow } from "next/font/google";
import "@/app/globals.css";
import type { Locale } from "@/i18n/config";
import { localeHref, locales } from "@/i18n/config";
import type { PageKey } from "@/i18n/dictionary";
import { getDictionary, getPageMeta } from "@/i18n/dictionary";
import { absoluteUrl, SITE_URL } from "@/lib/site-url";

// next/font statik export'ta da fontları kendi sunucumuza gömer —
// Google'a çalışma anında istek gitmez.
const heading = Anton({
  weight: "400",
  subsets: ["latin-ext"],
  variable: "--font-heading",
  display: "swap",
});

const body = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin-ext"],
  variable: "--font-body",
  display: "swap",
});

/**
 * Bağlantı paylaşıldığında görünen önizleme görseli. Sosyal platformlar
 * mutlak adres ister; 1200x630 standart oran.
 */
const OG_IMAGE = {
  url: absoluteUrl("/og-image.png"),
  width: 1200,
  height: 630,
  alt: "Silivri Ultra Trail",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a2029",
};

/** Kök layout metadata'sı — başlık şablonu burada tanımlanıyor. */
export function buildMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);

  return {
    title: {
      default: dict.meta.title,
      template: `%s | ${dict.meta.title}`,
    },
    description: dict.meta.description,
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [
        { url: absoluteUrl("/icon.svg"), type: "image/svg+xml" },
        { url: absoluteUrl("/icon-512.png"), type: "image/png", sizes: "512x512" },
      ],
      apple: absoluteUrl("/icon-512.png"),
    },
    manifest: absoluteUrl("/site.webmanifest"),
    alternates: {
      canonical: absoluteUrl(localeHref(locale)),
      languages: Object.fromEntries(
        locales.map((l) => [l, absoluteUrl(localeHref(l))]),
      ),
    },
    openGraph: {
      type: "website",
      locale,
      url: absoluteUrl(localeHref(locale)),
      siteName: dict.meta.title,
      title: dict.meta.title,
      description: dict.meta.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [OG_IMAGE.url],
    },
  };
}

/**
 * Alt sayfa metadata'sı. Canonical ve hreflang adresleri içerik dosyasındaki
 * `routes` alanından geliyor — böylece TR/EN karşılıkları birbirini gösteriyor.
 */
export function buildPageMetadata(locale: Locale, page: PageKey): Metadata {
  const dict = getDictionary(locale);
  const { title, description } = getPageMeta(dict, page);

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(dict.routes[page]),
      languages: Object.fromEntries(
        locales.map((l) => [l, absoluteUrl(getDictionary(l).routes[page])]),
      ),
    },
    openGraph: {
      type: "website",
      locale,
      url: absoluteUrl(dict.routes[page]),
      siteName: dict.meta.title,
      title: `${title} | ${dict.meta.title}`,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${dict.meta.title}`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/**
 * Her dilin kendi kök layout'u var (TR: `/`, EN: `/en`) — böylece <html lang>
 * doğru basılıyor. Ortak iskelet burada tek yerde duruyor.
 */
export function RootHtml({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} className={`${heading.variable} ${body.variable}`}>
      <body className="min-h-dvh bg-ink-950 font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
