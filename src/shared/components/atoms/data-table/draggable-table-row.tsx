import { cn } from '@/lib/utils'
import { Icon } from '@/shared/components/atoms/icon'
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

  const rowContent = (
    <TableRow
      ref={setNodeRef}
      className={cn(
        'border-b group',
        isDragging && 'opacity-50 cursor-grabbing'
      )}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          className={cn(
            'p-0',
            !isDragOverlay && 'border-r last:border-r-0',
            isSelected && 'bg-purple-1'
          )}
          style={{ width: cell.column.getSize() }}
        >
          {cell.column.id === 'checkbox' ? (
            <div
              {...attributes}
              {...listeners}
              className={cn(
                'flex items-center justify-center cursor-grab',
                isDragging && 'opacity-50 cursor-grabbing'
              )}
            >
              <div style={{ width: 16 }}>
                <Icon
                  name='grip-bar'
                  size={16}
                  className={cn(
                    'text-grey-11',
                    isSelected ? 'block' : 'hidden group-hover:block'
                  )}
                />
              </div>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ) : (
            flexRender(cell.column.columnDef.cell, cell.getContext())
          )}
        </TableCell>
      ))}
      {isOver && !isDragOverlay && !isSelected && <DropIndicator />}
    </TableRow>
  )

  return rowContent
}
