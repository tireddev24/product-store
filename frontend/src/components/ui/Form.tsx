import { type ReactNode } from "react";
import { cn } from "../../lib/cn";

export function FormControl({
  children,
  className,
  isInvalid,
}: {
  children: ReactNode;
  className?: string;
  isInvalid?: boolean;
}) {
  return (
    <div
      data-invalid={isInvalid || undefined}
      className={cn("w-full text-left", className)}
    >
      {children}
    </div>
  );
}

export function FormLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-mute",
        className,
      )}
    >
      {children}
    </label>
  );
}

export function FormErrorMessage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  if (!children) return null;
  return (
    <p
      className={cn(
        "mt-1.5 text-[11px] uppercase tracking-wider text-[color:var(--color-danger)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function FormHelperText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-1.5 text-[11px] uppercase tracking-wider text-mute",
        className,
      )}
    >
      {children}
    </p>
  );
}
