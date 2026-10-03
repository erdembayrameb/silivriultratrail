import { ChevronDown } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

/**
 * Akordeon <details>/<summary> ile kuruldu: statik çıktıda JavaScript
 * olmadan da açılıp kapanıyor ve klavyeyle çalışıyor.
 */
export function FaqScreen({ locale }: { locale: Locale }) {
  const { faq, contact } = getDictionary(locale);

  return (
    <PageShell locale={locale} page="faq">
      <PageIntro title={faq.title} intro={faq.intro} />

      <section className="bg-ink-950 py-12 sm:py-16">
        <div className="px-safe mx-auto w-full max-w-3xl">
          <ul className="flex flex-col gap-3">
            {faq.items.map((item) => (
              <li key={item.question}>
                <details className="group rounded-lg border border-ink-700 bg-ink-900 open:bg-ink-850">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-base [&::-webkit-details-marker]:hidden">
                    <span className="text-balance">{item.question}</span>
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180"
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                  </summary>

                  <div className="flex flex-col gap-3 px-4 pb-4 text-sm leading-relaxed text-white/70">
                    {item.answer.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </details>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-xs leading-relaxed text-white/45">
            {faq.footnote}{" "}
            <a
              href={`mailto:${contact.email}`}
              className="font-semibold text-accent underline underline-offset-4 hover:text-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {contact.email}
            </a>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
