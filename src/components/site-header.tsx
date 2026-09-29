"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CasedText } from "@/components/cased-text";
import { Logo } from "@/components/logo";
import type { Locale } from "@/i18n/config";
import { localeLabels, locales } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteHeader({
  dict,
  locale,
  languageHrefs,
}: {
  dict: Dictionary;
  locale: Locale;
  /** Bulunulan sayfanın her dildeki adresi — PageShell hesaplıyor. */
  languageHrefs: Record<Locale, string>;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;

    // Cleanup'ta okumak yerine şimdi yakalanıyor: buton header ile birlikte
    // hep bağlı kaldığı için aynı düğüm, ama kural gereği kopyalıyoruz.
    const toggle = toggleRef.current;

    // Menü açıkken arkadaki sayfa kaymasın; mobilde kritik.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Odak panele taşınıyor; header `inert` olduğu için tetikleyen buton
    // bu noktada zaten odağı bırakmış oluyor.
    const focusable = () => panel.querySelectorAll<HTMLElement>(FOCUSABLE);
    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      // Odak tuzağı: Tab panelin son öğesinden ilkine sarsın, arkadaki
      // sayfaya kaçmasın.
      const items = focusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      // Kapanışta odak menüyü açan butona geri döner.
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      {/*
       * `backdrop-blur` fixed konumlu torunlar için containing block ürettiği
       * için menü paneli header'ın DIŞINDA duruyor — içeride kalırsa `inset-0`
       * viewport'a değil header kutusuna göre çözülür ve panel 64px'e sıkışır.
       */}
      <header
        inert={open}
        className="pt-safe sticky top-0 z-50 bg-ink-900/95 backdrop-blur supports-[backdrop-filter]:bg-ink-900/80"
      >
        {/* İçerik bölümleri max-w ile ortalanıyor; başlık çubuğu bilinçli
            olarak kenardan kenara — logo solda, menü butonu sağda durur. */}
        <div className="px-safe flex h-16 w-full items-center justify-between">
          <Link
            href={dict.routes.home}
            className="text-[13px] focus-visible:ring-2 focus-visible:ring-sut-cyan focus-visible:outline-none"
          >
            <Logo brand={dict.brand} />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label={dict.nav.openLabel}
            aria-expanded={open}
            aria-controls="site-menu"
            className="-mr-2 inline-flex h-12 w-12 items-center justify-center rounded-lg text-white focus-visible:ring-2 focus-visible:ring-sut-cyan focus-visible:outline-none"
          >
            <Menu className="h-7 w-7" strokeWidth={2.5} />
          </button>
        </div>
      </header>

      {open ? (
        <div
          id="site-menu"
          ref={panelRef}
          className="pt-safe pb-safe fixed inset-0 z-50 flex flex-col bg-ink-950/98 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={dict.brand.name}
        >
          <div className="px-safe flex h-16 w-full shrink-0 items-center justify-between">
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

          <nav className="px-safe w-full flex-1 overflow-y-auto py-4">
            <ul className="flex flex-col">
              {dict.nav.items.map((item) =>
                item.href ? (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={
                        item.emphasis
                          ? // Vurgulu madde (Gönüllü Ol) listeden ayrışsın.
                            "mt-6 flex min-h-13 items-center justify-center bg-sut-cyan px-5 font-display text-xl tracking-wide text-ink-950 uppercase transition-colors hover:bg-sut-cyan-soft focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                          : "block border-b border-ink-800 py-4 font-display text-2xl tracking-wide text-white uppercase transition-colors hover:text-sut-cyan focus-visible:text-sut-cyan focus-visible:outline-none"
                      }
                    >
                      <CasedText>{item.label}</CasedText>
                    </Link>
                  </li>
                ) : (
                  <li
                    key={item.label}
                    className="flex items-center justify-between border-b border-ink-800 py-4"
                  >
                    <span className="font-display text-2xl tracking-wide text-white/35 uppercase">
                      <CasedText>{item.label}</CasedText>
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
                  href={languageHrefs[code]}
                  onClick={() => setOpen(false)}
                  aria-current={code === locale ? "page" : undefined}
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
    </>
  );
}
