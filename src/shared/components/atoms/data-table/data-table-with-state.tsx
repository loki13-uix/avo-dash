import { useSelectionState } from '@/hook/use-selection-state'
import { createColumns } from '@/utils/create-columns-data-table'
import { useState } from 'react'
import { DataTable } from '.'

type TableRow = {
  id: string
  name: string
  email: string
}

type DataTableWithStateProps = {
  initialData: TableRow[]
  includeIcons?: boolean
  includeCheckbox?: boolean
  includeDropdown?: boolean
  isSortable?: boolean
}

export const DataTableWithState = ({
  initialData,
  includeIcons = false,
  includeCheckbox = false,
  includeDropdown = false,
  isSortable = true,
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

  return (
    <DataTable
      columns={createColumns({
        includeIcons,
        includeCheckbox,
        includeDropdown,
        selectedRows,
        setSelectedRows,
        headerChecked,
        onHeaderCheckedChange: handleHeaderCheckedChange,
        onNameChange: handleNameChange,
        onEmailChange: handleEmailChange,
      })}
      data={data}
      setData={setData}
      selectedRows={selectedRows}
      isSortable={isSortable}
    />
  )
}
