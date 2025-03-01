'use client'

import { DataTable } from '@/shared/components/atoms/data-table'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
export default function Home() {
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
            <Checkbox />
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
            id: ''
          },
        ]}
      />
    </div>
  )
}
