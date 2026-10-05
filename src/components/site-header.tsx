"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CasedText } from "@/components/cased-text";
import { Flag } from "@/components/flag";
import { Logo } from "@/components/logo";
import type { Locale } from "@/i18n/config";
import { localeNames, locales } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/*
 * Bilinçli olarak tüm `Dictionary` değil, yalnızca kullanılan parçalar
 * alınıyor: bu bir istemci bileşeni ve aldığı proplar her sayfanın HTML'ine
 * serileştiriliyor. Sözlüğün tamamı geçilirse (~79 KB) sitedeki her metin,
 * her sayfaya gereksiz yere gömülür.
 */
export function SiteHeader({
  brand,
  nav,
  locale,
  languageHrefs,
}: {
  brand: Dictionary["brand"];
  nav: Dictionary["nav"];
  locale: Locale;
  /** Bulunulan sayfanın her dildeki adresi — PageShell hesaplıyor. */
  languageHrefs: Record<Locale, string>;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef("");

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = previousOverflow.current;
  }, []);

  /**
   * Menüdeki bir bağlantıya basıldığında kaydırma kilidi, yönlendirmeden
   * ÖNCE senkron olarak açılıyor.
   *
   * Aksi halde: kilit hâlâ kapalıyken Next yeni sayfaya geçip başa kaydırmak
   * istiyor, ama `overflow: hidden` yüzünden sayfa kaydırılamıyor. Kilit
   * sonradan kalkınca tarayıcı önceki kaydırma konumunu geri veriyor ve
   * kullanıcı yeni sayfanın ortasında — kısa sayfalarda en altında — açılıyor.
   */
  const closeForNavigation = useCallback(() => {
    unlockScroll();
    setOpen(false);
  }, [unlockScroll]);

  /** Gezinme olmadan kapanış (kapat butonu / Escape): odak butona döner. */
  const closeAndRestoreFocus = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;

    // Menü açıkken arkadaki sayfa kaymasın; mobilde kritik.
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Odak panele taşınıyor; header `inert` olduğu için tetikleyen buton
    // bu noktada zaten odağı bırakmış oluyor. `preventScroll`, odaklanmanın
    // sayfayı kendi başına kaydırmasını engelliyor.
    const focusable = () => panel.querySelectorAll<HTMLElement>(FOCUSABLE);
    focusable()[0]?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAndRestoreFocus();
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
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      // Emniyet ağı: kilidi açmadan kapanan bir yol kalırsa burada açılır.
      unlockScroll();
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, unlockScroll, closeAndRestoreFocus]);

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
          {/* Logo da menüyü açıyor; ana sayfaya gitmek için menüdeki
              "Ana Sayfa" maddesi var. */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={nav.openLabel}
            aria-expanded={open}
            aria-controls="site-menu"
            className="rounded-lg text-[13px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <Logo brand={brand} />
          </button>

          <div className="flex items-center gap-1.5">
            {/* Dil seçimi: yalnızca bayrak, etiket yok. */}
            {locales.map((code) => (
              <Link
                key={code}
                href={languageHrefs[code]}
                aria-label={localeNames[code]}
                aria-current={code === locale ? "page" : undefined}
                className={`inline-flex h-7 w-10 items-center justify-center overflow-hidden rounded-sm ring-1 transition-opacity focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                  code === locale
                    ? "opacity-100 ring-white/70"
                    : "opacity-45 ring-white/20 hover:opacity-80"
                }`}
              >
                <Flag locale={code} />
              </Link>
            ))}

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={nav.openLabel}
              aria-expanded={open}
              aria-controls="site-menu"
              className="-mr-2 ml-1 inline-flex h-12 w-12 items-center justify-center rounded-lg text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              <Menu className="h-7 w-7" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="site-menu"
          ref={panelRef}
          className="pt-safe pb-safe fixed inset-0 z-50 flex flex-col bg-ink-950/98 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={brand.name}
        >
          <div className="px-safe flex h-16 w-full shrink-0 items-center justify-between">
            <span className="text-[13px]">
              <Logo brand={brand} />
            </span>
            <button
              type="button"
              onClick={closeAndRestoreFocus}
              aria-label={nav.closeLabel}
              className="-mr-2 inline-flex h-12 w-12 items-center justify-center rounded-lg text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              <X className="h-7 w-7" strokeWidth={2.5} />
            </button>
          </div>

          {/* `overscroll-contain`: menü listesinin sonuna gelindiğinde
              kaydırma arkadaki sayfaya zincirlenmesin. */}
          <nav className="px-safe w-full flex-1 overflow-y-auto overscroll-contain py-4">
            <ul className="flex flex-col">
              {nav.items.map((item) =>
                item.href ? (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={closeForNavigation}
                      className={
                        item.emphasis
                          ? // Vurgulu madde (Gönüllü Ol) listeden ayrışsın.
                            "mt-6 flex min-h-13 items-center justify-center bg-accent px-5 font-display text-xl tracking-wide text-ink-950 uppercase transition-colors hover:bg-accent-soft focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                          : "block border-b border-ink-800 py-4 font-display text-2xl tracking-wide text-white uppercase transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
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
                    <span className="rounded-full border border-accent/40 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-accent uppercase">
                      {nav.soonBadge}
                    </span>
                  </li>
                ),
              )}
            </ul>

          </nav>
        </div>
      ) : null}
    </>
  );
}
