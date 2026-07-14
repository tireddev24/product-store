import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type ButtonVariant =
  | "default"
  | "primary"
  | "outline"
  | "ghost"
  | "unstyled"
  | "danger"
  | "cyan"
  | "blue"
  | "red"
  | "purple"
  | "yellow"
  | "green";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  // The signature Noir & Gold surfaces
  default:
    "border border-hairline bg-transparent text-ivory hover:border-gold hover:text-gold",
  primary:
    "bg-gold text-noir hover:bg-gold-hi border border-gold hover:border-gold-hi",
  outline:
    "border border-gold text-gold bg-transparent hover:bg-gold hover:text-noir",
  ghost: "bg-transparent text-mute hover:text-gold",
  unstyled: "bg-transparent p-0 shadow-none hover:bg-transparent",
  danger:
    "border border-[color:var(--color-danger)]/40 text-[color:var(--color-danger)] hover:bg-[color:var(--color-danger)] hover:text-ivory",
  // Legacy Chakra-style variant names, remapped to the Noir palette
  cyan: "bg-gold text-noir hover:bg-gold-hi",
  blue: "border border-gold text-gold hover:bg-gold hover:text-noir",
  red: "border border-[color:var(--color-danger)]/50 text-[color:var(--color-danger)] hover:bg-[color:var(--color-danger)] hover:text-ivory",
  purple: "border border-hairline text-ivory hover:border-gold hover:text-gold",
  yellow: "bg-gold text-noir hover:bg-gold-hi",
  green:
    "border border-[color:var(--color-success)]/50 text-[color:var(--color-success)] hover:bg-[color:var(--color-success)] hover:text-noir",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "inline-flex min-h-10 items-center justify-center gap-2 rounded-none px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-noir",
          "disabled:cursor-not-allowed disabled:opacity-40",
          "cursor-pointer",
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  },
);
Button.displayName = "Button";

export const IconButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & { "aria-label"?: string }
>(({ className, variant = "default", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-none transition-colors duration-200 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold",
        "disabled:cursor-not-allowed disabled:opacity-40",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
IconButton.displayName = "IconButton";

export function colorSchemeToVariant(colorScheme?: string): ButtonVariant {
  switch (colorScheme) {
    case "cyan":
    case "blue":
    case "red":
    case "purple":
    case "yellow":
    case "green":
      return colorScheme;
    case "none":
    case "grey":
    case "gray":
      return "ghost";
    default:
      return "default";
  }
}
