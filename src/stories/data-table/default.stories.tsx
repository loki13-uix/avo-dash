import { DataTable } from '@/shared/components/atoms/data-table'
import TableCell from '@/shared/components/atoms/table-cell'
import TableCellActions from '@/shared/components/atoms/table-cell-actions'
import TableCellLeading from '@/shared/components/atoms/tablecell-leading'
import type { Meta, StoryObj } from '@storybook/react'
import type { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

type TableRow = {
  id: string
  name: string
  email: string
}

const initialData: TableRow[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
  { id: '2', name: 'John Doe1', email: 'john.doe@example.com' },
  { id: '3', name: 'John Doe45', email: 'john.doe@example.com' },
  { id: '4', name: 'John Doe34', email: 'john.doe@example.com' },
]

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

const NameColumn = ({
  row,
  isSelected,
  isReadOnly = false,
}: {
  row: TableRow
  isSelected: boolean
  isReadOnly?: boolean
}) => (
  <TableCell
    defaultValue={row.name}
    className='border-none w-full px-2 py-1.5'
    isSelected={isSelected}
    isReadOnly={isReadOnly}
  />
)

const EmailColumn = ({
  row,
  isSelected,
}: {
  row: TableRow
  isSelected: boolean
}) => (
  <TableCell
    defaultValue={row.email}
    className='border-none w-full px-2 py-1.5'
    isSelected={isSelected}
  />
)

const CheckboxColumn = ({
  row,
  selectedRows,
  setSelectedRows,
  isHeader = false,
  headerChecked = false,
  onHeaderCheckedChange = () => {},
}: {
  row?: TableRow
  selectedRows: string[]
  setSelectedRows: (rows: string[]) => void
  isHeader?: boolean
  headerChecked?: boolean | 'indeterminate'
  onHeaderCheckedChange?: (checked: boolean) => void
}) => {
  if (isHeader) {
    return (
      <TableCellLeading
        className='border-none'
        checkboxProps={{
          checked: headerChecked,
          onCheckedChange: onHeaderCheckedChange,
        }}
        isHeader
      />
    )
  }

  if (!row) return null

  return (
    <TableCellLeading
      selectedState={selectedRows.includes(row.id)}
      className='border-none'
      checkboxProps={{
        checked: selectedRows.includes(row.id),
        onCheckedChange: (checked) => {
          if (checked) {
            setSelectedRows([...selectedRows, row.id])
          } else {
            setSelectedRows(selectedRows.filter((id) => id !== row.id))
          }
        },
      }}
    />
  )
}

const ActionsColumn = ({
  isSelected,
  isHeader = false,
}: {
  row?: TableRow
  isSelected?: boolean
  isHeader?: boolean
}) => (
  <TableCellActions
    plusIcon
    dots
    className='border-none'
    isHeader={isHeader}
    isSelected={isSelected}
  />
)

const createColumns = ({
  includeIcons = false,
  includeCheckbox = false,
  selectedRows = [],
  setSelectedRows = () => {},
  headerChecked = false,
  onHeaderCheckedChange = () => {},
}: {
  includeIcons?: boolean
  includeCheckbox?: boolean
  selectedRows?: string[]
  setSelectedRows?: (rows: string[]) => void
  headerChecked?: boolean | 'indeterminate'
  onHeaderCheckedChange?: (checked: boolean) => void
}): ColumnDef<TableRow>[] => {
  const columns: ColumnDef<TableRow>[] = []

  if (includeCheckbox) {
    columns.push({
      header: () => (
        <CheckboxColumn
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          isHeader={true}
          headerChecked={headerChecked}
          onHeaderCheckedChange={onHeaderCheckedChange}
        />
      ),
      accessorKey: 'checkbox',
      cell: ({ row }) => (
        <CheckboxColumn
          row={row.original}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      ),
    })
  }

  columns.push({
    header: () => (
      <TableCell
        defaultValue='Column with Select content'
        className='border-none w-[250px]'
        isHeader
      />
    ),
    accessorKey: 'name',
    cell: ({ row }) => (
      <NameColumn
        row={row.original}
        isSelected={selectedRows.includes(row.original.id)}
        isReadOnly={!includeIcons}
      />
    ),
  })

  columns.push({
    header: () => (
      <TableCell
        defaultValue='Column with Text content'
        className='border-none w-[250px]'
        isHeader
      />
    ),
    accessorKey: 'email',
    cell: ({ row }) => (
      <EmailColumn
        row={row.original}
        isSelected={selectedRows.includes(row.original.id)}
      />
    ),
  })

  if (includeIcons) {
    columns.push({
      header: () => <ActionsColumn isHeader={true} />,
      accessorKey: 'icon',
      cell: ({ row }) => (
        <ActionsColumn
          row={row.original}
          isSelected={selectedRows.includes(row.original.id)}
        />
      ),
    })
  }

  return columns
}

const useSelectionState = () => {
  const [headerChecked, setHeaderChecked] = useState<boolean | 'indeterminate'>(
    false
  )
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

  return {
    headerChecked,
    selectedRows,
    setSelectedRows,
    handleHeaderCheckedChange,
  }
}

// Story components
export const ReadOnly: Story = {
  args: {
    columns: createColumns({}),
    data: initialData,
  },
}

export const DataControls: Story = {
  render: (args) => {
    const { selectedRows, setSelectedRows } = useSelectionState()

    return (
      <DataTable
        {...args}
        columns={createColumns({
          includeIcons: true,
          selectedRows,
          setSelectedRows,
        })}
        data={initialData}
        selectedRows={selectedRows}
      />
    )
  },
}

export const DataWithControls: Story = {
  render: (args) => {
    const {
      headerChecked,
      selectedRows,
      setSelectedRows,
      handleHeaderCheckedChange,
    } = useSelectionState()

    return (
      <DataTable
        {...args}
        columns={createColumns({
          includeIcons: true,
          includeCheckbox: true,
          selectedRows,
          setSelectedRows,
          headerChecked,
          onHeaderCheckedChange: handleHeaderCheckedChange,
        })}
        data={initialData}
        selectedRows={selectedRows}
      />
    )
  },
}

export const DataWithControlsAndSelection: Story = {
  render: (args) => {
    const {
      headerChecked,
      selectedRows,
      setSelectedRows,
      handleHeaderCheckedChange,
    } = useSelectionState()

    return (
      <DataTable
        {...args}
        columns={createColumns({
          includeIcons: true,
          includeCheckbox: true,
          selectedRows,
          setSelectedRows,
          headerChecked,
          onHeaderCheckedChange: handleHeaderCheckedChange,
        })}
        data={initialData}
        selectedRows={selectedRows}
      />
    )
  },
}
