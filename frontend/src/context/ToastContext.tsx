import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
  TriangleAlert,
  X,
} from "lucide-react";

type ToastStatus = "success" | "error" | "warning" | "info" | "loading";

type ToastOptions = {
  id?: string;
  title?: string;
  description?: string;
  status?: ToastStatus;
  duration?: number;
  icon?: ReactNode;
  isClosable?: boolean;
  position?: string;
  variant?: string;
  colorScheme?: string;
};

type ToastContextValue = {
  toast: (options: ToastOptions) => string;
  promise: <T>(
    promise: Promise<T>,
    options: {
      success: ToastOptions | string;
      error: ToastOptions | string;
      loading: ToastOptions | string;
    },
  ) => Promise<T>;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const statusStyles: Record<ToastStatus, string> = {
  success: "border-l-2 border-l-[color:var(--color-success)]",
  error: "border-l-2 border-l-[color:var(--color-danger)]",
  warning: "border-l-2 border-l-[color:var(--color-gold)]",
  info: "border-l-2 border-l-[color:var(--color-mute)]",
  loading: "border-l-2 border-l-[color:var(--color-gold)]",
};

const iconColor: Record<ToastStatus, string> = {
  success: "text-[color:var(--color-success)]",
  error: "text-[color:var(--color-danger)]",
  warning: "text-gold",
  info: "text-mute",
  loading: "text-gold",
};

const statusIcons: Record<ToastStatus, ReactNode> = {
  success: <CheckCircle2 className="size-5 shrink-0" />,
  error: <AlertCircle className="size-5 shrink-0" />,
  warning: <TriangleAlert className="size-5 shrink-0" />,
  info: <Info className="size-5 shrink-0" />,
  loading: <Loader2 className="size-5 shrink-0 animate-spin" />,
};

function normalizeOptions(
  options: ToastOptions | string,
  status?: ToastStatus,
): ToastOptions {
  if (typeof options === "string") return { title: options, status };
  return { ...options, status: options.status ?? status };
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<(ToastOptions & { id: string })[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = options.id ?? crypto.randomUUID();
      const duration = options.duration ?? 1800;
      const nextToast = { ...options, id, status: options.status ?? "info" };

      setToasts((prev) => [...prev.slice(-4), nextToast]);

      if (duration > 0 && nextToast.status !== "loading") {
        const timer = setTimeout(() => removeToast(id), duration);
        timers.current.set(id, timer);
      }

      return id;
    },
    [removeToast],
  );

  const promise = useCallback(
    async <T,>(
      promiseToTrack: Promise<T>,
      options: {
        success: ToastOptions | string;
        error: ToastOptions | string;
        loading: ToastOptions | string;
      },
    ) => {
      const loadingId = toast({
        ...normalizeOptions(options.loading, "loading"),
        duration: 0,
        isClosable: false,
      });

      try {
        const result = await promiseToTrack;
        removeToast(loadingId);
        toast(normalizeOptions(options.success, "success"));
        return result;
      } catch (error) {
        removeToast(loadingId);
        toast(normalizeOptions(options.error, "error"));
        throw error;
      }
    },
    [removeToast, toast],
  );

  const value = useMemo(() => ({ toast, promise }), [toast, promise]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed top-6 right-6 z-[100] flex w-full max-w-sm flex-col gap-2">
        {toasts.map((item) => {
          const status = item.status ?? "info";
          return (
            <div
              key={item.id}
              className={cn(
                "pointer-events-auto flex items-start gap-3 rounded-none border border-hairline bg-surface-2 px-4 py-3 text-ivory shadow-[0_10px_30px_-15px_rgba(0,0,0,0.9)] backdrop-blur-sm",
                statusStyles[status],
              )}
            >
              <span className={iconColor[status]}>
                {item.icon ?? statusIcons[status]}
              </span>
              <div className="min-w-0 flex-1 text-left">
                {item.title && (
                  <p className="text-sm font-semibold tracking-tight text-ivory">
                    {item.title}
                  </p>
                )}
                {item.description && (
                  <p className="text-xs text-mute">{item.description}</p>
                )}
              </div>
              {item.isClosable !== false && (
                <button
                  type="button"
                  className="rounded p-0.5 text-mute transition hover:text-gold"
                  onClick={() => removeToast(item.id!)}
                  aria-label="Close toast"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

type ToastFn = ToastContextValue["toast"] & {
  promise: ToastContextValue["promise"];
};

export function useToast(): ToastFn {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");

  const toastFn = ((options: ToastOptions) =>
    context.toast(options)) as ToastFn;
  toastFn.promise = context.promise;
  return toastFn;
}
