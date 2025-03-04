import TableCell from '../../shared/components/atoms/table-cell'

type TableRow = {
  id: string
  name: string
  email: string
}

type EmailColumnProps = {
  row: TableRow
  isSelected: boolean
  isReadOnly?: boolean
  onValueChange?: (id: string, value: string) => void
}

export const EmailColumn = ({
  row,
  isSelected,
  isReadOnly,
  onValueChange,
}: EmailColumnProps) => (
  <TableCell
    defaultValue={row.email}
    className='border-none w-full px-2 py-1.5'
    isSelected={isSelected}
    isReadOnly={isReadOnly}
    onChange={(newValue) => {
      if (onValueChange) {
        onValueChange(row.id, newValue)
      }
    }}
  />
)
