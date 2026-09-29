import { ArrowRight, Download, FileText } from "lucide-react";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/i18n/config";
import { getDictionary, getLegalDoc } from "@/i18n/dictionary";

/** Resmi belgelerin listelendiği hub sayfası. */
export function DocumentsScreen({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { documents, routes } = dict;

  return (
    <PageShell locale={locale} page="documents">
      <PageIntro title={documents.title} intro={documents.intro} />

      <section className="bg-ink-950 py-12 sm:py-16">
        <div className="px-safe mx-auto w-full max-w-3xl">
          <ul className="flex flex-col gap-4">
            {documents.items.map(({ page }) => {
              const doc = getLegalDoc(dict, page);

              return (
                <li
                  key={page}
                  className="rounded-lg border border-ink-700 bg-ink-900"
                >
                  <Link
                    href={routes[page]}
                    className="flex items-start gap-4 px-4 py-5 focus-visible:ring-2 focus-visible:ring-sut-cyan focus-visible:outline-none"
                  >
                    <FileText
                      className="mt-0.5 h-5 w-5 shrink-0 text-sut-cyan"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="flex-1">
                      <span className="block text-base font-bold text-balance text-white">
                        {doc.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-white/65">
                        {doc.summary}
                      </span>
                    </span>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-white/35"
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                  </Link>

                  {doc.pdf ? (
                    <a
                      href={doc.pdf}
                      download
                      className="flex min-h-11 items-center gap-2 border-t border-ink-800 px-4 text-xs font-bold tracking-wide text-white/60 uppercase transition-colors hover:text-sut-cyan focus-visible:ring-2 focus-visible:ring-sut-cyan focus-visible:outline-none"
                    >
                      <Download
                        className="h-3.5 w-3.5"
                        strokeWidth={2.25}
                        aria-hidden="true"
                      />
                      {documents.downloadLabel}
                      <span className="sr-only"> — {doc.title}</span>
                    </a>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <p className="mt-8 text-xs leading-relaxed text-white/45">
            {documents.footnote}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
