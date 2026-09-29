/*
 * CSS `text-transform: uppercase` büyütme kuralını elementin diline göre
 * uygular. Türkçe'de "i" → "İ" olduğu için `lang="tr"` altında "Trail"
 * kelimesi "TRAİL" olarak basılıyor.
 *
 * Başlıkların çoğu karışık dilli: "Neden Silivri Ultra Trail?" cümlesinde
 * "Silivri" Türkçe kuralla ("SİLİVRİ"), "Trail" ise İngilizce kuralla
 * ("TRAIL") büyümeli. Bu yüzden tüm elemente lang vermek yerine yalnızca
 * İngilizce kelimeler işaretleniyor.
 */
const EN_WORDS = ["Trail"];
const PATTERN = new RegExp(`\\b(${EN_WORDS.join("|")})\\b`, "g");
const EN_WORD_SET = new Set(EN_WORDS);

export function CasedText({ children }: { children: string }) {
  // split, yakalama grubu sayesinde eşleşen kelimeleri de diziye koyuyor.
  const parts = children.split(PATTERN);

  return (
    <>
      {parts.map((part, index) =>
        EN_WORD_SET.has(part) ? (
          <span key={`${part}-${index}`} lang="en">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
