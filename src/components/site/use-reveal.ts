import { useEffect } from "react";

/**
 * Reveal-on-scroll as a progressive enhancement. Content is visible until this hook runs;
 * if JavaScript or IntersectionObserver is unavailable, nothing is ever hidden.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const root = document.documentElement;
    if (typeof IntersectionObserver === "undefined") return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    // Anything already on screen stays put; only content below the fold animates in.
    elements.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
    });
    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((el) => {
      if (!el.classList.contains("is-visible")) observer.observe(el);
    });
    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}
