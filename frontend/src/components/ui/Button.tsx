import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type ButtonVariant =
  | "default"
  | "outline"
  | "ghost"
  | "unstyled"
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
  default:
    "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
  outline:
    "border border-blue-500 bg-transparent text-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-950",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
  unstyled: "bg-transparent p-0 shadow-none hover:bg-transparent",
  cyan: "bg-cyan-500 text-white hover:bg-cyan-600",
  blue: "bg-blue-500 text-white hover:bg-blue-600",
  red: "bg-red-500 text-white hover:bg-red-600",
  purple: "bg-purple-500 text-white hover:bg-purple-600",
  yellow: "bg-yellow-500 text-gray-900 hover:bg-yellow-600",
  green: "bg-green-500 text-white hover:bg-green-600",
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
          "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
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
        "inline-flex size-10 items-center justify-center rounded-md transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
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

/** Maps legacy Chakra colorScheme prop to Button variant */
export function colorSchemeToVariant(
  colorScheme?: string,
): ButtonVariant {
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
