import Image, { type StaticImageData } from "next/image";
import gsb from "@/assets/kurumlar/genclik-ve-spor-bakanligi.jpeg";
import valilik from "@/assets/kurumlar/istanbul-valiligi.jpeg";
import kupefm from "@/assets/kurumlar/kupe-fm.jpeg";
import silivri from "@/assets/kurumlar/silivri-belediyesi.jpeg";
import taf from "@/assets/kurumlar/turkiye-atletizm-federasyonu.jpeg";
import type { Dictionary } from "@/i18n/dictionary";

/*
 * Logolar statik import ile geliyor; adres öneki ve cache sürümü otomatik
 * doğru üretiliyor. Yeni sponsor eklerken dosyayı buraya tanıtıp içerik
 * dosyasındaki ilgili gruba bir satır yazmak yeterli.
 */
const logos: Record<string, StaticImageData> = {
  gsb,
  taf,
  valilik,
  silivri,
  kupefm,
};

export function Partners({ dict }: { dict: Dictionary }) {
  const { partners } = dict;

  return (
    <section className="border-t border-ink-900/10 bg-sand pt-10 pb-2">
      <div className="px-safe mx-auto flex w-full max-w-5xl flex-col gap-10">
        {partners.groups.map((group) => (
          <div key={group.title}>
            <h2 className="text-center text-[11px] font-bold tracking-[0.22em] text-ink-900/50 uppercase">
              {group.title}
            </h2>

            {/* Esnek sıra: grup kaç logo içerirse içersin ortalı kalıyor. */}
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
              {group.items.map((item) => (
                <li key={item.name} className="flex justify-center">
                  {/* Logolar beyaz zeminli JPEG; krem footer üzerinde
                      `mix-blend-multiply` ile beyaz kutu görünmüyor. */}
                  <Image
                    src={logos[item.logo]}
                    alt={item.name}
                    height={80}
                    className="h-16 w-auto object-contain mix-blend-multiply sm:h-20"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="text-center text-xs text-ink-900/50">
          {partners.sponsorNote}
        </p>
      </div>
    </section>
  );
}
