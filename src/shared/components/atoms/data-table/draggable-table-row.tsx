import { cn } from '@/lib/utils'
import { DropIndicator } from '@/shared/components/atoms/tree/drop-indicator'
import { TableCell, TableRow } from '@/shared/components/ui/table'
import { useSortable } from '@dnd-kit/sortable'
import type { Row } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'

interface DraggableTableRowProps<TData> {
  row: Row<TData>
  isSelected?: boolean
  isDragOverlay?: boolean
}

export function DraggableTableRow<TData>({
  row,
  isSelected = false,
  isDragOverlay = false,
}: DraggableTableRowProps<TData>) {
  const { attributes, listeners, setNodeRef, isDragging, isOver } = useSortable(
    {
      id: row.id,
    }
  )

  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    backgroundColor: isSelected ? 'var(--purple-1)' : undefined,
  }

  const rowContent = (
    <TableRow
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='border-b'
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          className={cn('p-0', !isDragOverlay && 'border-r last:border-r-0')}
          style={{ width: cell.column.getSize() }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
      {isOver && !isDragOverlay && !isSelected && <DropIndicator />}
    </TableRow>
  )

  return rowContent
}
