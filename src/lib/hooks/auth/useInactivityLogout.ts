import { useEffect, useRef } from 'react';
import { modals } from '@mantine/modals';
import { useAuthStore } from '@/lib/store';
import { useLogout } from './useLogout';

const DEFAULT_TIMEOUT = 60000; // 1 minuto

export const useInactivityLogout = () => {
  const logout = useLogout();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const sessionTimeout = import.meta.env.VITE_SESSION_TIMEOUT_MS
    ? parseInt(import.meta.env.VITE_SESSION_TIMEOUT_MS, 10)
    : DEFAULT_TIMEOUT;

  const resetTimer = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      modals.closeAll();
      logout();
    }, sessionTimeout);
  };

  useEffect(() => {
    // Solo activar si el usuario está autenticado
    if (!isAuthenticated) {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      return;
    }

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

    const handleActivity = () => {
      resetTimer();
    };

    // Iniciar el timer
    resetTimer();

    // Agregar listeners
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Cleanup
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [sessionTimeout, isAuthenticated]);
};
