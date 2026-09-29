import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * GPX dosyaları derleme anında okunur; tarayıcıya ham GPX inmez, yalnızca
 * seyrekleştirilmiş profil noktaları sayfanın HTML'ine gömülür. Dosyalar
 * `public/gpx/` altında duruyor, çünkü aynı dosya indirme bağlantısı olarak
 * da sunuluyor.
 */
export interface ElevationPoint {
  /** Start'tan itibaren kat edilen mesafe (km). */
  km: number;
  /** Deniz seviyesinden yükseklik (m). */
  ele: number;
}

export interface CourseProfile {
  points: ElevationPoint[];
  distanceKm: number;
  minEle: number;
  maxEle: number;
  /** Toplam tırmanış (m) — gürültü filtrelenmiş. */
  ascent: number;
  descent: number;
}

const EARTH_RADIUS_KM = 6371;

function haversineKm(
  aLat: number,
  aLon: number,
  bLat: number,
  bLon: number,
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLon = toRad(bLon - aLon);
  const lat1 = toRad(aLat);
  const lat2 = toRad(bLat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/**
 * Barometrik/GPS gürültüsü toplam tırmanışı şişirdiği için, ardışık iki nokta
 * arasındaki fark bu eşiğin altındaysa sayılmıyor. Trail hesaplarında yaygın
 * bir eşik.
 */
const ASCENT_THRESHOLD_M = 2;

const TRKPT = /<trkpt\s+lat="([-\d.]+)"\s+lon="([-\d.]+)"\s*>([\s\S]*?)<\/trkpt>/g;
const ELE = /<ele>([-\d.]+)<\/ele>/;

/** Aynı dosya birden çok sayfada kullanıldığında tekrar ayrıştırılmasın. */
const cache = new Map<string, CourseProfile>();

export function readCourseProfile(
  fileName: string,
  maxPoints = 140,
): CourseProfile {
  const cached = cache.get(fileName);
  if (cached) return cached;

  const xml = readFileSync(
    path.join(process.cwd(), "public", "gpx", fileName),
    "utf8",
  );

  const raw: ElevationPoint[] = [];
  let cumulativeKm = 0;
  let previous: { lat: number; lon: number } | null = null;
  let ascent = 0;
  let descent = 0;
  let previousEle: number | null = null;

  for (const match of xml.matchAll(TRKPT)) {
    const lat = Number(match[1]);
    const lon = Number(match[2]);
    const eleMatch = ELE.exec(match[3]);
    if (!eleMatch) continue;
    const ele = Number(eleMatch[1]);

    if (previous) {
      cumulativeKm += haversineKm(previous.lat, previous.lon, lat, lon);
    }
    previous = { lat, lon };

    if (previousEle !== null) {
      const delta = ele - previousEle;
      if (delta >= ASCENT_THRESHOLD_M) {
        ascent += delta;
        previousEle = ele;
      } else if (delta <= -ASCENT_THRESHOLD_M) {
        descent -= delta;
        previousEle = ele;
      }
    } else {
      previousEle = ele;
    }

    raw.push({ km: cumulativeKm, ele });
  }

  if (raw.length === 0) {
    throw new Error(`GPX dosyasında iz noktası bulunamadı: ${fileName}`);
  }

  // Seyrekleştirme: her adımda o aralığın en uç yüksekliğini koruyarak
  // zirveleri ve vadileri düzleştirmeden nokta sayısını düşürüyoruz.
  const step = Math.max(1, Math.ceil(raw.length / maxPoints));
  const points: ElevationPoint[] = [];

  for (let i = 0; i < raw.length; i += step) {
    const slice = raw.slice(i, i + step);
    const extreme = slice.reduce((acc, point) =>
      Math.abs(point.ele - slice[0].ele) > Math.abs(acc.ele - slice[0].ele)
        ? point
        : acc,
    );
    points.push({ km: slice[0].km, ele: extreme.ele });
  }

  const last = raw[raw.length - 1];
  if (points[points.length - 1].km !== last.km) points.push(last);

  const elevations = raw.map((point) => point.ele);

  const profile: CourseProfile = {
    points,
    distanceKm: last.km,
    minEle: Math.min(...elevations),
    maxEle: Math.max(...elevations),
    ascent: Math.round(ascent),
    descent: Math.round(descent),
  };

  cache.set(fileName, profile);
  return profile;
}
