import { Pencil } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import type { Item } from '../types/item';
import DeleteItemDialog from './DeleteItemDialog';
import SortIcon, { type SortField } from './SortIcon';

interface Props {
  items: Item[];
  sort: string;
  onSort: (field: SortField) => void;
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
}

export default function ItemsTable({ items, sort, onSort, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">
            <button type="button" onClick={() => onSort('id')} className="flex items-center">
              ID <SortIcon field="id" sort={sort} />
            </button>
          </TableHead>
          <TableHead>
            <button type="button" onClick={() => onSort('name')} className="flex items-center">
              Name <SortIcon field="name" sort={sort} />
            </button>
          </TableHead>
          <TableHead>
            <button
              type="button"
              onClick={() => onSort('description')}
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
              <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <DeleteItemDialog itemName={item.name} onConfirm={() => onDelete(item.id)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
