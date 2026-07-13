import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ColorMode = "light" | "dark";

type ThemeContextValue = {
  colorMode: ColorMode;
  toggleColorMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialMode(): ColorMode {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("color-mode");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorMode>(getInitialMode);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", colorMode === "dark");
    localStorage.setItem("color-mode", colorMode);
  }, [colorMode]);

  const toggleColorMode = useCallback(() => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(
    () => ({ colorMode, toggleColorMode }),
    [colorMode, toggleColorMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useColorMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useColorMode must be used within ThemeProvider");
  }
  return context;
}

export function useColorModeValue<T>(lightValue: T, darkValue: T): T {
  const { colorMode } = useColorMode();
  return colorMode === "light" ? lightValue : darkValue;
}
