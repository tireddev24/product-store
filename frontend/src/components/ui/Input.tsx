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
          "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900",
          "placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
          "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500",
          variant === "flushed" &&
            "rounded-none border-0 border-b-2 border-gray-300 bg-transparent px-0 focus:ring-0 dark:border-gray-600",
          variant === "filled" &&
            "border-transparent bg-gray-100 dark:bg-gray-700",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
