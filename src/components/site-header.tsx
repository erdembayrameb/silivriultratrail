"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import type { Locale } from "@/i18n/config";
import { localeHref, localeLabels, locales } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

export function SiteHeader({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);

  // Menü açıkken arkadaki sayfa kaymasın; mobilde kritik.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="pt-safe sticky top-0 z-50 bg-ink-900/95 backdrop-blur supports-[backdrop-filter]:bg-ink-900/80">
      <div className="px-safe mx-auto flex h-16 w-full max-w-5xl items-center justify-between">
        <Link
          href={localeHref(locale)}
          className="text-[13px] focus-visible:ring-2 focus-visible:ring-sut-cyan focus-visible:outline-none"
        >
          <Logo brand={dict.brand} />
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={dict.nav.openLabel}
          aria-expanded={open}
          className="-mr-2 inline-flex h-12 w-12 items-center justify-center rounded-lg text-white focus-visible:ring-2 focus-visible:ring-sut-cyan focus-visible:outline-none"
        >
          <Menu className="h-7 w-7" strokeWidth={2.5} />
        </button>
      </div>

      {open ? (
        <div
          className="pt-safe pb-safe fixed inset-0 z-50 flex flex-col bg-ink-950/98 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={dict.brand.name}
        >
          <div className="px-safe mx-auto flex h-16 w-full max-w-5xl shrink-0 items-center justify-between">
            <span className="text-[13px]">
              <Logo brand={dict.brand} />
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={dict.nav.closeLabel}
              className="-mr-2 inline-flex h-12 w-12 items-center justify-center rounded-lg text-white focus-visible:ring-2 focus-visible:ring-sut-cyan focus-visible:outline-none"
            >
              <X className="h-7 w-7" strokeWidth={2.5} />
            </button>
          </div>

          <nav className="px-safe mx-auto w-full max-w-5xl flex-1 overflow-y-auto py-4">
            <ul className="flex flex-col">
              {dict.nav.items.map((item) =>
                item.href ? (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-ink-800 py-4 font-display text-2xl tracking-wide text-white uppercase transition-colors hover:text-sut-cyan focus-visible:text-sut-cyan focus-visible:outline-none"
                    >
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li
                    key={item.label}
                    className="flex items-center justify-between border-b border-ink-800 py-4"
                  >
                    <span className="font-display text-2xl tracking-wide text-white/35 uppercase">
                      {item.label}
                    </span>
                    <span className="rounded-full border border-sut-cyan/40 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-sut-cyan uppercase">
                      {dict.nav.soonBadge}
                    </span>
                  </li>
                ),
              )}
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">
                {dict.footer.languageLabel}
              </span>
              {locales.map((code) => (
                <Link
                  key={code}
                  href={localeHref(code)}
                  onClick={() => setOpen(false)}
                  aria-current={code === locale ? "true" : undefined}
                  className={
                    code === locale
                      ? "rounded-md bg-sut-cyan px-3 py-1.5 text-sm font-bold text-ink-950"
                      : "rounded-md border border-ink-700 px-3 py-1.5 text-sm font-bold text-white/70 hover:text-white"
                  }
                >
                  {localeLabels[code]}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
