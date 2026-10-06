import type { Locale } from "@/i18n/config";

/*
 * Bayraklar SVG olarak çiziliyor. Emoji bayraklar (🇹🇷) Windows'ta bayrak
 * olarak değil "TR" harf çifti olarak render ediliyor.
 *
 * İkisi de 3:2 kutuya yerleşiyor ki başlıkta yan yana aynı boyda dursunlar.
 */

/**
 * Türk bayrağı — Türk Bayrağı Kanunu'ndaki yerleşim ölçüleriyle.
 * Bayrak 1200x800 (3:2) kabul edildiğinde:
 *   büyük daire  : merkez (425, 400), yarıçap 200  (çap = en/2)
 *   küçük daire  : merkez (475, 400), yarıçap 160  (çap = en/2,5)
 *   yıldız       : çevrel çemberin çapı en/4, merkezi soldan 0,815 en
 */
function TurkishFlag() {
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="h-full w-full"
    >
      <rect width="1200" height="800" fill="#e30a17" />
      {/* Hilal: beyaz daireden kırmızı daire çıkarılarak oluşur */}
      <circle cx="425" cy="400" r="200" fill="#fff" />
      <circle cx="475" cy="400" r="160" fill="#e30a17" />
      {/* Beş köşeli yıldız; bir ucu hilale bakar */}
      <path
        fill="#fff"
        d="m583.334 400 180.902-58.779-111.804 153.885v-190.212l111.804 153.885z"
      />
    </svg>
  );
}

/**
 * Union Jack. Doğal oranı 1:2 olduğu için 3:2 kutuda `slice` ile
 * kırpılıyor — desen simetrik olduğundan kenarlardan eşit kırpma
 * gözle fark edilmiyor.
 */
function UnionJack() {
  return (
    <svg
      viewBox="0 0 60 30"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="h-full w-full"
    >
      <clipPath id="union-jack-diagonals">
        {/* Çaprazların kırmızı şeridi her çeyrekte farklı tarafa kayar */}
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath="url(#union-jack-diagonals)"
        stroke="#c8102e"
        strokeWidth="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  );
}

export function Flag({ locale }: { locale: Locale }) {
  return locale === "tr" ? <TurkishFlag /> : <UnionJack />;
}
