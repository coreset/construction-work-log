import { useState, useEffect } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "cwl-theme";

/**
 * Reads the theme already set on <html> by the FOUC-prevention inline script.
 * This ensures React's initial state is always in sync with the DOM — no flicker.
 */
function getInitialTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    // Enable CSS transitions only after the first render.
    // Without this guard, the initial paint would trigger a 200ms colour
    // transition from the browser's default white to the correct theme colour.
    document.documentElement.classList.add("theme-ready");
    return () => {
      document.documentElement.classList.remove("theme-ready");
    };
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage may be unavailable in hardened private browsing
    }
  };

  return { theme, toggle, isDark: theme === "dark" };
}
