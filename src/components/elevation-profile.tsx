"use client";

import { useId, useRef, useState } from "react";
import type { CourseAccent } from "@/i18n/dictionary";
import type { CourseProfile } from "@/lib/gpx";

/* Tailwind sınıfları derleme sırasında taranabilmesi için tam yazılıyor. */
const accentStroke: Record<CourseAccent, string> = {
  cyan: "stroke-sut-cyan",
  green: "stroke-sut-green",
  orange: "stroke-sut-orange",
};

const accentFill: Record<CourseAccent, string> = {
  cyan: "fill-sut-cyan",
  green: "fill-sut-green",
  orange: "fill-sut-orange",
};

const accentText: Record<CourseAccent, string> = {
  cyan: "text-sut-cyan",
  green: "text-sut-green",
  orange: "text-sut-orange",
};

/* Çizim alanı. viewBox sabit; SVG genişliği kapsayıcıya göre esniyor. */
const W = 720;
const H = 200;
const PAD = { top: 16, right: 8, bottom: 26, left: 38 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

/** Y ekseni için okunaklı bir adım seç (10/20/25/50/100 m). */
function niceStep(range: number): number {
  const candidates = [10, 20, 25, 50, 100, 200];
  return (
    candidates.find((step) => range / step <= 5) ??
    candidates[candidates.length - 1]
  );
}

export function ElevationProfile({
  profile,
  accent,
  labels,
}: {
  profile: CourseProfile;
  accent: CourseAccent;
  labels: {
    /** Grafiğin ne anlattığını ekran okuyucuya anlatan cümle. */
    caption: string;
    distance: string;
    elevation: string;
    highest: string;
    lowest: string;
  };
}) {
  const gradientId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const { points, distanceKm, minEle, maxEle } = profile;

  const step = niceStep(maxEle - minEle);
  const yMin = Math.floor(minEle / step) * step;
  const yMax = Math.ceil(maxEle / step) * step;

  const toX = (km: number) => PAD.left + (km / distanceKm) * PLOT_W;
  const toY = (ele: number) =>
    PAD.top + PLOT_H - ((ele - yMin) / (yMax - yMin)) * PLOT_H;

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.km).toFixed(1)} ${toY(p.ele).toFixed(1)}`)
    .join(" ");

  const baseline = PAD.top + PLOT_H;
  const area = `${line} L${toX(distanceKm).toFixed(1)} ${baseline} L${PAD.left} ${baseline} Z`;

  const gridLines: number[] = [];
  for (let ele = yMin; ele <= yMax; ele += step) gridLines.push(ele);

  // Zirveyi doğrudan etiketliyoruz — her noktaya sayı basmak yerine tek,
  // anlamlı işaret.
  const peak = points.reduce((a, b) => (b.ele > a.ele ? b : a));

  const active = hover === null ? null : points[hover];

  /** İşaretçi/dokunma konumunu en yakın profil noktasına eşler. */
  const track = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const km = ((ratio * W - PAD.left) / PLOT_W) * distanceKm;

    let nearest = 0;
    let best = Infinity;
    points.forEach((point, index) => {
      const diff = Math.abs(point.km - km);
      if (diff < best) {
        best = diff;
        nearest = index;
      }
    });
    setHover(nearest);
  };

  return (
    <figure className="mt-5">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full touch-pan-y"
        role="img"
        /* Ekran okuyucuya grafiğin özeti; ipucu metni değil gerçek sayılar. */
        aria-label={`${labels.elevation} — ${distanceKm.toFixed(2)} km, ${labels.highest} ${Math.round(maxEle)} m, ${labels.lowest} ${Math.round(minEle)} m`}
        onPointerMove={(event) => track(event.clientX)}
        onPointerDown={(event) => track(event.clientX)}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              className={accentFill[accent]}
              stopOpacity="0.38"
            />
            <stop
              offset="100%"
              className={accentFill[accent]}
              stopOpacity="0.02"
            />
          </linearGradient>
        </defs>

        {/* Izgara ve y ekseni — bilinçli olarak geri planda */}
        {gridLines.map((ele) => (
          <g key={ele}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={toY(ele)}
              y2={toY(ele)}
              stroke="currentColor"
              strokeWidth="1"
              className="text-white/10"
            />
            <text
              x={PAD.left - 8}
              y={toY(ele)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-white/40 text-[13px]"
            >
              {ele}
            </text>
          </g>
        ))}

        <path d={area} fill={`url(#${gradientId})`} />
        <path
          d={line}
          fill="none"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          className={accentStroke[accent]}
          vectorEffect="non-scaling-stroke"
        />

        {/* Zirve işareti — tek doğrudan etiket */}
        <circle
          cx={toX(peak.km)}
          cy={toY(peak.ele)}
          r="4"
          className={accentFill[accent]}
          stroke="#05161e"
          strokeWidth="2"
        />
        <text
          x={toX(peak.km)}
          y={toY(peak.ele) - 10}
          textAnchor={toX(peak.km) > W * 0.8 ? "end" : "middle"}
          className="fill-white/75 text-[13px] font-semibold"
        >
          {Math.round(peak.ele)} m
        </text>

        {/* x ekseni uçları */}
        <text
          x={PAD.left}
          y={H - 6}
          className="fill-white/40 text-[13px]"
          textAnchor="start"
        >
          0 km
        </text>
        <text
          x={W - PAD.right}
          y={H - 6}
          className="fill-white/40 text-[13px]"
          textAnchor="end"
        >
          {distanceKm.toFixed(1)} km
        </text>

        {/* İmleç katmanı */}
        {active ? (
          <g>
            <line
              x1={toX(active.km)}
              x2={toX(active.km)}
              y1={PAD.top}
              y2={baseline}
              stroke="currentColor"
              strokeWidth="1"
              className="text-white/45"
            />
            <circle
              cx={toX(active.km)}
              cy={toY(active.ele)}
              r="5"
              className={accentFill[accent]}
              stroke="#05161e"
              strokeWidth="2"
            />
          </g>
        ) : null}
      </svg>

      {/*
       * Okuma satırı: dokunmatikte parmağı sürdükçe güncellenir. Bilinçli
       * olarak `aria-live` yok — sürükleme sırasında saniyede onlarca duyuru
       * üretirdi; aynı sayılar aşağıdaki listede zaten okunabiliyor.
       */}
      <p
        aria-hidden="true"
        className="mt-2 min-h-6 text-center text-xs font-semibold text-white/70"
      >
        {active ? (
          <>
            <span className={accentText[accent]}>
              {active.km.toFixed(1)} km
            </span>
            <span className="text-white/35"> · </span>
            {Math.round(active.ele)} m
          </>
        ) : (
          <span className="text-white/45">{labels.caption}</span>
        )}
      </p>

      {/* Grafiğin sayısal karşılığı — renk veya çizim tek taşıyıcı değil. */}
      <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-center">
        <div>
          <dt className="text-[10px] font-bold tracking-[0.14em] text-white/45 uppercase">
            {labels.distance}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-white/90">
            {distanceKm.toFixed(2)} km
          </dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold tracking-[0.14em] text-white/45 uppercase">
            {labels.highest}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-white/90">
            {Math.round(maxEle)} m
          </dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold tracking-[0.14em] text-white/45 uppercase">
            {labels.lowest}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-white/90">
            {Math.round(minEle)} m
          </dd>
        </div>
      </dl>
    </figure>
  );
}
