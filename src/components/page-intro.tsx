import Image from "next/image";
import hero from "@/assets/hero.jpg";
import { CasedText } from "@/components/cased-text";

/**
 * Alt sayfaların başlık bloğu. `id="ust"` burada duruyor ki footer'daki
 * "Başa dön" bağlantısı her sayfada çalışsın. `intro` null geçilirse
 * başlığın altına paragraf basılmaz.
 *
 * Arka planda yarış alanı fotoğrafı var; üzerine metni okunur kılan iki
 * katmanlı karartma uygulanıyor.
 */
export function PageIntro({
  title,
  intro,
}: {
  title: string;
  intro: string | null;
}) {
  return (
    <section id="ust" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink-950/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/40 to-ink-950/95" />
      </div>

      <div className="px-safe mx-auto flex w-full max-w-3xl flex-col items-center py-14 text-center sm:py-20">
        <h1 className="font-brush text-4xl text-white uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] sm:text-6xl">
          <CasedText>{title}</CasedText>
        </h1>
        {intro ? (
          <p className="mt-5 max-w-prose text-sm leading-relaxed text-balance text-white/85 sm:text-base">
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  );
}
