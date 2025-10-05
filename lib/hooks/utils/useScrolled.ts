import { useEffect, useState } from 'react';

/**
 * Hook para detectar si la página ha sido scrolleada más allá de un threshold
 * @param threshold - Número de píxeles desde el top para considerar "scrolled" (default: 50)
 * @returns boolean - true si la página está scrolleada más allá del threshold
 *
 * @example
 * ```tsx
 * const isScrolled = useScrolled(); // threshold por defecto: 50px
 * const isScrolledFar = useScrolled(100); // threshold personalizado: 100px
 *
 * return (
 *   <header className={isScrolled ? 'scrolled' : 'top'}>
 *     Header content
 *   </header>
 * );
 * ```
 */
export function useScrolled(threshold = 50): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);

    // Agregar listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
