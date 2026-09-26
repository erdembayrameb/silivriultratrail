import en from "@/content/en.json";
import tr from "@/content/tr.json";
import type { Locale } from "./config";

/** Parkur kartlarındaki renk vurgusu — Courses bileşeninde sınıfa çevrilir. */
export type CourseAccent = "cyan" | "green" | "orange";

/** Özellik şeridindeki ikon anahtarı — Features bileşeninde bileşene çevrilir. */
export type FeatureIcon =
  | "mountain"
  | "nature"
  | "shield"
  | "timer"
  | "rescue"
  | "medal";

/**
 * Sayfa anahtarları. Dil değiştirici, aynı sayfanın diğer dildeki adresini
 * `routes` üzerinden bulur — böylece alt sayfada dil değiştirince ana sayfaya
 * düşmek yerine karşılığına gidilir.
 */
export type PageKey = "home" | "schedule" | "faq" | "runnerInfo";

export interface NavItem {
  label: string;
  /** null ise sayfa henüz yok; menüde "yakında" rozetiyle pasif görünür. */
  href: string | null;
}

export interface Course {
  id: string;
  distance: string;
  name: string;
  elevation: string;
  trailShare: string;
  start: string;
  accent: CourseAccent;
}

export interface Feature {
  icon: FeatureIcon;
  label: string;
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
  title: string;
  body: string[];
  items: string[];
}

export interface FeeRow {
  course: string;
  /** `fees.periods` ile aynı sırada ve aynı uzunlukta olmalı. */
  prices: string[];
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    abbr: string;
    name: string;
  };
  routes: Record<PageKey, string>;
  nav: {
    openLabel: string;
    closeLabel: string;
    soonBadge: string;
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
    elevationLabel: string;
    trailLabel: string;
    startLabel: string;
    items: Course[];
  };
  features: {
    title: string;
    items: Feature[];
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
    bubbleLabel: string;
    socials: SocialLink[];
  };
  footer: {
    rights: string;
    backToTop: string;
    languageLabel: string;
  };
  schedule: {
    title: string;
    description: string;
    intro: string;
    days: ScheduleDay[];
    footnote: string;
  };
  faq: {
    title: string;
    description: string;
    intro: string;
    items: FaqItem[];
    footnote: string;
  };
  runnerInfo: {
    title: string;
    description: string;
    intro: string;
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
