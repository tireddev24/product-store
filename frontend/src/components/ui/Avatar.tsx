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
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    xl: "size-14 text-base",
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 font-semibold text-white",
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
  const colorClass =
    bg?.includes("green") ? "bg-green-500" : bg?.includes("red") ? "bg-red-400" : "bg-gray-400";

  return (
    <span
      className={cn(
        "absolute right-0 bottom-0 size-3 rounded-full border-2 border-white dark:border-gray-900",
        colorClass,
        className,
      )}
    />
  );
}
