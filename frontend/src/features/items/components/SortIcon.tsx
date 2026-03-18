import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

export type SortField = 'id' | 'name' | 'description';

interface Props {
  field: SortField;
  sort: string;
}

export default function SortIcon({ field, sort }: Props) {
  const [f, d] = sort.split(',');
  if (f !== field) return <ChevronsUpDown className="ml-1 inline h-3 w-3" />;
  return d === 'asc' ? (
    <ChevronUp className="ml-1 inline h-3 w-3" />
  ) : (
    <ChevronDown className="ml-1 inline h-3 w-3" />
  );
}
