import { cn } from "../../lib/cn";

export function Avatar({
  name,
  size = "md",
  className,
  children,
}: {
  name?: string;
  size?: "sm" | "md" | "xl";
  className?: string;
  children?: React.ReactNode;
}) {
  const initials = name
    ? name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("")
    : "?";

  const sizes = {
    sm: "size-8 text-[10px]",
    md: "size-10 text-xs",
    xl: "size-16 text-sm",
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full border border-gold/40 bg-surface font-semibold uppercase tracking-widest text-gold",
        sizes[size],
        className,
      )}
    >
      {initials}
      {children}
    </div>
  );
}

export function AvatarBadge({
  className,
  bg,
}: {
  className?: string;
  bg?: string;
}) {
  const colorClass = bg?.includes("green")
    ? "bg-[color:var(--color-success)]"
    : bg?.includes("red")
      ? "bg-[color:var(--color-danger)]"
      : "bg-mute";

  return (
    <span
      className={cn(
        "absolute right-0 bottom-0 size-2.5 rounded-full border border-noir",
        colorClass,
        className,
      )}
    />
  );
}
