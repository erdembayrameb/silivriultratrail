import { Courses } from "@/components/courses";
import { Features } from "@/components/features";
import { FloatingContact } from "@/components/floating-contact";
import { Hero } from "@/components/hero";
import { PastEdition } from "@/components/past-edition";
import { Registration } from "@/components/registration";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

/** Ana sayfa gövdesi — TR ve EN kökleri aynı ekranı farklı sözlükle basar. */
export function HomeScreen({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <SiteHeader dict={dict} locale={locale} />

      <main>
        <Hero dict={dict} />
        <Courses dict={dict} />
        <Features dict={dict} />
        <Registration dict={dict} />
        <PastEdition dict={dict} />
      </main>

      <SiteFooter dict={dict} locale={locale} />
      <FloatingContact dict={dict} />
    </>
  );
}
