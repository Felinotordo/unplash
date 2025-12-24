"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const storedTheme = localStorage.getItem("theme") as Theme | null;
  if (storedTheme) return storedTheme;

  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return systemPrefersDark ? "dark" : "light";
}

export function useDarkMode() {
  const [mode, setMode] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const toggleTheme = () => {
    const nextTheme: Theme = mode === "dark" ? "light" : "dark";
    
    setMode(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  return { theme: mode, toggleTheme };
}