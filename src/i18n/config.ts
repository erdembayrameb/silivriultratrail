export const locales = ["tr", "en"] as const;

export type Locale = (typeof locales)[number];

/** Türkçe birincil dil: kök adreste yayınlanıyor, İngilizce /en altında. */
export const defaultLocale: Locale = "tr";

export const localeNames: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
};

/**
 * Bir dilin ana sayfa adresi. `trailingSlash: true` ile üretildiğimiz için
 * sonda eğik çizgi var — canonical adresle gerçek adres birebir eşleşsin.
 */
export function localeHref(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
