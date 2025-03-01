'use client'
import { DataTable } from '@/shared/components/atoms/data-table'
import TableCell from '@/shared/components/atoms/table-cell'
import TableCellLeading from '@/shared/components/atoms/tablecell-leading'
import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

export default function Home() {
  const [headerChecked, setHeaderChecked] = useState<boolean | 'indeterminate'>(
    false
  )

  const initialData = [
    {
      name: 'John Doe',
      age: 25,
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St, Anytown, USA',
      id: '1',
    },
    {
      name: 'John Doe1',
      age: 25,
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St, Anytown, USA',
      id: '2',
    },
    {
      name: 'John Doe45',
      age: 26,
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St, Anytown, USA',
      id: '3',
    },
    {
      name: 'John Doe34',
      age: 25,
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St, Anytown, USA',
      id: '4',
    },
  ]
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [data, setData] = useState(initialData)

  function handleHeaderCheckedChange(checked: boolean) {
    setHeaderChecked(checked)
    if (checked) {
      setSelectedRows(initialData.map((row) => row.id))
    } else {
      setSelectedRows([])
    }
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
          <div className='bg-grey-2'>
            <TableCellLeading
              className='border-0'
              checkboxProps={{
                checked: headerChecked,
                onCheckedChange: handleHeaderCheckedChange,
              }}
            />
          </div>
        )
      },
      accessorKey: 'id',
      cell: ({ row }) => {
        return (
          <TableCellLeading
            selectedState={selectedRows.includes(row.original.id)}
            className='border-0'
            checkboxProps={{
              checked: selectedRows.includes(row.original.id),
              onCheckedChange: (checked) => {
                if (checked) {
                  setSelectedRows([...selectedRows, row.original.id])
                } else {
                  setSelectedRows(
                    selectedRows.filter((id) => id !== row.original.id)
                  )
                }
              },
            }}
          />
        )
      },
    },
    {
      header: () => (
        <TableCell defaultValue='Name' className='border-0 w-full' isHeader />
      ),
      accessorKey: 'name',
      cell: ({ row }) => {
        return (
          <TableCell
            defaultValue={row.original.name}
            className='border-0 w-full'
            isSelected={selectedRows.includes(row.original.id)}
            isEditable
            onChange={(newValue) => {
              setData(
                data.map((item) =>
                  item.id === row.original.id
                    ? { ...item, name: newValue }
                    : item
                )
              )
            }}
          />
        )
      },
    },
    {
      header: () => (
        <TableCell defaultValue='Age' className='border-0 w-full' isHeader />
      ),
      accessorKey: 'age',
      cell: ({ row }) => {
        return (
          <TableCell
            defaultValue={row.original.age.toString()}
            className='border-0'
            isSelected={selectedRows.includes(row.original.id)}
            isEditable
            onChange={(newValue) => {
              const newAge = Number.parseInt(newValue)
              if (!Number.isNaN(newAge)) {
                setData(
                  data.map((item) =>
                    item.id === row.original.id
                      ? { ...item, age: newAge }
                      : item
                  )
                )
              }
            }}
          />
        )
      },
    },
    {
      header: () => (
        <TableCell defaultValue='Email' className='border-0 w-full' isHeader />
      ),
      accessorKey: 'email',
      cell: ({ row }) => {
        return (
          <TableCell
            defaultValue={row.original.email}
            className='border-0'
            isSelected={selectedRows.includes(row.original.id)}
          />
        )
      },
    },
    {
      header: () => (
        <TableCell defaultValue='Phone' className='border-0 w-full' isHeader />
      ),
      accessorKey: 'phone',
      cell: ({ row }) => {
        return (
          <TableCell
            defaultValue={row.original.phone}
            className='border-0'
            isSelected={selectedRows.includes(row.original.id)}
          />
        )
      },
    },
    {
      header: () => (
        <TableCell
          defaultValue='address'
          className='border-0 w-full'
          isHeader
        />
      ),
      accessorKey: 'address',
      cell: ({ row }) => {
        return (
          <TableCell
            defaultValue={row.original.address}
            className='border-0'
            isSelected={selectedRows.includes(row.original.id)}
          />
        )
      },
    },
  ]
  return (
    <div className=''>
      <DataTable
        columns={columns}
        data={data}
        setData={setData}
        selectedRows={selectedRows}
      />
    </div>
  )
}
