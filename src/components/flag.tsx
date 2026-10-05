import type { Locale } from "@/i18n/config";

/*
 * Bayraklar SVG olarak çiziliyor. Emoji bayraklar (🇹🇷) Windows'ta bayrak
 * olarak değil "TR" harf çifti olarak render ediliyor; görsel tutarlılık
 * için vektör tercih edildi.
 */

function TurkishFlag() {
  return (
    <svg viewBox="0 0 1200 800" aria-hidden="true" className="h-full w-full">
      <rect width="1200" height="800" fill="#e30a17" />
      {/* Hilal: büyük daireden küçük daire çıkarılarak elde edilir */}
      <circle cx="425" cy="400" r="200" fill="#fff" />
      <circle cx="485" cy="400" r="160" fill="#e30a17" />
      {/* Beş köşeli yıldız */}
      <path
        fill="#fff"
        d="M735 400 L636 368 L697 283 L697 384 L792 353 L733 437 L792 521 L697 490 L697 591 L636 506 Z"
        transform="rotate(-90 714 400)"
      />
    </svg>
  );
}

function UnionJack() {
  return (
    <svg viewBox="0 0 1200 600" aria-hidden="true" className="h-full w-full">
      <rect width="1200" height="600" fill="#012169" />
      {/* Beyaz çapraz (saltire) */}
      <path d="M0 0 L1200 600 M1200 0 L0 600" stroke="#fff" strokeWidth="120" />
      {/* Kırmızı çapraz, köşelerde kırpılmış hâliyle */}
      <path
        d="M0 0 L1200 600 M1200 0 L0 600"
        stroke="#c8102e"
        strokeWidth="60"
        clipPath="url(#uj-clip)"
      />
      <clipPath id="uj-clip">
        <path d="M600 300 L1200 300 L1200 600 Z M600 300 L600 600 L0 600 Z M600 300 L0 300 L0 0 Z M600 300 L600 0 L1200 0 Z" />
      </clipPath>
      {/* Beyaz ve kırmızı düz haç */}
      <path d="M600 0 V600 M0 300 H1200" stroke="#fff" strokeWidth="200" />
      <path d="M600 0 V600 M0 300 H1200" stroke="#c8102e" strokeWidth="120" />
    </svg>
  );
}

export function Flag({ locale }: { locale: Locale }) {
  return locale === "tr" ? <TurkishFlag /> : <UnionJack />;
}
