import { ArrowUp, Mail } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import type { Locale } from "@/i18n/config";
import { localeHref, localeLabels, locales } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

export function SiteFooter({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { brand, contact, footer, hero } = dict;

  return (
    <footer id="iletisim" className="pb-safe bg-sand text-ink-900">
      <div className="px-safe mx-auto flex w-full max-w-5xl flex-col items-center py-12 text-center">
        <span className="text-[13px]">
          <Logo brand={brand} variant="dark" />
        </span>

        <p className="mt-6 text-sm font-semibold tracking-wide uppercase">
          {hero.date} · {hero.city}
        </p>

        <h2 className="mt-10 text-xs font-bold tracking-[0.22em] text-ink-900/60 uppercase">
          {contact.title}
        </h2>
        <p className="mt-2 text-sm text-ink-900/70">{contact.note}</p>

        <a
          href={`mailto:${contact.email}`}
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:text-sut-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sut-cyan"
        >
          <Mail className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          {contact.email}
        </a>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {contact.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold tracking-wide uppercase hover:text-sut-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sut-cyan"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex items-center gap-3">
          <span className="text-xs font-semibold tracking-widest text-ink-900/50 uppercase">
            {footer.languageLabel}
          </span>
          {locales.map((code) => (
            <Link
              key={code}
              href={localeHref(code)}
              aria-current={code === locale ? "true" : undefined}
              className={
                code === locale
                  ? "rounded-md bg-ink-900 px-3 py-1.5 text-sm font-bold text-sand"
                  : "rounded-md border border-ink-900/25 px-3 py-1.5 text-sm font-bold text-ink-900/70 hover:text-ink-900"
              }
            >
              {localeLabels[code]}
            </Link>
          ))}
        </div>

        <a
          href="#ust"
          className="mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-ink-900/60 uppercase hover:text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sut-cyan"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
          {footer.backToTop}
        </a>

        <p className="mt-8 text-xs text-ink-900/50">
          © {new Date().getFullYear()} {brand.name}. {footer.rights}
        </p>
      </div>
    </footer>
  );
}
