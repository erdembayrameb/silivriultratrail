import Image, { type StaticImageData } from "next/image";

/**
 * Hero arka planı. Fotoğraf `src/assets/` altından statik import ile geçilir —
 * böylece basePath öneki ve cache-busting hash'i otomatik uygulanır.
 * `src` verilmezse aynı atmosferi veren vektör sahne çizilir.
 */
export function HeroBackdrop({ src }: { src?: StaticImageData | null }) {
  if (src) {
    return (
      <>
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="100vw"
          /* Dikey ekranda ortadan kırpınca ufuk çizgisi kaybolduğu için
             kadraj biraz yukarı alınıyor. */
          className="object-cover object-[50%_38%]"
        />
        {/* Beyaz başlığın fotoğraf üzerinde okunması için karartma. */}
        <div className="absolute inset-0 bg-ink-950/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/25 to-ink-950/95" />
      </>
    );
  }

  return (
    <svg
      viewBox="0 0 800 1200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="sut-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d3644" />
          <stop offset="38%" stopColor="#4a6274" />
          <stop offset="72%" stopColor="#96917f" />
          <stop offset="100%" stopColor="#c9a877" />
        </linearGradient>

        <radialGradient id="sut-sun" cx="0.32" cy="0.42" r="0.42">
          <stop offset="0%" stopColor="#f6d9a4" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#d9a86a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#d9a86a" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="sut-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b39b73" />
          <stop offset="18%" stopColor="#6c7a72" />
          <stop offset="55%" stopColor="#2b4440" />
          <stop offset="100%" stopColor="#12262a" />
        </linearGradient>

        <linearGradient id="sut-vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#05161e" stopOpacity="0.55" />
          <stop offset="42%" stopColor="#05161e" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#05161e" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Gökyüzü ve batan güneş parıltısı */}
      <rect width="800" height="620" fill="url(#sut-sky)" />
      <rect width="800" height="620" fill="url(#sut-sun)" />

      {/* Bulut bantları */}
      <g fill="#ffffff" opacity="0.1">
        <ellipse cx="240" cy="150" rx="210" ry="26" />
        <ellipse cx="560" cy="228" rx="260" ry="20" />
        <ellipse cx="150" cy="300" rx="180" ry="16" />
      </g>

      {/* Uzak tepe sırası */}
      <path
        d="M0 470 L120 402 L230 448 L340 386 L470 452 L600 398 L720 446 L800 414 L800 620 L0 620 Z"
        fill="#3c5560"
        opacity="0.85"
      />
      {/* Orta sıra */}
      <path
        d="M0 512 L110 468 L250 506 L390 452 L520 500 L660 458 L800 498 L800 620 L0 620 Z"
        fill="#27424a"
      />
      {/* Ön sıra — orman bandı */}
      <path
        d="M0 556 L90 528 L200 552 L330 520 L450 550 L580 522 L700 552 L800 534 L800 620 L0 620 Z"
        fill="#16323a"
      />

      {/* Su yüzeyi */}
      <rect y="580" width="800" height="620" fill="url(#sut-water)" />

      {/* Ormanın suya yansıması */}
      <path
        d="M0 580 L90 606 L200 584 L330 614 L450 586 L580 612 L700 584 L800 600 L800 580 Z"
        fill="#16323a"
        opacity="0.55"
      />

      {/* Su üzerindeki ışık çizgileri */}
      <g stroke="#e9cfa0" strokeLinecap="round" opacity="0.35">
        <path d="M180 640 H340" strokeWidth="3" />
        <path d="M220 684 H420" strokeWidth="2.5" opacity="0.8" />
        <path d="M150 726 H300" strokeWidth="2" opacity="0.6" />
        <path d="M470 664 H610" strokeWidth="2" opacity="0.5" />
      </g>

      {/* Sazlık adacıkları */}
      <g fill="#14312f" opacity="0.9">
        <ellipse cx="90" cy="760" rx="120" ry="26" />
        <ellipse cx="690" cy="806" rx="150" ry="30" />
        <ellipse cx="250" cy="900" rx="130" ry="30" />
        <ellipse cx="620" cy="980" rx="180" ry="36" />
        <ellipse cx="120" cy="1060" rx="160" ry="40" />
      </g>

      {/* Merkeze uzanan ahşap iskele */}
      <path d="M368 620 L432 620 L470 1200 L330 1200 Z" fill="#2a2b26" />
      <path d="M377 620 L423 620 L452 1200 L348 1200 Z" fill="#3d3a30" />
      <g stroke="#20211d" strokeWidth="4" opacity="0.7">
        <path d="M374 700 H426" />
        <path d="M370 800 H430" />
        <path d="M364 910 H436" />
        <path d="M357 1030 H443" />
        <path d="M350 1160 H450" />
      </g>

      {/* Okunabilirlik için genel karartma */}
      <rect width="800" height="1200" fill="url(#sut-vignette)" />
    </svg>
  );
}
