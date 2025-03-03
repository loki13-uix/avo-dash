import { useEffect, useState } from 'react'

type TableRow = {
  id: string
  name: string
  email: string
}

type UseSelectionStateProps = {
  initialData: TableRow[]
}

export const useSelectionState = ({ initialData }: UseSelectionStateProps) => {
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
  }, [selectedRows, initialData.length])

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
