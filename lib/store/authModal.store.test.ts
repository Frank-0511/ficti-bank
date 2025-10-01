import { act, renderHook } from '@testing-library/react';
import { AUTH_MODES } from '../constants';
import { useAuthModal } from './authModal.store';

describe('useAuthModal', () => {
  it('should have correct initial state', () => {
    const { result } = renderHook(() => useAuthModal());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.mode).toBe(AUTH_MODES.LOGIN);
  });

  it('should open modal with LOGIN mode', () => {
    const { result } = renderHook(() => useAuthModal());

    act(() => {
      result.current.open(AUTH_MODES.LOGIN);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.mode).toBe(AUTH_MODES.LOGIN);
  });

  it('should open modal with REGISTER mode', () => {
    const { result } = renderHook(() => useAuthModal());

    act(() => {
      result.current.open(AUTH_MODES.REGISTER);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.mode).toBe(AUTH_MODES.REGISTER);
  });

  it('should close modal', () => {
    const { result } = renderHook(() => useAuthModal());

    // Primero abrir el modal
    act(() => {
      result.current.open(AUTH_MODES.REGISTER);
    });
    expect(result.current.isOpen).toBe(true);

    // Luego cerrarlo
    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
    // El modo debería mantenerse
    expect(result.current.mode).toBe(AUTH_MODES.REGISTER);
  });

  it('should maintain mode when opening with different modes sequentially', () => {
    const { result } = renderHook(() => useAuthModal());

    // Abrir con LOGIN
    act(() => {
      result.current.open(AUTH_MODES.LOGIN);
    });
    expect(result.current.mode).toBe(AUTH_MODES.LOGIN);

    // Cambiar a REGISTER sin cerrar
    act(() => {
      result.current.open(AUTH_MODES.REGISTER);
    });
    expect(result.current.isOpen).toBe(true);
    expect(result.current.mode).toBe(AUTH_MODES.REGISTER);

    // Volver a LOGIN
    act(() => {
      result.current.open(AUTH_MODES.LOGIN);
    });
    expect(result.current.isOpen).toBe(true);
    expect(result.current.mode).toBe(AUTH_MODES.LOGIN);
  });

  it('should handle multiple store instances independently', () => {
    const { result: result1 } = renderHook(() => useAuthModal());
    const { result: result2 } = renderHook(() => useAuthModal());

    // Ambas deberían compartir el mismo estado (Zustand store)
    act(() => {
      result1.current.open(AUTH_MODES.LOGIN);
    });

    expect(result1.current.isOpen).toBe(true);
    expect(result2.current.isOpen).toBe(true);
    expect(result1.current.mode).toBe(AUTH_MODES.LOGIN);
    expect(result2.current.mode).toBe(AUTH_MODES.LOGIN);
  });
});
