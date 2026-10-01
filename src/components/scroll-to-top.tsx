"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Sayfa değişiminde pencerenin başa dönmesini garanti eder.
 *
 * Menüden bir sayfaya geçildiğinde tarayıcı bazı durumlarda önceki kaydırma
 * konumunu geri veriyor ve kullanıcı yeni sayfanın ortasından — kısa
 * sayfalarda en altından — açılıyordu. Menüdeki kaydırma kilidi artık
 * yönlendirmeden önce açılıyor; bu bileşen de ikinci bir güvence.
 *
 * Adreste çapa (#bolum) varsa karışmıyor, yoksa o çapaya gidiş bozulurdu.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    // `instant`: html üzerindeki `scroll-behavior: smooth` burada istenmiyor.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
