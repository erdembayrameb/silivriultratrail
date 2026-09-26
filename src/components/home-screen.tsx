import { Courses } from "@/components/courses";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { PageShell } from "@/components/page-shell";
import { PastEdition } from "@/components/past-edition";
import { Registration } from "@/components/registration";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

/** Ana sayfa gövdesi — TR ve EN kökleri aynı ekranı farklı sözlükle basar. */
export function HomeScreen({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <PageShell locale={locale} page="home">
      <Hero dict={dict} />
      <Courses dict={dict} />
      <Features dict={dict} />
      <Registration dict={dict} />
      <PastEdition dict={dict} />
    </PageShell>
  );
}
