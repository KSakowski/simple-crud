import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));
    expect(result.current).toBe('hello');
  });

  it('does not update value before delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'hello' },
    });

    rerender({ value: 'world' });
    act(() => vi.advanceTimersByTime(299));

    expect(result.current).toBe('hello');
  });

  it('updates value after delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'hello' },
    });

    rerender({ value: 'world' });
    act(() => vi.advanceTimersByTime(300));

    expect(result.current).toBe('world');
  });

  it('resets timer on rapid changes, only applies last value', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    act(() => vi.advanceTimersByTime(100));
    rerender({ value: 'c' });
    act(() => vi.advanceTimersByTime(100));
    rerender({ value: 'd' });
    act(() => vi.advanceTimersByTime(300));

    expect(result.current).toBe('d');
  });
});
