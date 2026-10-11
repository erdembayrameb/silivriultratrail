/**
 * Kayıtların derleme anında açık olup olmadığı — sunucu render'ının
 * başlangıç durumu.
 *
 * Bilinçli olarak istemci kancasından ayrı bir dosyada: `"use client"`
 * taşıyan bir modülün tüm dışa aktarımları istemciye bağlanır ve sunucudan
 * çağrılamaz.
 */
export function registrationOpenAtBuild(
  opensAt: string,
  open: boolean,
): boolean {
  if (!open) return false;
  const target = new Date(opensAt).getTime();
  return !Number.isNaN(target) && Date.now() >= target;
}
