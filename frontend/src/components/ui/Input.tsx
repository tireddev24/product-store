import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: "default" | "flushed" | "filled";
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-transparent text-sm text-ivory placeholder:text-mute/70",
          "focus:outline-none",
          variant === "default" &&
            "rounded-none border border-hairline bg-noir-2 px-3 py-2.5 focus:border-gold",
          variant === "filled" &&
            "rounded-none border border-hairline bg-surface px-3 py-2.5 focus:border-gold",
          variant === "flushed" &&
            "rounded-none border-b border-hairline bg-transparent px-0 py-2 focus:border-gold",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
