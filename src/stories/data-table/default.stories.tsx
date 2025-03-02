import { DataTable } from '@/shared/components/atoms/data-table'
import TableCell from '@/shared/components/atoms/table-cell'
import TableCellLeading from '@/shared/components/atoms/tablecell-leading'
import type { Meta, StoryObj } from '@storybook/react'
import type { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

const meta: Meta<typeof DataTable> = {
  title: 'Design System/atoms/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    columns: { table: { disable: true } },
    data: { table: { disable: true } },
  },
}

export default meta

type Story = StoryObj<typeof DataTable>

const initialData = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
  { id: '2', name: 'John Doe1', email: 'john.doe@example.com' },
  { id: '3', name: 'John Doe45', email: 'john.doe@example.com' },
  { id: '4', name: 'John Doe34', email: 'john.doe@example.com' },
]

const getColumns = (
  shouldIncludeIcons: boolean,
  shouldIncludeCheckbox: boolean,
  selectedRows: string[],
  setSelectedRows: (rows: string[]) => void,
  headerChecked: boolean | 'indeterminate',
  handleHeaderCheckedChange: (checked: boolean) => void
): ColumnDef<{
  id: string
  name: string
  email: string
}>[] => [
  ...(shouldIncludeCheckbox
    ? [
        {
          header: () => (
            <TableCellLeading
              className='border-none'
              checkboxProps={{
                checked: headerChecked,
                onCheckedChange: handleHeaderCheckedChange,
              }}
              isHeader
            />
          ),
          accessorKey: 'checkbox',
          cell: ({ row }) => (
            <TableCellLeading
              selectedState={selectedRows.includes(row.original.id)}
              className='border-none'
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
          ),
        },
      ]
    : []),
  {
    header: () => (
      <TableCell
        defaultValue='Column with Select content'
        className='border-none w-[250px]'
        isHeader
      />
    ),
    accessorKey: 'name',
    cell: ({ row }) => (
      <TableCell
        defaultValue={row.original.name}
        className='border-none w-full px-2 py-1.5'
        isSelected={selectedRows.includes(row.original.id)}
        isReadOnly={!shouldIncludeIcons}
      />
    ),
  },
  {
    header: () => (
      <TableCell
        defaultValue='Column with Text content'
        className='border-none w-[250px]'
        isHeader
      />
    ),
    accessorKey: 'email',
    cell: ({ row }) => (
      <TableCell
        defaultValue={row.original.email}
        className='border-none w-full px-2 py-1.5'
        isSelected={selectedRows.includes(row.original.id)}
      />
    ),
  },
  ...(shouldIncludeIcons
    ? [
        {
          header: () => (
            <TableCell
              defaultValue='Icon Column'
              className='border-none w-[100px]'
              isHeader
            />
          ),
          accessorKey: 'icon',
          cell: () => (
            <TableCell
              defaultValue='🔔'
              className='border-none w-full px-2 py-1.5 text-center'
              isReadOnly={shouldIncludeIcons}
            />
          ),
        },
      ]
    : []),
]

// ReadOnly Story (No checkboxes or selection)
export const ReadOnly: Story = {
  args: {
    columns: getColumns(
      false,
      false,
      [],
      () => {},
      false,
      () => {}
    ),
    data: initialData,
  },
}

// DataControls Story (Icons, no checkboxes)
export const DataControls: Story = {
  args: {
    columns: getColumns(
      true,
      false,
      [],
      () => {},
      false,
      () => {}
    ),
    data: initialData,
  },
}

export const DataWithControls: Story = {
  render: (args) => {
    const [headerChecked, setHeaderChecked] = useState<
      boolean | 'indeterminate'
    >(false)
    const [selectedRows, setSelectedRows] = useState<string[]>([])

    useEffect(() => {
      const totalRows = initialData.length
      const selectedCount = selectedRows.length

      if (selectedCount === 0) {
        setHeaderChecked(false)
      } else if (selectedCount === totalRows) {
        setHeaderChecked(true)
      } else {
        setHeaderChecked('indeterminate')
      }
    }, [selectedRows])

    const handleHeaderCheckedChange = (checked: boolean) => {
      setHeaderChecked(checked)
      if (checked) {
        setSelectedRows(initialData.map((row) => row.id))
      } else {
        setSelectedRows([])
      }
    }

    return (
      <DataTable
        {...args}
        columns={getColumns(
          true,
          true,
          selectedRows,
          setSelectedRows,
          headerChecked,
          handleHeaderCheckedChange
        )}
        data={initialData}
        selectedRows={selectedRows}
      />
    )
  },
}

export const DataWithControlsAndSelection: Story = {
  render: (args) => (
    <DataTable
      {...args}
      columns={getColumns(
        true,
        true,
        [],
        () => {},
        false,
        () => {}
      )}
      data={initialData}
      selectedRows={[]}
    />
  ),
}
