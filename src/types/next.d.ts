/**
 * Next bu referansları `next-env.d.ts` dosyasına yazıyor, ama o dosya üretilen
 * bir çıktı ve `.gitignore` içinde — temiz bir klonda ya da CI'da build
 * çalışmadan önce mevcut olmuyor. Bu da `tsc`'nin görsel import'larını
 * (`import hero from "@/assets/hero.jpg"`) tanımamasına yol açıyor.
 * Aynı referansları depoya giren bu dosyada tutuyoruz ki `npm run typecheck`
 * tek başına da çalışsın.
 */
/// <reference types="next" />
/// <reference types="next/image-types/global" />
