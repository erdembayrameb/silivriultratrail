"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionary";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function remainingUntil(target: number): Remaining | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

/* İstemci bileşeni: yalnızca kendi bloğunu alıyor, tüm sözlüğü değil. */
export function Countdown({
  countdown,
}: {
  countdown: Dictionary["countdown"];
}) {
  const target = new Date(countdown.target).getTime();

  /*
   * Sunucuda ve ilk render'da `null`: derleme anındaki süre ile tarayıcıdaki
   * süre farklı olacağı için hydration uyuşmazlığı doğardı. Sayaç ilk
   * efektte doluyor; o ana kadar alan yüksekliği korunuyor.
   */
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const tick = () => {
      const next = remainingUntil(target);
      setRemaining(next);
      setStarted(next === null);
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [target]);

  const cells: { label: string; value: number | null }[] = [
    { label: countdown.days, value: remaining?.days ?? null },
    { label: countdown.hours, value: remaining?.hours ?? null },
    { label: countdown.minutes, value: remaining?.minutes ?? null },
    { label: countdown.seconds, value: remaining?.seconds ?? null },
  ];

  return (
    <section className="border-y border-ink-700 bg-ink-900 py-8 sm:py-10">
      <div className="px-safe mx-auto flex w-full max-w-3xl flex-col items-center">
        <h2 className="text-[11px] font-bold tracking-[0.22em] text-white/50 uppercase">
          {started ? countdown.finishedLabel : countdown.label}
        </h2>

        {started ? null : (
          <ol className="mt-5 grid w-full max-w-md grid-cols-4 gap-2 sm:gap-4">
            {cells.map((cell) => (
              <li
                key={cell.label}
                className="flex flex-col items-center rounded-lg border border-ink-700 bg-ink-950/60 px-1 py-3"
              >
                <span className="font-display text-3xl leading-none text-sut-cyan tabular-nums sm:text-5xl">
                  {cell.value === null
                    ? "––"
                    : String(cell.value).padStart(2, "0")}
                </span>
                <span className="mt-2 text-[10px] font-bold tracking-[0.12em] text-white/45 uppercase sm:text-xs">
                  {cell.label}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
