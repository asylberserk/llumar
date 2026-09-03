import { useEffect, useRef } from "react";

import bgAsset from "@/assets/site-bg.jpg.asset.json";

/**
 * Fixed full-page background image with a slow parallax scroll (~35% of page speed).
 * Static on touch devices and when the user prefers reduced motion.
 */
export function SiteBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none)").matches;
    if (reduced || coarse) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      el.style.transform = `translate3d(0, ${window.scrollY * 0.35}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
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
