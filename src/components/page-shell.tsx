import { FloatingContact } from "@/components/floating-contact";
import { ScrollToTop } from "@/components/scroll-to-top";
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
      <ScrollToTop />

      {/*
       * Klavye ve ekran okuyucu kullanıcıları her sayfada 14 maddelik menüyü
       * geçmek zorunda kalmasın. Normalde görünmez, odaklanınca belirir.
       */}
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-sut-cyan focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-ink-950"
      >
        {dict.nav.skipToContent}
      </a>

      <SiteHeader
        brand={dict.brand}
        nav={dict.nav}
        homeHref={dict.routes.home}
        languageLabel={dict.footer.languageLabel}
        locale={locale}
        languageHrefs={languageHrefs}
      />

      <main id="icerik">{children}</main>

      <SiteFooter dict={dict} locale={locale} languageHrefs={languageHrefs} />
      <FloatingContact dict={dict} />
    </>
  );
}
