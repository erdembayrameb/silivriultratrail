import type { Metadata } from "next";
import Link from "next/link";
import { RootHtml } from "@/components/root-html";
import { defaultLocale, localeHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export { viewport } from "@/components/root-html";

const dict = getDictionary(defaultLocale);

export const metadata: Metadata = {
  title: `404 | ${dict.meta.title}`,
  robots: { index: false, follow: false },
};

/**
 * Hiçbir rotaya uymayan adresler. Kök layout'un dışında kaldığı için
 * kendi <html>/<body> iskeletini basmak zorunda.
 */
export default function GlobalNotFound() {
  return (
    <RootHtml locale={defaultLocale}>
      <main className="px-safe flex min-h-dvh flex-col items-center justify-center gap-6 text-center">
        <p className="font-brush text-7xl text-sut-cyan">404</p>
        <p className="text-lg font-semibold text-white">
          Aradığın sayfa bulunamadı.
        </p>
        <Link
          href={localeHref(defaultLocale)}
          className="inline-flex min-h-13 items-center justify-center bg-sand px-10 text-base font-bold tracking-wider text-ink-950 uppercase transition-colors hover:bg-white"
        >
          Ana sayfa
        </Link>
      </main>
    </RootHtml>
  );
}
