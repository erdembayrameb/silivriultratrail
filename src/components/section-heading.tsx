export function SectionHeading({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const lineClass = tone === "light" ? "bg-white/25" : "bg-ink-900/25";
  const textClass = tone === "light" ? "text-white" : "text-ink-900";

  return (
    <h2
      className={`rule-heading text-sm font-bold tracking-[0.22em] uppercase ${textClass}`}
    >
      <span className={`h-px w-10 shrink-0 sm:w-16 ${lineClass}`} />
      <span className="text-center text-balance">{children}</span>
      <span className={`h-px w-10 shrink-0 sm:w-16 ${lineClass}`} />
    </h2>
  );
}
