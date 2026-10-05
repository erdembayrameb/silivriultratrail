"use client";

import { useEffect, useRef } from "react";
import type { Course } from "@/i18n/dictionary";

const EMBED_SCRIPT = "https://strava-embeds.com/embed.js";

/**
 * Strava rota gömmesi.
 *
 * Strava'nın betiği sayfadaki `.strava-embed-placeholder` kutularını açılışta
 * bir kez tarıyor. Sayfalar arası geçiş istemci tarafında olduğu için betik
 * zaten yüklüyse yeniden eklenmesi işe yaramaz; bu yüzden betik her
 * bağlanmada yeniden iliştirilip tarama tetikleniyor.
 *
 * Betik üçüncü taraf: yüklenemezse (ağ, reklam engelleyici) kutu boş kalır,
 * bu yüzden altında her zaman doğrudan Strava bağlantısı duruyor.
 */
export function StravaRoute({ strava }: { strava: Course["strava"] }) {
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div
      ref={holderRef}
      className="strava-embed-placeholder mt-5 overflow-hidden rounded-lg border border-ink-700"
      data-embed-type="route"
      data-embed-id={strava.embedId}
      data-style="standard"
      data-from-embed={String(strava.fromEmbed)}
      /* Strava'nın betiği `route` gömmelerinde bu seçeneği destekliyor:
         iframe 554px sabit genişlik yerine kapsayıcının tamamını kaplıyor. */
      data-full-width="true"
      data-token={strava.token}
      {...(strava.mapHash ? { "data-map-hash": strava.mapHash } : {})}
    />
  );
}
