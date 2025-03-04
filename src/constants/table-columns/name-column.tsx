import TableCell from '@/shared/components/atoms/table-cell'

type TableRow = {
  id: string
  name: string
  email: string
}

type NameColumnProps = {
  row: TableRow
  isSelected: boolean
  isReadOnly?: boolean
  onValueChange?: (id: string, value: string) => void
  isDropdown?: boolean
}

export const NameColumn = ({
  row,
  isSelected,
  isReadOnly = false,
  onValueChange,
  isDropdown = false,
}: NameColumnProps) => (
  <TableCell
    defaultValue={row.name}
    className='border-none px-2 py-1.5'
    isSelected={isSelected}
    isReadOnly={isReadOnly}
    onChange={(newValue) => {
      if (onValueChange) {
        onValueChange(row.id, newValue)
      }
    }}
    selectDropdown={isDropdown}
    options={[
      {
        label: 'John Doe',
        value: 'John Doe',
      },
      {
        label: 'John Doe2',
        value: 'John Doe2',
      },
    ]}
  />
)
