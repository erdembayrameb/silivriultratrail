import Image, { type StaticImageData } from "next/image";
import gsb from "@/assets/kurumlar/genclik-ve-spor-bakanligi.jpeg";
import valilik from "@/assets/kurumlar/istanbul-valiligi.jpeg";
import silivri from "@/assets/kurumlar/silivri-belediyesi.jpeg";
import taf from "@/assets/kurumlar/turkiye-atletizm-federasyonu.jpeg";
import type { Dictionary } from "@/i18n/dictionary";

/*
 * Logolar statik import ile geliyor; adres öneki ve cache sürümü otomatik
 * doğru üretiliyor. Sponsor anlaşmaları yapıldıkça aynı ızgaraya eklenecek.
 */
const logos: Record<string, StaticImageData> = {
  gsb,
  taf,
  valilik,
  silivri,
};

export function Partners({ dict }: { dict: Dictionary }) {
  const { partners } = dict;

  return (
    <section className="border-t border-ink-900/10 bg-sand pt-10 pb-2">
      <div className="px-safe mx-auto w-full max-w-5xl">
        <h2 className="text-center text-[11px] font-bold tracking-[0.22em] text-ink-900/50 uppercase">
          {partners.title}
        </h2>

        <ul className="mt-6 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-4">
          {partners.items.map((item) => (
            <li key={item.name} className="flex justify-center">
              {/* Logolar beyaz zeminli JPEG; krem footer üzerinde
                  `mix-blend-multiply` ile beyaz kutu görünmüyor. */}
              <Image
                src={logos[item.logo]}
                alt={item.name}
                height={72}
                className="h-16 w-auto object-contain mix-blend-multiply sm:h-20"
              />
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-xs text-ink-900/50">
          {partners.sponsorNote}
        </p>
      </div>
    </section>
  );
}
