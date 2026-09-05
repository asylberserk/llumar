import { useEffect, useRef } from "react";

import bgAsset from "@/assets/site-bg.jpg.asset.json";

const IMAGE_RATIO = 2400 / 1792;

/**
 * Fixed full-page background image. The parallax is calculated so the bottom
 * edge of the image lands exactly at the bottom of the page.
 * Static on touch devices and when the user prefers reduced motion.
 */
export function SiteBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none)").matches;

    let travel = 0;
    let raf = 0;

    const measure = () => {
      const vh = window.innerHeight;
      const height = Math.max(vh, window.innerWidth * IMAGE_RATIO);
      el.style.height = `${height}px`;
      travel = Math.max(0, height - vh);
    };

    const update = () => {
      raf = 0;
      const scrollable = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
      el.style.transform = `translate3d(0, ${-progress * travel}px, 0)`;
    };

    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    if (reduced || coarse) {
      el.style.transform = "translate3d(0, 0, 0)";
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="site-bg">
      <div
        ref={ref}
        className="site-bg-image"
        style={{ backgroundImage: `url(${bgAsset.url})` }}
      />
      <div className="site-bg-veil" />
    </div>
  );
}
