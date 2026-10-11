"use client";

import { useEffect, useState } from "react";

/**
 * Kayıtların açılıp açılmadığını tarayıcı saatine göre söyler.
 *
 * Site statik olduğu için "kayıt açıldı" anahtarını sunucu çeviremiyor;
 * derleme anındaki durum HTML'e gömülüyor. Bu yüzden:
 *   - `defaultOpen` derleme anında hesaplanıp sunucu render'ına yazılıyor
 *     (derleme açılıştan sonraysa sayfa doğrudan açık geliyor, titreme yok),
 *   - tarayıcıda efekt her dakika kontrol ediyor, böylece açılış anında
 *     sayfa yenilenmeden kendiliğinden değişiyor.
 */
export function useRegistrationOpen(
  opensAt: string,
  defaultOpen: boolean,
): boolean {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    const target = new Date(opensAt).getTime();
    if (Number.isNaN(target)) return;

    const check = () => setIsOpen(Date.now() >= target);
    check();

    const timer = setInterval(check, 30_000);
    return () => clearInterval(timer);
  }, [opensAt]);

  return isOpen;
}
