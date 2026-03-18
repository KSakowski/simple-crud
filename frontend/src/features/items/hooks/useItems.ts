import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getItems, deleteItem } from '../services/itemsApi';

interface UseItemsOptions {
  page: number;
  sort: string;
  search: string;
}

export function useItems({ page, sort, search }: UseItemsOptions) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['items', { page, sort, search }],
    queryFn: () => getItems({ page, size: 10, sort, search }),
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      toast.success('Item deleted');
    },
    onError: () => toast.error('Failed to delete item'),
  });

  return {
    items: data?.content ?? [],
    totalPages: data?.totalPages ?? 0,
    totalElements: data?.totalElements ?? 0,
    isLoading,
    deleteItem: (id: number) => deleteMutation.mutate(id),
  };
}
