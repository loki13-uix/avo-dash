import { NAME_OPTIONS } from '@/constants/constants'
import { DataTable } from '@/shared/components/atoms/data-table'
import TableCell from '@/shared/components/atoms/table-cell'
import TableCellActions from '@/shared/components/atoms/table-cell-actions'
import TableCellLeading from '@/shared/components/atoms/tablecell-leading'
import useFileStore from '@/shared/store/store'
import type { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

type TableComponentProps = {
  className?: string
}

export const TableComponent = ({ className }: TableComponentProps) => {
  const [headerChecked, setHeaderChecked] = useState<boolean | 'indeterminate'>(
    false
  )
  const selectedFile = useFileStore((state) => state.selectedFile)
  const setSelectedFile = useFileStore((state) => state.setSelectedFile)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [data, setData] = useState(selectedFile)

  useEffect(() => {
    setData(selectedFile)
  }, [selectedFile])

  function handleHeaderCheckedChange(checked: boolean) {
    setHeaderChecked(checked)
    if (checked) {
      setSelectedRows(selectedFile.map((row) => row.id))
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
          <TableCellLeading
            className='border-0 pl-6.5'
            isHeader
            checkboxProps={{
              checked: headerChecked,
              onCheckedChange: handleHeaderCheckedChange,
            }}
          />
        )
      },
      accessorKey: 'checkbox',
      size: 65,
      enableResizing: true,
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
            className='border-0 w-[200px]'
            selectDropdown
            options={NAME_OPTIONS}
            isSelected={selectedRows.includes(row.original.id)}
            onChange={(newValue) => {
              setSelectedFile(
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
      size: 122,
      enableResizing: true,
      cell: ({ row }) => {
        return (
          <TableCell
            defaultValue={row.original.age.toString()}
            className='border-0'
            isSelected={selectedRows.includes(row.original.id)}
            onChange={(newValue) => {
              const newAge = Number.parseInt(newValue)
              if (!Number.isNaN(newAge)) {
                setSelectedFile(
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
      size: 450,
      enableResizing: true,
      cell: ({ row }) => {
        return (
          <TableCell
            defaultValue={row.original.email}
            className='border-0 '
            isSelected={selectedRows.includes(row.original.id)}
            onChange={(newValue) => {
              setSelectedFile(
                data.map((item) =>
                  item.id === row.original.id
                    ? { ...item, email: newValue }
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
        <TableCell defaultValue='Phone' className='border-0 w-full' isHeader />
      ),
      accessorKey: 'phone',
      size: 250,
      enableResizing: true,
      cell: ({ row }) => {
        return (
          <TableCell
            defaultValue={row.original.phone}
            className='border-0 '
            isSelected={selectedRows.includes(row.original.id)}
            onChange={(newValue) => {
              setSelectedFile(
                data.map((item) =>
                  item.id === row.original.id
                    ? { ...item, phone: newValue }
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
        <TableCell
          defaultValue='address'
          className='border-0 w-full'
          isHeader
        />
      ),
      accessorKey: 'address',
      size: 500,
      enableResizing: true,
      cell: ({ row }) => {
        return (
          <TableCell
            defaultValue={row.original.address}
            className='border-0 '
            isSelected={selectedRows.includes(row.original.id)}
            onChange={(newValue) => {
              setSelectedFile(
                data.map((item) =>
                  item.id === row.original.id
                    ? { ...item, address: newValue }
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
        <TableCellActions dots plusIcon className='border-0' isHeader />
      ),
      accessorKey: 'actions',
      size: 100,
      enableResizing: true,
      cell: ({ row }) => (
        <TableCellActions
          dots
          plusIcon
          className='border-0'
          isSelected={selectedRows.includes(row.original.id)}
        />
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      setData={setData}
      selectedRows={selectedRows}
      className={className}
    />
  )
}
