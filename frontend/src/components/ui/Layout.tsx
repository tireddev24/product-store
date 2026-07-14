import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export const Container = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { maxW?: string }
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", className)}
    {...props}
  >
    {children}
  </div>
));
Container.displayName = "Container";

export const Divider = ({ className }: { className?: string }) => (
  <hr className={cn("my-6 border-0 border-t border-hairline", className)} />
);

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  variant?: "default" | "gold" | "muted";
}) {
  const styles = {
    default: "border border-hairline text-ivory",
    gold: "border border-gold/60 text-gold bg-gold/5",
    muted: "border border-hairline text-mute",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-none px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em]",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-none bg-gradient-to-r from-surface via-surface-2 to-surface bg-[length:200%_100%]",
        className,
      )}
      style={{ animation: "shimmer 1.6s ease-in-out infinite" }}
    />
  );
}

/**
 * Section band used across pages – gives content a max width, breathing space,
 * and optional hairline dividers so pages feel editorial.
 */
export function Section({
  children,
  className,
  hairline = false,
}: {
  children: ReactNode;
  className?: string;
  hairline?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative w-full py-12 md:py-16",
        hairline && "border-t border-hairline",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** Small kicker label — used above headlines. */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.35em] text-gold">
      <span className="h-px w-6 bg-gold" />
      {children}
    </div>
  );
}
