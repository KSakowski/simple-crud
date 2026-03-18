import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { useItems } from './useItems';

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return createElement(QueryClientProvider, { client: queryClient }, children);
}

describe('useItems', () => {
  it('returns items from API', async () => {
    const { result } = renderHook(() => useItems({ page: 0, sort: 'id,asc', search: '' }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.items).toHaveLength(2);
    expect(result.current.items[0].name).toBe('Item One');
  });

  it('returns correct pagination info', async () => {
    const { result } = renderHook(() => useItems({ page: 0, sort: 'id,asc', search: '' }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.totalPages).toBe(1);
    expect(result.current.totalElements).toBe(2);
  });

  it('starts with isLoading true', () => {
    const { result } = renderHook(() => useItems({ page: 0, sort: 'id,asc', search: '' }), {
      wrapper,
    });
    expect(result.current.isLoading).toBe(true);
  });
});
