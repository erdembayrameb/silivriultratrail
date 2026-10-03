import { MessageCircle } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionary";

/**
 * Taslaktaki sağ alt sohbet balonu. Şimdilik e-posta açıyor; WhatsApp hattı
 * belirlendiğinde href tek satırda `https://wa.me/...` olarak değiştirilebilir.
 */
export function FloatingContact({ dict }: { dict: Dictionary }) {
  const { contact } = dict;

  return (
    <a
      href={`mailto:${contact.email}`}
      aria-label={contact.bubbleLabel}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink-900 shadow-lg shadow-black/30 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
    </a>
  );
}
