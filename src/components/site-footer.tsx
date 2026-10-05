import { ArrowUp, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Partners } from "@/components/partners";
import type { Dictionary } from "@/i18n/dictionary";
import { getLegalDoc } from "@/i18n/dictionary";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  const { brand, contact, documents, footer, hero, routes } = dict;

  return (
    <>
      <Partners dict={dict} />

      <footer id="iletisim" className="pb-safe bg-sand text-ink-900">
        <div className="px-safe mx-auto flex w-full max-w-5xl flex-col items-center py-12 text-center">
          <span className="text-[13px]">
            <Logo brand={brand} variant="dark" />
          </span>

          <p className="mt-6 text-sm font-semibold tracking-wide uppercase">
            {hero.date} · {hero.city}
          </p>

          <h2 className="mt-10 text-xs font-bold tracking-[0.22em] text-ink-900/60 uppercase">
            {contact.title}
          </h2>
          <p className="mt-2 text-sm text-ink-900/70">{contact.note}</p>

          <a
            href={`mailto:${contact.email}`}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Mail className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            {contact.email}
          </a>

          {/* Acil durum hattı göğüs numarasının arkasında da basılı olacak. */}
          <p className="mt-4 text-xs text-ink-900/60">
            {contact.emergencyLabel}
          </p>
          <a
            href={`tel:${contact.emergencyPhone.replace(/\s/g, "")}`}
            className="mt-1 inline-flex items-center gap-2 text-sm font-bold tabular-nums hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            {contact.emergencyPhone}
          </a>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {contact.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold tracking-wide uppercase hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xs font-bold tracking-[0.22em] text-ink-900/60 uppercase">
            {footer.legalLabel}
          </h2>
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {documents.items.map(({ page }) => (
              <li key={page}>
                <Link
                  href={routes[page]}
                  className="text-xs font-semibold text-ink-900/70 underline underline-offset-4 hover:text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {getLegalDoc(dict, page).title}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href="#ust"
            className="mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-ink-900/60 uppercase hover:text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
            {footer.backToTop}
          </a>

          <p className="mt-8 text-xs text-ink-900/50">
            © {new Date().getFullYear()} {brand.name}. {footer.rights}
          </p>
        </div>
      </footer>
    </>
  );
}
