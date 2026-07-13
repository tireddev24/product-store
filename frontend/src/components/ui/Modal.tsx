import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import { IconButton } from "./Button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  id?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
};

export function Modal({
  isOpen,
  onClose,
  children,
  id,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeOnEsc, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id={id}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close modal overlay"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-gray-800",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalOverlay() {
  return null;
}

export function ModalContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("p-0", className)}>{children}</div>;
}

export function ModalHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-b border-gray-200 px-6 py-4 text-lg font-semibold dark:border-gray-700",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ModalBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

export function ModalFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-gray-700",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ModalCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <IconButton
      aria-label="Close modal"
      variant="ghost"
      onClick={onClose}
      className="absolute top-3 right-3 size-8"
    >
      <X className="size-4" />
    </IconButton>
  );
}

export function AlertDialog({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc>
      {children}
    </Modal>
  );
}

export function AlertDialogOverlay() {
  return null;
}

export function AlertDialogContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl", className)}>{children}</div>
  );
}

export function AlertDialogHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return ModalHeader({ children, className });
}

export function AlertDialogBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return ModalBody({ children, className });
}

export function AlertDialogFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return ModalFooter({ children, className });
}

export function Alert({
  children,
  status = "info",
  className,
}: {
  children: ReactNode;
  status?: "info" | "warning" | "error" | "success";
  className?: string;
}) {
  const styles = {
    info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
    warning:
      "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
    error:
      "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
    success:
      "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm",
        styles[status],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AlertIcon() {
  return (
    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-current/10">
      !
    </span>
  );
}

export function Badge({
  children,
  className,
  colorScheme = "green",
}: {
  children: ReactNode;
  className?: string;
  colorScheme?: "green" | "blue" | "red" | "yellow";
}) {
  const colors = {
    green: "bg-green-500 text-white",
    blue: "bg-blue-500 text-white",
    red: "bg-red-500 text-white",
    yellow: "bg-yellow-500 text-gray-900",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-semibold",
        colors[colorScheme],
        className,
      )}
    >
      {children}
    </span>
  );
}
