/**
 * Yarışmacı listesini kayıt platformundan derleme anında çeker.
 *
 * Site statik olduğu için liste HTML'e gömülü geliyor: ziyaretçiye hiç
 * istek attırmıyoruz, sayfa anında açılıyor ve arama motorları da görüyor.
 * Karşılığında liste ancak yeniden derlendiğinde tazeleniyor — bu yüzden
 * deploy workflow'u her gece 03.00'te (TSİ) kendiliğinden çalışıyor.
 *
 * API bir kez bile hata verirse derleme **bilerek** durur. Sebebi: sessizce
 * boş liste yayınlamak, kayıtlı sporcuların adını siteden silmek olurdu.
 * Derleme durunca son başarılı yayın olduğu gibi ayakta kalır.
 * Acil bir içerik düzeltmesini API çökükken yayınlamak gerekirse
 * `SKIP_PARTICIPANTS=1` ile derleme listesiz tamamlanır.
 */

const API_BASE =
  "https://www.hermesentry.com/api/web/races/silivri-ultra-trail/courses";

export interface Participant {
  name: string;
  team: string;
  city: string;
  category: string;
}

/** Platformun döndürdüğü ham kayıt. */
interface ApiParticipant {
  full_name?: string;
  team?: string;
  city?: string;
  age_group_display?: string;
  country?: string;
  country_code?: string;
}

function toParticipant(raw: ApiParticipant): Participant {
  const city = (raw.city ?? "").trim();
  const country = (raw.country ?? "").trim();

  return {
    name: (raw.full_name ?? "").trim(),
    team: (raw.team ?? "").trim(),
    // Yurt dışından gelen sporcularda şehir tek başına anlamsız kalıyor.
    city:
      country && raw.country_code !== "TR"
        ? [city, country].filter(Boolean).join(" · ")
        : city,
    category: (raw.age_group_display ?? "").trim(),
  };
}

async function fetchOnce(courseId: string): Promise<Participant[]> {
  const response = await fetch(`${API_BASE}/${courseId}/participants/`, {
    headers: { Accept: "application/json" },
    // Statik dışa aktarımda sayfanın dinamikleşmemesi için açıkça önbelleğe
    // alınıyor; her derleme zaten taze bir süreçte çalışıyor.
    cache: "force-cache",
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  const data: unknown = await response.json();
  const results =
    typeof data === "object" && data !== null && "results" in data
      ? (data as { results: ApiParticipant[] }).results
      : [];

  return results
    .map(toParticipant)
    .filter((p) => p.name.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name, "tr"));
}

export async function fetchParticipants(
  courseId: string,
): Promise<Participant[]> {
  if (process.env.SKIP_PARTICIPANTS === "1") return [];

  try {
    return await fetchOnce(courseId);
  } catch {
    // Tek seferlik ağ hatalarında derlemeyi düşürmemek için bir kez daha.
    try {
      return await fetchOnce(courseId);
    } catch (error) {
      throw new Error(
        `Yarışmacı listesi alınamadı (kurs ${courseId}): ${
          error instanceof Error ? error.message : String(error)
        }. Derleme bilerek durduruldu; son başarılı yayın ayakta kalıyor. ` +
          `Listesiz derlemek için SKIP_PARTICIPANTS=1.`,
      );
    }
  }
}
