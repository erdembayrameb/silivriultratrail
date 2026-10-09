import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { absoluteUrl } from "@/lib/site-url";

/**
 * schema.org yapısal verisi. Google bu sayede yarışı bir "etkinlik" olarak
 * tanıyıp arama sonuçlarında tarih, yer ve kayıt bilgisiyle gösterebiliyor —
 * düz metinden çıkarım yapmasını beklemek yerine doğrudan söylüyoruz.
 *
 * Her parkur ayrı bir alt etkinlik; böylece 8K/18K/38K ayrı ayrı görünür.
 */
export function EventSchema({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { brand, hero, meta, courses, registration, contact } = dict;

  // "04 Nisan 2027" metnini değil, makine okunur tarihi veriyoruz.
  const raceDate = "2027-04-04";

  const location = {
    "@type": "Place",
    name: hero.venue,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Silivri",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
  };

  const organizer = {
    "@type": "Organization",
    name: brand.name,
    url: absoluteUrl(dict.routes.home),
    email: contact.email,
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: brand.name,
    description: meta.description,
    url: absoluteUrl(dict.routes.home),
    startDate: `${raceDate}T07:00:00+03:00`,
    endDate: `${raceDate}T15:30:00+03:00`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Trail running",
    inLanguage: locale,
    location,
    organizer,
    maximumAttendeeCapacity: 1500,
    offers: {
      "@type": "Offer",
      // Kayıtlar henüz açılmadı. Açılış tarihi belli olduğunda buraya
      // `availabilityStarts` eklenebilir.
      availability: registration.open
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      validThrough: "2027-03-28T23:59:00+03:00",
      priceCurrency: "TRY",
      url: registration.href ?? absoluteUrl(dict.routes.runnerInfo),
    },
    subEvent: courses.items.map((course) => ({
      "@type": "SportsEvent",
      name: `${course.distance} ${course.name}`,
      description: course.description,
      url: absoluteUrl(course.href),
      startDate: `${raceDate}T${course.start}:00+03:00`,
      sport: "Trail running",
      location,
      organizer,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Veri bizim ürettiğimiz sabit sözlükten geliyor, kullanıcı girdisi yok.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
