import type { InfoSection } from "@/i18n/dictionary";

/**
 * Uzun metinli sayfaların ortak gövdesi: başlık + paragraflar + madde listesi.
 * Kurallar, belgeler ve tanıtım sayfalarının hepsi bunu kullanıyor ki
 * tipografi tek yerden yönetilsin.
 */
export function ProseSections({ sections }: { sections: InfoSection[] }) {
  return (
    <div className="flex flex-col gap-10">
      {sections.map((section, index) => (
        <article key={section.title ?? index}>
          {section.title ? (
            <h2 className="font-display text-xl tracking-wide text-white uppercase sm:text-2xl">
              {section.title}
            </h2>
          ) : null}

          {section.body.map((paragraph) => (
            <p
              key={paragraph}
              className={`text-sm leading-relaxed text-white/75 sm:text-base ${
                section.title ? "mt-4" : "mt-0 first:mt-0"
              }`}
            >
              {paragraph}
            </p>
          ))}

          {section.items.length > 0 ? (
            <ul className="mt-4 flex flex-col gap-3">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-ink-700 pl-4 text-sm leading-relaxed text-white/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </div>
  );
}
