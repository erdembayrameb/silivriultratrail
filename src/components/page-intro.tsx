/**
 * Alt sayfaların başlık bloğu. `id="ust"` burada duruyor ki footer'daki
 * "Başa dön" bağlantısı her sayfada çalışsın.
 */
export function PageIntro({ title, intro }: { title: string; intro: string }) {
  return (
    <section id="ust" className="bg-ink-900 pt-12 pb-10 sm:pt-16 sm:pb-14">
      <div className="px-safe mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <h1 className="font-brush text-4xl text-white uppercase sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-prose text-sm leading-relaxed text-balance text-white/70 sm:text-base">
          {intro}
        </p>
      </div>
    </section>
  );
}
