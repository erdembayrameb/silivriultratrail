import { FloatingContact } from "@/components/floating-contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import type { PageKey } from "@/i18n/dictionary";
import { getDictionary } from "@/i18n/dictionary";

/**
 * Her sayfanın ortak iskeleti. `page` anahtarı sayesinde dil değiştirici,
 * bulunduğun sayfanın diğer dildeki karşılığına gider — alt sayfadayken
 * ana sayfaya düşmez.
 */
export function PageShell({
  locale,
  page,
  children,
}: {
  locale: Locale;
  page: PageKey;
  children: React.ReactNode;
}) {
  const dict = getDictionary(locale);

  const languageHrefs = Object.fromEntries(
    locales.map((code) => [code, getDictionary(code).routes[page]]),
  ) as Record<Locale, string>;

  return (
    <>
      <SiteHeader dict={dict} locale={locale} languageHrefs={languageHrefs} />

      <main>{children}</main>

      <SiteFooter dict={dict} locale={locale} languageHrefs={languageHrefs} />
      <FloatingContact dict={dict} />
    </>
  );
}
