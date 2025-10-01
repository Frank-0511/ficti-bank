import { act, renderHook } from '@testing-library/react';
import { useScrolled } from './useScrolled';

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true,
});

// Mock addEventListener y removeEventListener
const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

describe('useScrolled', () => {
  beforeEach(() => {
    window.scrollY = 0;
    addEventListenerSpy.mockClear();
    removeEventListenerSpy.mockClear();
  });

  it('should return false initially when not scrolled', () => {
    const { result } = renderHook(() => useScrolled());
    expect(result.current).toBe(false);
  });

  it('should add scroll event listener on mount', () => {
    renderHook(() => useScrolled());
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should remove scroll event listener on unmount', () => {
    const { unmount } = renderHook(() => useScrolled());
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should return true when scrolled beyond default threshold (50px)', () => {
    const { result } = renderHook(() => useScrolled());

    // Simular scroll
    act(() => {
      window.scrollY = 60;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('should return false when scrolled below default threshold', () => {
    const { result } = renderHook(() => useScrolled());

    // Simular scroll menor al threshold
    act(() => {
      window.scrollY = 30;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
  });

  it('should use custom threshold when provided', () => {
    const customThreshold = 100;
    const { result } = renderHook(() => useScrolled(customThreshold));

    // Scroll menor al threshold personalizado
    act(() => {
      window.scrollY = 80;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(false);

    // Scroll mayor al threshold personalizado
    act(() => {
      window.scrollY = 120;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(true);
  });

  it('should update when threshold changes', () => {
    let threshold = 50;
    const { result, rerender } = renderHook(() => useScrolled(threshold));

    // Establecer scroll en 75px
    act(() => {
      window.scrollY = 75;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(true); // 75 > 50

    // Cambiar threshold a 100
    threshold = 100;
    rerender();

    // El mismo scroll ahora debería ser false
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(false); // 75 < 100
  });
});
