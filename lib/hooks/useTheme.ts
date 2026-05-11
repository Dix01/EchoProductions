"use client";

import { useEffect, useState } from "react";

export type ThemeName = "dark" | "light";

const storageKey = "echo-theme";

function getDocumentTheme(): ThemeName {
  if (typeof document === "undefined") {
    return "dark";
  }

  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme: ThemeName) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  window.localStorage.setItem(storageKey, theme);

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  themeMeta?.setAttribute("content", theme === "light" ? "#EDEBE3" : "#000000");
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeName>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getDocumentTheme());
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeName = getDocumentTheme() === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    setTheme(nextTheme);
  };

  return {
    mounted,
    theme,
    toggleTheme
  };
}
