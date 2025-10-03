import { useEffect, useRef } from 'react';

/**
 * Hook para enfocar automáticamente un elemento cuando el componente se monta
 * @param delay - Tiempo de espera en millisegundos antes de enfocar (default: 100ms)
 * @returns ref - Referencia para asignar al elemento que se quiere enfocar
 */
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
