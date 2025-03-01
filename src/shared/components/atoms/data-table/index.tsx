'use client'

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
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { CellPreview } from '@/shared/components/atoms/data-table/cell-preview'
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
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useState } from 'react'

interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  setData: (data: TData[]) => void
  isSortable?: boolean
  selectedRows?: string[]
}

export function DataTable<TData extends { id: string | number }, TValue>({
  columns,
  data,
  setData,
  isSortable = true,
  selectedRows = [],
}: DataTableProps<TData, TValue>) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [draggedNode, setDraggedNode] = useState<TData | null>(null)
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

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const index = active.data.current?.sortable?.index
    setActiveId(index)

    const draggedId = data[index].id.toString()
    if (selectedRows.includes(draggedId)) {
      const selectedItems = data.filter((item) =>
        selectedRows.includes(item.id.toString())
      )
      setDraggedNode(selectedItems as any)
    } else {
      setDraggedNode(data[index])
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    setDraggedNode(null)
    if (!over) return

    const activeIndex = active.data.current?.sortable?.index
    const overIndex = over.data.current?.sortable?.index

    if (activeIndex !== overIndex) {
      setData((items) => {
        const activeId = items[activeIndex].id.toString()

        if (selectedRows.includes(activeId)) {
          const selectedIndices = items
            .map((item, index) =>
              selectedRows.includes(item.id.toString()) ? index : -1
            )
            .filter((index) => index !== -1)
            .sort((a, b) => a - b)

          const newItems = [...items]
          const itemsToMove = selectedIndices.map((index) => items[index])

          selectedIndices.reverse().forEach((index) => {
            newItems.splice(index, 1)
          })

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
    <Table className='border-collapse border border-grey-3 last:border-b-0'>
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
            <TableCell
              colSpan={columns.length}
              className='h-8 text-center border-r last:border-r-0'
            >
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
      <div className='rounded-md border border-grey-3'>{tableContent}</div>
      {/* <DragOverlay>
        {activeId ? (
          <CellPreview
            draggedNode={draggedNode}
            isMultiple={Array.isArray(draggedNode)}
          />
        ) : null}
      </DragOverlay> */}
    </DndContext>
  ) : (
    <div className='rounded-md'>{tableContent}</div>
  )
}
