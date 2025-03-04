import TableCellLeading from '@/shared/components/atoms/tablecell-leading'

type TableRow = {
  id: string
  name: string
  email: string
}

type CheckboxColumnProps = {
  row?: TableRow
  selectedRows: string[]
  setSelectedRows: (rows: string[]) => void
  isHeader?: boolean
  headerChecked?: boolean | 'indeterminate'
  onHeaderCheckedChange?: (checked: boolean) => void
}

export const CheckboxColumn = ({
  row,
  selectedRows,
  setSelectedRows,
  isHeader = false,
  headerChecked = false,
  onHeaderCheckedChange = () => {},
}: CheckboxColumnProps) => {
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
