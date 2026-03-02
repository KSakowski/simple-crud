import { Button } from '@/shared/components/ui/button'

interface PaginationProps {
  page: number
  totalPages: number
  totalElements: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  page,
  totalPages,
  totalElements,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
      >
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page + 1} of {totalPages} ({totalElements} total)
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages - 1}
      >
        Next
      </Button>
    </div>
  )
}
