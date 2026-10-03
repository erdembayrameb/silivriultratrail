import { MapPin, Navigation } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionary";

/**
 * Yarış alanı haritası.
 *
 * Harita `pointer-events: none` ile etkileşimsiz bırakılıp tamamı bir
 * bağlantının içine alındı. İki sebebi var: dokunduğun an telefonun harita
 * uygulamasında yol tarifi açılıyor, ve mobilde gömülü haritaların sayfa
 * kaydırmasını yutma sorunu ortadan kalkıyor.
 *
 * Gömme için API anahtarı gerektirmeyen `output=embed` biçimi kullanılıyor.
 */
export function VenueMap({ map }: { map: Dictionary["transport"]["map"] }) {
  const coords = `${map.lat},${map.lon}`;
  const embedSrc = `https://maps.google.com/maps?q=${coords}&z=14&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords}`;

  return (
    <article>
      <h2 className="font-display text-xl tracking-wide text-white uppercase sm:text-2xl">
        {map.title}
      </h2>

      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 block overflow-hidden rounded-lg border border-ink-700 transition-colors hover:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      >
        <span className="relative block">
          <iframe
            src={embedSrc}
            title={map.name}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="pointer-events-none block h-56 w-full border-0 sm:h-72"
          />
        </span>

        <span className="flex items-center justify-between gap-3 bg-ink-900 px-4 py-3">
          <span className="flex items-center gap-2 text-sm font-semibold text-white">
            <MapPin
              className="h-4 w-4 shrink-0 text-accent"
              strokeWidth={2}
              aria-hidden="true"
            />
            {map.name}
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-xs font-bold tracking-wide text-accent uppercase">
            {map.directionsLabel}
            <Navigation className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
          </span>
        </span>
      </a>

      <p className="mt-3 text-xs leading-relaxed text-white/50">{map.note}</p>
    </article>
  );
}
