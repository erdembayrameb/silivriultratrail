"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import type { Dictionary, VolunteerField } from "@/i18n/dictionary";

type Values = Record<string, string | string[]>;

const inputClass =
  "mt-2 block w-full rounded-lg border border-ink-700 bg-ink-950 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none";

/**
 * Gönüllü başvuru formu.
 *
 * Site statik, sunucu tarafı yok. Form gerçekten doldurulabiliyor; gönderince
 * cevaplar e-posta taslağına dönüşüp kullanıcının posta uygulamasında
 * açılıyor. Kayıt altyapısı kurulduğunda yalnızca gönderme adımı değişecek,
 * alanlar içerik dosyasından geldiği için form aynı kalır.
 */
export function VolunteerForm({
  volunteer,
  email,
}: {
  volunteer: Dictionary["volunteer"];
  email: string;
}) {
  const [values, setValues] = useState<Values>({});

  const set = (id: string, value: string | string[]) =>
    setValues((prev) => ({ ...prev, [id]: value }));

  const toggle = (field: VolunteerField, option: string) => {
    const current = (values[field.id] as string[] | undefined) ?? [];
    const next = current.includes(option)
      ? current.filter((x) => x !== option)
      : [...current, option];
    // Seçim üst sınırı aşılırsa en eski seçim düşer.
    const max = field.maxSelect ?? next.length;
    set(field.id, next.slice(-max));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = volunteer.fields
      .map((field) => {
        const raw = values[field.id];
        const text = Array.isArray(raw) ? raw.join(", ") : (raw ?? "");
        return `${field.label}:\n${text}\n`;
      })
      .join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      volunteer.formTitle,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-5">
      {volunteer.fields.map((field) => {
        const labelId = `${field.id}-label`;
        const required = field.type !== "textarea" && field.type !== "checkbox";

        return (
          <div key={field.id}>
            <label
              id={labelId}
              htmlFor={field.id}
              className="block text-sm font-semibold text-white"
            >
              {field.label}
              {field.maxSelect ? (
                <span className="ml-1.5 text-xs font-normal text-white/45">
                  ({volunteer.maxSelectLabel})
                </span>
              ) : null}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                rows={3}
                value={(values[field.id] as string) ?? ""}
                onChange={(e) => set(field.id, e.target.value)}
                className={inputClass}
              />
            ) : field.type === "select" ? (
              <select
                id={field.id}
                required
                value={(values[field.id] as string) ?? ""}
                onChange={(e) => set(field.id, e.target.value)}
                className={inputClass}
              >
                <option value="">{volunteer.selectPlaceholder}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "radio" || field.type === "checkbox" ? (
              <fieldset className="mt-2 flex flex-col gap-2">
                <legend className="sr-only">{field.label}</legend>
                {field.options.map((option) => {
                  const checked =
                    field.type === "checkbox"
                      ? (
                          (values[field.id] as string[] | undefined) ?? []
                        ).includes(option)
                      : values[field.id] === option;

                  return (
                    <label
                      key={option}
                      className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border border-ink-700 bg-ink-950 px-3 py-2.5 text-sm text-white/85 has-checked:border-accent"
                    >
                      <input
                        type={field.type}
                        name={field.id}
                        value={option}
                        checked={checked}
                        onChange={() =>
                          field.type === "checkbox"
                            ? toggle(field, option)
                            : set(field.id, option)
                        }
                        className="mt-0.5 h-4 w-4 shrink-0 accent-white"
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </fieldset>
            ) : (
              <input
                id={field.id}
                required={required}
                type={
                  field.type === "year"
                    ? "number"
                    : field.type === "tel"
                      ? "tel"
                      : field.type === "email"
                        ? "email"
                        : "text"
                }
                {...(field.type === "year"
                  ? { min: 1930, max: 2010, inputMode: "numeric" as const }
                  : {})}
                {...(field.type === "tel"
                  ? { inputMode: "tel" as const }
                  : {})}
                value={(values[field.id] as string) ?? ""}
                onChange={(e) => set(field.id, e.target.value)}
                className={inputClass}
              />
            )}
          </div>
        );
      })}

      <button
        type="submit"
        className="mt-1 inline-flex min-h-13 items-center justify-center gap-2 bg-sand px-8 text-sm font-bold tracking-wider text-ink-950 uppercase transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none"
      >
        <Mail className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
        {volunteer.ctaLabel}
      </button>
    </form>
  );
}
