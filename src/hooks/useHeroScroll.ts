import { useEffect, useState } from "react";

const SCROLL_DISTANCE = 260;

export function useHeroScroll() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setProgress(1);
      return;
    }

    let raf = 0;
    let latest = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const p = Math.min(1, Math.max(0, y / SCROLL_DISTANCE));
      if (p !== latest) {
        latest = p;
        setProgress(p);
      }
    };

    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", update);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}
