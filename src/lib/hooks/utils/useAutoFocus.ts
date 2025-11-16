import { useEffect, useRef } from 'react';

export function useAutoFocus<T extends HTMLElement = HTMLInputElement>(delay: number = 100) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ref.current?.focus();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return ref;
}
