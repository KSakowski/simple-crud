import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useItems } from '../hooks/useItems';
import type { Item } from '../types/item';
import type { SortField } from './SortIcon';
import ItemDialog from './ItemDialog';
import ItemsTable from './ItemsTable';
import Pagination from '@/shared/components/Pagination';

export default function ItemsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('id,asc');
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);

  const { items, totalPages, totalElements, isLoading, deleteItem } = useItems({
    page,
    sort,
    search: debouncedSearch,
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
        <ItemsTable items={items} sort={sort} onSort={handleSort} onEdit={openEdit} onDelete={deleteItem} />
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
