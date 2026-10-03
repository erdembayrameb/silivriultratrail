import en from "@/content/en.json";
import tr from "@/content/tr.json";
import type { Locale } from "./config";

/** Parkur kartlarındaki renk vurgusu — Courses bileşeninde sınıfa çevrilir. */
export type CourseAccent = "cyan" | "green" | "orange";

/**
 * Sayfa anahtarları. Dil değiştirici, aynı sayfanın diğer dildeki adresini
 * `routes` üzerinden bulur — böylece alt sayfada dil değiştirince ana sayfaya
 * düşmek yerine karşılığına gidilir.
 */
export type PageKey =
  | "home"
  | "schedule"
  | "faq"
  | "runnerInfo"
  | "why"
  | "transport"
  | "accommodation"
  | "volunteer"
  | "rules"
  | "documents"
  | "docKvkk"
  | "docConsent"
  | "docWaiver"
  | "course8k"
  | "course18k"
  | "course38k"
  | "startList";

export interface NavItem {
  label: string;
  /** null ise sayfa henüz yok; menüde "yakında" rozetiyle pasif görünür. */
  href: string | null;
  /** true ise menüde vurgulu buton olarak basılır (ör. "Gönüllü Ol"). */
  emphasis?: boolean;
}

/** Parkur detay sayfasındaki CP çizelgesinin bir satırı. */
export interface Checkpoint {
  cp: string;
  station: string;
  /** Start'tan itibaren toplam mesafe; veri yoksa "—". */
  totalKm: string;
  /** Sonraki istasyona mesafe; finişte "—". */
  nextKm: string;
  /** İstasyondaki ikram/hizmet; yoksa boş dize. */
  services: string;
}

export interface Course {
  id: string;
  distance: string;
  name: string;
  accent: CourseAccent;
  /** Ana sayfadaki kartın ve menünün gittiği detay sayfası. */
  href: string;
  elevation: string;
  trailShare: string;
  start: string;
  cutOff: string;
  /** Detay sayfasının başlığı — "8K Gölet Trail Parkuru" gibi. */
  title: string;
  /** Parkurun tek cümlelik karakteri. */
  tagline: string;
  description: string;
  /** Parkur anlatımı; her eleman ayrı paragraf. */
  body: string[];
  checkpoints: Checkpoint[];
  /** `public/gpx/` altındaki dosya adı. */
  gpx: string;
  gearNote: string;
  /** Strava rota gömmesi — parkur detay sayfasında interaktif harita. */
  strava: {
    embedId: string;
    token: string;
    /** Başlangıç görünümü "zoom/lat/lon"; yoksa Strava kendi kadrajını seçer. */
    mapHash: string | null;
    fromEmbed: boolean;
  };
}

export interface SocialLink {
  label: string;
  href: string;
}

/** Kayıt bölümündeki kısa bilgi satırları (kontenjan, son kayıt vb.). */
export interface Highlight {
  label: string;
  value: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  detail: string | null;
}

export interface ScheduleDay {
  date: string;
  weekday: string;
  label: string;
  items: ScheduleItem[];
  note: string | null;
}

export interface FaqItem {
  question: string;
  /** Her eleman ayrı bir paragraf olarak basılır. */
  answer: string[];
}

export interface InfoSection {
  /** null ise bölüm başlıksız basılır (ör. açık rıza metninin gövdesi). */
  title: string | null;
  body: string[];
  items: string[];
}

/** Yarışmacı listesindeki tek satır. */
export interface StartListEntry {
  no: string;
  name: string;
  club: string;
  city: string;
}

export interface FeeRow {
  course: string;
  /** `fees.periods` ile aynı sırada ve aynı uzunlukta olmalı. */
  prices: string[];
}

/**
 * Resmi belge sayfası. `rules` da aynı yapıyı kullanıyor; tek fark hub
 * listesinde görünüp görünmemesi.
 */
export interface LegalDoc {
  title: string;
  /** Belgeler listesindeki tek cümlelik özet. */
  summary: string;
  description: string;
  /** null ise başlığın altında giriş paragrafı basılmaz. */
  intro: string | null;
  sections: InfoSection[];
  /** `public/belgeler/` altındaki PDF; yoksa null. */
  pdf: string | null;
  footnote: string | null;
}

/** Belgeler hub sayfasındaki kart — hangi sayfaya gittiğini `page` söyler. */
export interface DocLink {
  page: PageKey;
}

/** Düz metin içerikli tanıtım sayfaları (Neden SUT, Ulaşım, Konaklama). */
export interface ContentPage {
  title: string;
  description: string;
  /** null ise başlığın altında giriş paragrafı basılmaz. */
  intro: string | null;
  body: string[];
  sections: InfoSection[];
  footnote: string | null;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    abbr: string;
    name: string;
    /**
     * Logodaki büyük harfli kilit. Hazır büyütülmüş tutuluyor çünkü metin
     * karışık dilli: Türkçe büyütme kuralı "Trail" → "TRAİL", İngilizce kuralı
     * ise "Silivri" → "SILIVRI" yapardı.
     */
    wordmark: string;
  };
  routes: Record<PageKey, string>;
  nav: {
    openLabel: string;
    closeLabel: string;
    soonBadge: string;
    skipToContent: string;
    items: NavItem[];
  };
  hero: {
    titleTop: string;
    titleBottom: string;
    tagline: string;
    date: string;
    weekday: string;
    venue: string;
    city: string;
    imageCredit: string | null;
  };
  courses: {
    title: string;
    distanceLabel: string;
    elevationLabel: string;
    trailLabel: string;
    startLabel: string;
    cutOffLabel: string;
    detailLabel: string;
    cpTitle: string;
    cpIntro: string;
    cpHeaders: {
      cp: string;
      station: string;
      total: string;
      next: string;
      services: string;
    };
    profileTitle: string;
    profileHint: string;
    highestLabel: string;
    lowestLabel: string;
    profileNote: string;
    gpxTitle: string;
    gpxNote: string;
    gpxLabel: string;
    stravaTitle: string;
    stravaNote: string;
    stravaLinkLabel: string;
    othersTitle: string;
    items: Course[];
  };
  registration: {
    title: string;
    ctaLabel: string;
    /** false iken CTA kayıt bölümüne kaydırır, true iken href'e gider. */
    open: boolean;
    href: string | null;
    status: string;
    note: string;
    highlights: Highlight[];
    detailsLabel: string;
  };
  pastEdition: {
    label: string;
    href: string | null;
  };
  contact: {
    title: string;
    note: string;
    email: string;
    emergencyLabel: string;
    emergencyPhone: string;
    bubbleLabel: string;
    socials: SocialLink[];
  };
  partners: {
    title: string;
    sponsorNote: string;
    items: { name: string; logo: string }[];
  };
  footer: {
    rights: string;
    backToTop: string;
    languageLabel: string;
    legalLabel: string;
  };
  schedule: {
    title: string;
    description: string;
    intro: string | null;
    days: ScheduleDay[];
    footnote: string;
  };
  faq: {
    title: string;
    description: string;
    intro: string | null;
    items: FaqItem[];
    footnote: string;
  };
  runnerInfo: {
    title: string;
    description: string;
    intro: string | null;
    fees: {
      title: string;
      courseLabel: string;
      periods: string[];
      rows: FeeRow[];
      note: string;
    };
    gear: {
      title: string;
      intro: string;
      items: string[];
      shortCourse: string;
      checks: string;
    };
    sections: InfoSection[];
    disclaimer: string;
  };
  why: ContentPage;
  transport: ContentPage & {
    map: {
      title: string;
      name: string;
      note: string;
      directionsLabel: string;
      lat: number;
      lon: number;
    };
  };
  accommodation: ContentPage;
  volunteer: ContentPage & {
    formTitle: string;
    formIntro: string;
    fields: { label: string; options: string[] }[];
    ctaLabel: string;
    kvkkNote: string;
  };
  rules: LegalDoc;
  documents: {
    title: string;
    description: string;
    intro: string;
    downloadLabel: string;
    items: DocLink[];
    footnote: string;
  };
  docKvkk: LegalDoc;
  docConsent: LegalDoc;
  docWaiver: LegalDoc;
  countdown: {
    label: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    /** Yarış başladıktan sonra sayacın yerine basılan metin. */
    finishedLabel: string;
    /** Hedef an, saat dilimi dahil ISO 8601 (38K startı). */
    target: string;
  };
  startList: {
    title: string;
    description: string;
    intro: string | null;
    /** Kayıtlar açılana kadar her parkurun altında görünen not. */
    emptyNote: string;
    countLabel: string;
    columns: { no: string; name: string; club: string; city: string };
    /** Parkur kimliğine göre kayıtlı sporcular; kayıtlar açıldıkça dolar. */
    groups: { courseId: string; entries: StartListEntry[] }[];
    footnote: string;
  };
}

/*
 * JSON içe aktarımlarında `accent` / `icon` gibi alanlar `string` olarak
 * genişlediği için birebir eşleşmiyor; assertion yalnızca bu daraltmayı yapar,
 * eksik veya fazla alanlar hâlâ derleme hatası verir.
 */
const dictionaries: Record<Locale, Dictionary> = {
  tr: tr as Dictionary,
  en: en as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Parkur sayfası anahtarını parkur kaydına çevirir. */
export function getCourse(dict: Dictionary, page: PageKey): Course {
  const id = page.replace("course", "").toLowerCase();
  const course = dict.courses.items.find((item) => item.id === id);
  if (!course) throw new Error(`Parkur bulunamadı: ${page}`);
  return course;
}

/**
 * Bir sayfanın başlık ve açıklaması. Metadata üretimi ve belgeler hub'ı
 * aynı kaynaktan beslensin diye tek yerde toplandı.
 */
export function getPageMeta(
  dict: Dictionary,
  page: PageKey,
): { title: string; description: string } {
  switch (page) {
    case "home":
      return dict.meta;
    case "schedule":
      return dict.schedule;
    case "faq":
      return dict.faq;
    case "runnerInfo":
      return dict.runnerInfo;
    case "why":
      return dict.why;
    case "transport":
      return dict.transport;
    case "accommodation":
      return dict.accommodation;
    case "volunteer":
      return dict.volunteer;
    case "rules":
      return dict.rules;
    case "documents":
      return dict.documents;
    case "docKvkk":
      return dict.docKvkk;
    case "docConsent":
      return dict.docConsent;
    case "docWaiver":
      return dict.docWaiver;
    case "startList":
      return dict.startList;
    default:
      return getCourse(dict, page);
  }
}

/** Resmi belge sayfası anahtarını belge kaydına çevirir. */
export function getLegalDoc(dict: Dictionary, page: PageKey): LegalDoc {
  switch (page) {
    case "rules":
      return dict.rules;
    case "docKvkk":
      return dict.docKvkk;
    case "docConsent":
      return dict.docConsent;
    case "docWaiver":
      return dict.docWaiver;
    default:
      throw new Error(`Resmi belge sayfası değil: ${page}`);
  }
}

/** Düz metin içerikli tanıtım sayfası anahtarını içeriğe çevirir. */
export function getContentPage(dict: Dictionary, page: PageKey): ContentPage {
  switch (page) {
    case "why":
      return dict.why;
    case "transport":
      return dict.transport;
    case "accommodation":
      return dict.accommodation;
    default:
      throw new Error(`Tanıtım sayfası değil: ${page}`);
  }
}
