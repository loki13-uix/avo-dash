'use client'

import { cn } from '@/lib/utils'
import { DraggableTableRow } from '@/shared/components/atoms/data-table/draggable-table-row'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  type ColumnDef,
  type Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  setData: (data: TData[] | ((prev: TData[]) => TData[])) => void
  isSortable?: boolean
  selectedRows?: string[]
  className?: string
}

export function DataTable<TData extends { id: string | number }, TValue>({
  columns,
  data,
  setData,
  isSortable = true,
  selectedRows = [],
  className,
}: DataTableProps<TData, TValue>) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    })
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  function DraggableRowOverlay<TData>({ row }: { row: Row<TData> }) {
    const selectedCount = selectedRows.length
    return (
      <DragOverlay className='relative'>
        <div className='bg-purple-1 border border-purple-primary rounded-[2px]'>
          <DraggableTableRow row={row} isDragOverlay />
        </div>
        {selectedCount > 1 && (
          <div className='absolute -left-1 -top-1 right-1 h-full bg-purple-1 border border-purple-primary -z-10 rounded-[4px]' />
        )}
      </DragOverlay>
    )
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const index = active.data.current?.sortable?.index
    setActiveId(index)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    if (!over) return

    const activeIndex = active.data.current?.sortable?.index
    const overIndex = over.data.current?.sortable?.index

    if (activeIndex !== overIndex) {
      setData((items) => {
        const activeId = items[activeIndex].id.toString()

        if (selectedRows.includes(activeId)) {
          const selectedIndices = items
            .map((item: { id: { toString: () => string } }, index: number) =>
              selectedRows.includes(item.id.toString()) ? index : -1
            )
            .filter((index: number) => index !== -1)
            .sort((a: number, b: number) => a - b)

          const newItems = [...items]
          const itemsToMove = selectedIndices.map(
            (index: number) => items[index]
          )

          selectedIndices.reverse()
          for (const index of selectedIndices) {
            newItems.splice(index, 1)
          }

          const insertIndex =
            overIndex > activeIndex
              ? overIndex - selectedIndices.length + 1
              : overIndex
          newItems.splice(insertIndex, 0, ...itemsToMove)

          return newItems
        }
        return arrayMove(items, activeIndex, overIndex)
      })
    }
  }

  const tableContent = (
    <Table
      className={cn('border-collapse border border-grey-3 bg-white', className)}
    >
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className='border-r last:border-r-0 h-8'
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          <SortableContext
            items={table.getRowModel().rows.map((row) => row.id)}
            strategy={verticalListSortingStrategy}
          >
            {table.getRowModel().rows.map((row) => (
              <DraggableTableRow
                key={row.id}
                row={row}
                isSelected={selectedRows.includes(row.original.id.toString())}
              />
            ))}
          </SortableContext>
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className='text-center'>
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )

  return isSortable ? (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className='rounded-md'>{tableContent}</div>
      {activeId !== null ? (
        <DraggableRowOverlay row={table.getRow(activeId)} />
      ) : null}
    </DndContext>
  ) : (
    <div className='rounded-md'>{tableContent}</div>
  )
}
