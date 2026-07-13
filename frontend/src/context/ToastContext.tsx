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
  success: "border-green-500/40 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100",
  error: "border-red-500/40 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100",
  warning:
    "border-yellow-500/40 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100",
  info: "border-blue-500/40 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100",
  loading:
    "border-blue-500/40 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100",
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
  if (typeof options === "string") {
    return { title: options, status };
  }
  return { ...options, status: options.status ?? status };
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<(ToastOptions & { id: string })[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = options.id ?? crypto.randomUUID();
      const duration = options.duration ?? 1500;
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
      <div className="pointer-events-none fixed top-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2">
        {toasts.map((item) => {
          const status = item.status ?? "info";
          return (
            <div
              key={item.id}
              className={cn(
                "pointer-events-auto flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg",
                statusStyles[status],
              )}
            >
              {item.icon ?? statusIcons[status]}
              <div className="min-w-0 flex-1 text-left">
                {item.title && (
                  <p className="text-sm font-semibold">{item.title}</p>
                )}
                {item.description && (
                  <p className="text-sm opacity-90">{item.description}</p>
                )}
              </div>
              {item.isClosable !== false && (
                <button
                  type="button"
                  className="rounded p-0.5 opacity-70 hover:opacity-100"
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
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  const toastFn = ((options: ToastOptions) => context.toast(options)) as ToastFn;
  toastFn.promise = context.promise;
  return toastFn;
}
