import type { Metadata, Viewport } from "next";
import { Anton, Barlow } from "next/font/google";
import "@/app/globals.css";
import type { Locale } from "@/i18n/config";
import { localeHref, locales } from "@/i18n/config";
import type { PageKey } from "@/i18n/dictionary";
import { getDictionary } from "@/i18n/dictionary";

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
    alternates: {
      canonical: localeHref(locale),
      languages: Object.fromEntries(locales.map((l) => [l, localeHref(l)])),
    },
    openGraph: {
      type: "website",
      locale,
      siteName: dict.meta.title,
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

/**
 * Alt sayfa metadata'sı. Canonical ve hreflang adresleri içerik dosyasındaki
 * `routes` alanından geliyor — böylece TR/EN karşılıkları birbirini gösteriyor.
 */
export function buildPageMetadata(locale: Locale, page: PageKey): Metadata {
  const dict = getDictionary(locale);
  const { title, description } =
    page === "schedule"
      ? dict.schedule
      : page === "faq"
        ? dict.faq
        : page === "runnerInfo"
          ? dict.runnerInfo
          : dict.meta;

  return {
    title,
    description,
    alternates: {
      canonical: dict.routes[page],
      languages: Object.fromEntries(
        locales.map((l) => [l, getDictionary(l).routes[page]]),
      ),
    },
    openGraph: {
      type: "website",
      locale,
      siteName: dict.meta.title,
      title: `${title} | ${dict.meta.title}`,
      description,
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
