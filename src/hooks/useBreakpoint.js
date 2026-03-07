/**
 * useBreakpoint — Shared responsive hook
 * AlphaWaves brand system
 *
 * Breakpoints:
 *   sm  → 0–480px      (mobile)
 *   md  → 481–768px    (tablet)
 *   lg  → 769–1024px   (large tablet / small laptop)
 *   xl  → 1025px+      (desktop)
 *
 * Usage:
 *   const { isMobile, isTablet, isLargeTablet, isDesktop, width } = useBreakpoint();
 */

import { useState, useEffect } from "react";

const useBreakpoint = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);

  return {
    width,
    isMobile:      width <= 480,
    isTablet:      width > 480 && width <= 768,
    isLargeTablet: width > 768 && width <= 1024,
    isDesktop:     width > 1024,
    // Helpers
    isMobileOrTablet:    width <= 768,
    isTabletOrLarger:    width > 480,
    isTabletDown:        width <= 768,
    isLargeTabletDown:   width <= 1024,
  };
};

export default useBreakpoint;