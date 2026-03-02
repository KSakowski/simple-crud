import { useState } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus, Pencil, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { getItems, deleteItem } from '../services/itemsApi';
import type { Item } from '../types/item';
import ItemDialog from './ItemDialog';
import DeleteItemDialog from './DeleteItemDialog';
import Pagination from '@/shared/components/Pagination';

type SortField = 'id' | 'name' | 'description';

function SortIcon({ field, sort }: { field: SortField; sort: string }) {
  const [f, d] = sort.split(',');
  if (f !== field) return <ChevronsUpDown className="ml-1 inline h-3 w-3" />;
  return d === 'asc' ? (
    <ChevronUp className="ml-1 inline h-3 w-3" />
  ) : (
    <ChevronDown className="ml-1 inline h-3 w-3" />
  );
}

export default function ItemsPage() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('id,asc');
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);

  const { data, isLoading } = useQuery({
    queryKey: ['items', { page, sort, search: debouncedSearch }],
    queryFn: () => getItems({ page, size: 10, sort, search: debouncedSearch }),
    placeholderData: keepPreviousData,
  });

  const items = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;
  const totalElements = data?.totalElements ?? 0;

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      toast.success('Item deleted');
    },
    onError: () => toast.error('Failed to delete item'),
  });

  const openCreate = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const openEdit = (item: Item) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleSort = (field: SortField) => {
    const [f, d] = sort.split(',');
    setSort(`${field},${f === field && d === 'asc' ? 'desc' : 'asc'}`);
    setPage(0);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold uppercase">Simple Crud</h1>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New Item
        </Button>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setPage(0);
          }}
          className="max-w-sm"
        />
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground py-16 text-center">No items yet. Add your first one!</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">
                <button
                  type="button"
                  onClick={() => handleSort('id')}
                  className="flex items-center"
                >
                  ID <SortIcon field="id" sort={sort} />
                </button>
              </TableHead>
              <TableHead>
                <button
                  type="button"
                  onClick={() => handleSort('name')}
                  className="flex items-center"
                >
                  Name <SortIcon field="name" sort={sort} />
                </button>
              </TableHead>
              <TableHead>
                <button
                  type="button"
                  onClick={() => handleSort('description')}
                  className="flex items-center"
                >
                  Description <SortIcon field="description" sort={sort} />
                </button>
              </TableHead>
              <TableHead className="w-28 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-muted-foreground font-mono text-sm">{item.id}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-muted-foreground">{item.description}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <DeleteItemDialog
                    itemName={item.name}
                    onConfirm={() => deleteMutation.mutate(item.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={setPage}
      />

      <ItemDialog open={dialogOpen} onOpenChange={setDialogOpen} item={editingItem} />
    </div>
  );
}
