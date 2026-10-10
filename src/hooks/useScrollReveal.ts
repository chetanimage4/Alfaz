import { useCallback, useEffect, useState } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const [element, setElement] = useState<T | null>(null);
  const ref = useCallback((node: T | null) => setElement(node), []);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = element.querySelectorAll('.scroll-reveal');
    revealElements.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [element]);

  return ref;
}
