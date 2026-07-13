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
    <div className={cn("w-full text-left", isInvalid && "text-red-500", className)}>
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
    <label className={cn("mb-1 block text-sm font-medium", className)}>
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
    <p className={cn("mt-1 text-xs text-red-500", className)}>{children}</p>
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
    <p className={cn("mt-1 text-xs text-gray-500 dark:text-gray-400", className)}>
      {children}
    </p>
  );
}
