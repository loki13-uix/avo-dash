'use client'

import { DataTable } from '@/shared/components/atoms/data-table'
import { Checkbox } from '@/shared/components/ui/checkbox'
import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
export default function Home() {
  const [headerChecked, setHeaderChecked] = useState<boolean | 'indeterminate'>(
    false
  )

  function handleHeaderCheckedChange(checked: boolean | 'indeterminate') {
    setHeaderChecked(checked)
  }

  const columns: ColumnDef<{
    id: string
    name: string
    age: number
    email: string
    phone: string
    address: string
  }>[] = [
    {
      header: () => {
        return (
          <div className='flex items-center justify-center'>
            <Checkbox
              checked={headerChecked}
              onCheckedChange={handleHeaderCheckedChange}
            />
          </div>
        )
      },
      accessorKey: 'id',
      cell: () => {
        return (
          <div className='flex items-center justify-center'>
            <Checkbox />
          </div>
        )
      },
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Age',
      accessorKey: 'age',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
    },
  ]
  return (
    <div className=''>
      <DataTable
        columns={columns}
        data={[
          {
            name: 'John Doe',
            age: 25,
            email: 'john.doe@example.com',
            phone: '1234567890',
            address: '123 Main St, Anytown, USA',
            id: '',
          },
          {
            name: 'John Doe1',
            age: 25,
            email: 'john.doe@example.com',
            phone: '1234567890',
            address: '123 Main St, Anytown, USA',
            id: '',
          },
          {
            name: 'John Doe1',
            age: 26,
            email: 'john.doe@example.com',
            phone: '1234567890',
            address: '123 Main St, Anytown, USA',
            id: '',
          },
          {
            name: 'John Doe1',
            age: 25,
            email: 'john.doe@example.com',
            phone: '1234567890',
            address: '123 Main St, Anytown, USA',
            id: '',
          },
        ]}
      />
    </div>
  )
}
