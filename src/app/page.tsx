'use client'

import { Button } from '@/shared/components/atoms/button'
import { DataTableWithState } from '@/shared/components/atoms/data-table/data-table-with-state'
import TableCell from '@/shared/components/atoms/table-cell'
import TableCellActions from '@/shared/components/atoms/table-cell-actions'
import Logo from '@/shared/icons/logo'
import { useRef, useState } from 'react'
import type React from 'react'

type TableRow = {
  id: string
  name: string
  email: string
}

export default function Home() {
  const initialData: TableRow[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', name: 'John Doe1', email: 'john.doe@example.com' },
    { id: '3', name: 'John Doe45', email: 'john.doe@example.com' },
    { id: '4', name: 'John Doe34', email: 'john.doe@example.com' },
  ]

  const [panelWidth, setPanelWidth] = useState(300)
  const panelRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    const startX = event.clientX
    const startWidth = panelRef.current?.offsetWidth || 300

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(
        300,
        Math.min(500, startWidth + moveEvent.clientX - startX)
      )
      setPanelWidth(newWidth)
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <>
      <div className='border-b border-grey-4 px-4 py-3'>
        <Logo />
      </div>
      <div className='flex h-screen'>
        <div
          ref={panelRef}
          className='relative border-r border-gray-300 bg-transparent'
          style={{ width: `${panelWidth}px`, minWidth: '300px' }}
        >
          <TableCell
            isHeader
            defaultValue='Project: '
            className='px-3 py-4 border-none'
            title='Web Project'
            showIcon
          />

          <div
            className='absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-gray-300'
            onMouseDown={handleMouseDown}
          />
        </div>

        {/* Main Content */}
        <div className='flex-1 flex flex-col'>
          <div className='w-full flex justify-end border border-grey-3 border-t-0 px-6 py-5'>
            <TableCellActions
              name={['plus-icon', 'pen', 'file-data', 'trash', 'dots']}
              iconClassName='size-5 '
              iconColors='#8793A0'
              className='border-none gap-x-4'
            />
            <Button
              variant='success'
              className='border-none'
              icon='save'
              iconClassName='size-5'
            >
              Save
            </Button>
          </div>

          <DataTableWithState
            initialData={initialData}
            includeIcons={true}
            includeCheckbox={true}
          />
        </div>
      </div>
    </>
  )
}
