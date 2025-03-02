import { DropIndicator } from '@/shared/components/atoms/tree/drop-indicator'
import { TableCell, TableRow } from '@/shared/components/ui/table'
import { useSortable } from '@dnd-kit/sortable'
import type { Row } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
interface DraggableTableRowProps<TData> {
  row: Row<TData>
  isSelected?: boolean
}

export function DraggableTableRow<TData>({
  row,
  isSelected = false,
}: DraggableTableRowProps<TData>) {
  const { attributes, listeners, setNodeRef, isDragging, isOver } = useSortable(
    {
      id: row.id,
    }
  )

  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    backgroundColor: isSelected ? 'var(--grey-1)' : undefined,
  }

  return (
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
          className='border-r last:border-r-0 p-0 h-8'
          style={{ width: cell.column.getSize() }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
      {isOver && <DropIndicator edge='bottom' gap='8px' />}
    </TableRow>
  )
}
