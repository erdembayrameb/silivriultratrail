import type { Dictionary } from "@/i18n/dictionary";

/**
 * Taslaktaki SUT kilidi: dağ silueti + "SUT" + açılımı.
 * Gerçek logo dosyası geldiğinde yalnızca bu bileşen değişecek.
 */
export function Logo({
  brand,
  variant = "light",
  className = "",
}: {
  brand: Dictionary["brand"];
  variant?: "light" | "dark";
  className?: string;
}) {
  const peakColor = variant === "light" ? "#ffffff" : "#0a2029";
  const nameColor = variant === "light" ? "text-white/80" : "text-ink-900/70";

  return (
    <span className={`flex flex-col items-center leading-none ${className}`}>
      <svg
        viewBox="0 0 120 34"
        aria-hidden="true"
        className="h-[1.15em] w-auto"
        fill="none"
      >
        <path
          d="M2 32 L26 6 L38 20 L48 9 L62 25 L74 12 L88 28 L104 14 L118 32 Z"
          fill={peakColor}
        />
        <path
          d="M26 6 L20 13 L24 14 L21 17 L31 15 L27 12 L32 11 Z"
          fill={variant === "light" ? "#dfe9ee" : "#ffffff"}
        />
      </svg>

      <span className="font-brush mt-1 text-[2.1em] text-accent">
        {brand.abbr}
      </span>

      <span
        className={`mt-[0.15em] text-[0.52em] font-semibold tracking-[0.18em] ${nameColor}`}
      >
        {brand.wordmark}
      </span>
    </span>
  );
}
