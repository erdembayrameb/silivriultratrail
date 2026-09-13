import {
  Award,
  BriefcaseMedical,
  MapPin,
  Mountain,
  ShieldCheck,
  Timer,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary, FeatureIcon } from "@/i18n/dictionary";

const icons: Record<FeatureIcon, LucideIcon> = {
  mountain: Mountain,
  nature: MapPin,
  shield: ShieldCheck,
  timer: Timer,
  rescue: BriefcaseMedical,
  medal: Award,
};

export function Features({ dict }: { dict: Dictionary }) {
  const { features } = dict;

  return (
    <section id="ozellikler" className="bg-ink-950 py-12 sm:py-16">
      <h2 className="sr-only">{features.title}</h2>

      <div className="px-safe mx-auto w-full max-w-5xl">
        {/*
          Taslakta altı madde tek sırada; 400px altında okunaklı kalması için
          önce 3'lü ızgaraya düşüyor, sonra tek sıraya açılıyor.
        */}
        <ul className="grid grid-cols-3 gap-y-8 min-[420px]:grid-cols-6 min-[420px]:gap-y-0">
          {features.items.map((feature, index) => {
            const Icon = icons[feature.icon];
            // Ayırıcı çizgi satır başlarında görünmesin: mobilde 3'lü ızgarada
            // 0 ve 3. madde satır başı, tek sıraya geçince yalnızca 0. madde.
            const divider =
              index === 0
                ? ""
                : index % 3 === 0
                  ? "min-[420px]:border-l min-[420px]:border-white/12"
                  : "border-l border-white/12";

            return (
              <li
                key={feature.icon}
                className={`flex flex-col items-center px-1 text-center ${divider}`}
              >
                <Icon
                  className="h-7 w-7 text-sut-cyan sm:h-9 sm:w-9"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="mt-3 text-[10px] leading-snug font-semibold tracking-wide text-balance text-white/85 uppercase sm:text-xs">
                  {feature.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
