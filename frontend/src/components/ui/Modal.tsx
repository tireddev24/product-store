import { useEffect, type ReactNode } from "react";
import { X, AlertTriangle } from "lucide-react";
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
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
        className="absolute inset-0 bg-noir/85 backdrop-blur-sm"
        aria-label="Close modal overlay"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg border border-hairline bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]",
          className,
        )}
      >
        {/* thin gold top hairline */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
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
        "border-b border-hairline px-6 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-ivory",
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
  return (
    <div className={cn("px-6 py-5 text-sm text-ivory/90", className)}>
      {children}
    </div>
  );
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
        "flex justify-end gap-3 border-t border-hairline px-6 py-4",
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

/* ------- AlertDialog aliases (backwards compat) ------- */

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
  return <div className={cn("overflow-hidden", className)}>{children}</div>;
}
export function AlertDialogHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <ModalHeader className={className}>{children}</ModalHeader>;
}
export function AlertDialogBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <ModalBody className={className}>{children}</ModalBody>;
}
export function AlertDialogFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <ModalFooter className={className}>{children}</ModalFooter>;
}

/* ------- Inline Alerts ------- */

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
    info: "border-l-2 border-l-mute text-ivory/80",
    warning: "border-l-2 border-l-gold text-gold",
    error:
      "border-l-2 border-l-[color:var(--color-danger)] text-[color:var(--color-danger)]",
    success:
      "border-l-2 border-l-[color:var(--color-success)] text-[color:var(--color-success)]",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 border border-hairline bg-noir-2 px-4 py-3 text-xs uppercase tracking-widest",
        styles[status],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AlertIcon() {
  return <AlertTriangle className="size-4 shrink-0" />;
}
