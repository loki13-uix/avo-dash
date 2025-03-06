import { useSelectionState } from '@/hook/use-selection-state'
import { createColumns } from '@/utils/create-columns-data-table'
import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { DataTable } from '.'

type TableRow = {
  id: string
  name: string
  email: string
}

type DataTableWithStateProps = {
  initialData: TableRow[]
  columns?: ColumnDef<TableRow>[] // Optional custom columns
  includeIcons?: boolean
  includeCheckbox?: boolean
  includeDropdown?: boolean
  isSortable?: boolean
  className?: string
}

export const DataTableWithState = ({
  initialData,
  columns, // New prop for custom columns
  includeIcons = false,
  includeCheckbox = false,
  includeDropdown = false,
  isSortable = true,
  className,
}: DataTableWithStateProps) => {
  const [data, setData] = useState(initialData)
  const {
    headerChecked,
    selectedRows,
    setSelectedRows,
    handleHeaderCheckedChange,
  } = useSelectionState({ initialData })

  const handleNameChange = (id: string, value: string) => {
    setData(
      data.map((item) => (item.id === id ? { ...item, name: value } : item))
    )
  }

  const handleEmailChange = (id: string, value: string) => {
    setData(
      data.map((item) => (item.id === id ? { ...item, email: value } : item))
    )
  }

  // Use user-provided columns if available, otherwise create default columns
  const tableColumns =
    columns ||
    createColumns({
      includeIcons,
      includeCheckbox,
      includeDropdown,
      selectedRows,
      setSelectedRows,
      headerChecked,
      onHeaderCheckedChange: handleHeaderCheckedChange,
      onNameChange: handleNameChange,
      onEmailChange: handleEmailChange,
    })

  return (
    <DataTable
      columns={tableColumns}
      data={data}
      setData={setData}
      selectedRows={selectedRows}
      isSortable={isSortable}
      className={className}
    />
  )
}
