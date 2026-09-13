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

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    abbr: string;
    name: string;
  };
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
