# Silivri Ultra Trail

4 Nisan 2027 · Danamandıra Tabiat Parkı, Silivri / İstanbul

Mobil öncelikli tanıtım sitesi. Next.js 16 (App Router) + Tailwind v4, tamamen
statik çıktı üretir; GitHub Pages'te yayınlanmak üzere kurulmuştur.

## Komutlar

| Komut               | Ne yapar                                     |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Geliştirme sunucusu — http://localhost:3000  |
| `npm run build`     | `out/` klasörüne statik site üretir          |
| `npm run lint`      | ESLint                                       |
| `npm run typecheck` | TypeScript kontrolü                          |

## İçerik nasıl güncellenir

Sitedeki tüm metinler iki dosyada:

- `src/content/tr.json`
- `src/content/en.json`

İki dosya da aynı anahtarları taşımak zorunda; biri eksik kalırsa
`npm run typecheck` hata verir. Şema `src/i18n/dictionary.ts` içinde tanımlı.

Sık değişecek alanlar:

| Ne                    | Nerede                                            |
| --------------------- | ------------------------------------------------- |
| Tarih, yer, slogan    | `hero`                                            |
| Parkur bilgileri      | `courses.items` — mesafe, tırmanış, start saati   |
| Kayıt durumu          | `registration` — `open: true` + `href` ile açılır |
| Menü maddeleri        | `nav.items` — `href: null` olanlar "yakında"      |
| Etkinlik programı     | `schedule.days`                                   |
| S.S.S.                | `faq.items`                                       |
| Ücretler, kurallar    | `runnerInfo`                                      |
| 2025 sayfası butonu   | `pastEdition.href` — `null` iken bölüm gizlenir   |
| E-posta, sosyal medya | `contact`                                         |

`registration.status` tarihe bağlı bir cümle taşıyor ("Erken kayıt … açılıyor");
kayıt dönemi değiştikçe elle güncellenmeli.

## Sayfalar

| Sayfa             | TR                    | EN                   |
| ----------------- | --------------------- | -------------------- |
| Ana sayfa         | `/`                   | `/en/`               |
| Program           | `/program/`           | `/en/schedule/`      |
| Yarışçı Bilgileri | `/yarisci-bilgileri/` | `/en/runner-info/`   |
| S.S.S.            | `/sss/`               | `/en/faq/`           |

Adresler içerik dosyalarındaki `routes` alanında duruyor. Dil değiştirici bu
alanı kullanarak bulunduğun sayfanın diğer dildeki karşılığına gider; adres
değiştirilirse hem `routes` hem `nav.items` hem de `src/app` altındaki klasör
adı birlikte güncellenmeli.

Ortak iskelet (header + footer + iletişim balonu) `src/components/page-shell.tsx`
içinde; her sayfa kendi `PageKey`'i ile bunu sarmalıyor.

## Tasarım

Marka renkleri tek yerde: `src/app/globals.css` içindeki `@theme` bloğu
(`--color-sut-*`, `--color-ink-*`, `--color-sand`). Gerçek logo geldiğinde
`src/components/logo.tsx` değiştirilir.

`public/` altındaki dosyalara giden düz `<a href>` bağlantılarında
`src/lib/asset-path.ts` içindeki `assetPath()` kullanılmalı: `next/link` ve
`next/image` adres önekini kendileri ekler, ham `<a href>` eklemez.

Sosyal medya önizleme görseli `public/og-image.png` (1200x630), uygulama ikonu
`public/icon-512.png` ve `public/icon.svg`. Üçü de `next/og` ile bir kez
üretilip depoya alındı — üretici rotalar uzantısız adres döndürdüğü için
GitHub Pages bunları yanlış içerik tipiyle sunuyordu.

Hero arka planı `src/assets/hero.jpg`. Fotoğrafı değiştirmek için aynı yola
yeni dosyayı yazmak yeterli — statik import olduğu için adres öneki ve cache
sürümü otomatik güncellenir. `src` verilmezse `HeroBackdrop` yedek olarak
vektör bir sahne çizer. Fotoğraf telifi gerekiyorsa içerik dosyasındaki
`hero.imageCredit` alanı doldurulunca hero'nun altında küçük punto görünür.

## Dil

Türkçe birincil dil: kök adreste (`/`) yayınlanır, İngilizce `/en` altında.
Her dilin kendi kök layout'u var (`src/app/(tr)`, `src/app/(en)`) — bu sayede
`<html lang>` doğru basılır. Ortak HTML iskeleti `src/components/root-html.tsx`
içinde; sayfa başlıkları ve canonical/hreflang adresleri de oradaki
`buildMetadata` / `buildPageMetadata` ile üretilir.

## Yayın

`main` dalına her push'ta `.github/workflows/deploy.yml` siteyi derleyip GitHub
Pages'e yayınlar. Depo ayarlarında **Settings → Pages → Source: GitHub Actions**
seçili olmalı.

Sitenin mutlak adresi (canonical, hreflang, og:image, sitemap, yapısal veri)
`NEXT_PUBLIC_SITE_URL` üzerinden geliyor; workflow bu değeri GitHub'dan alır,
özel domain bağlandığında kendiliğinden güncellenir.

Adres öneki otomatik: proje sayfasında (`kullanici.github.io/depo-adi`)
workflow `NEXT_PUBLIC_BASE_PATH` değerini GitHub'dan alıp build'e geçirir, özel
domain bağlıyken boş kalır. Elle test etmek için:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/depo-adi"; npm run build; $env:NEXT_PUBLIC_BASE_PATH = $null
```

Özel domain (`www.silivriultratrail.com`) bağlanırken `public/CNAME` dosyası
eklenecek; içinde tek satır olarak domain yazar.

`npm run build` çıktısı olan `out/` klasörü ayrıca herhangi bir statik hostinge
elle de yüklenebilir.
