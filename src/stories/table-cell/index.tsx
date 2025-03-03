import TableCell from '@/shared/components/atoms/table-cell'
import { useState } from 'react'

type Props = {
  defaultValue: string
  isSelected?: boolean
  selectDropdown?: boolean
  isHeader?: boolean
  isEditable?: boolean
}
const TableCellWrapper = ({
  defaultValue,
  isSelected,
  isHeader,
  selectDropdown,
  isEditable,
}: Props) => {
  const [value, setValue] = useState(defaultValue)

  const options = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' },
  ]
  return (
    <TableCell
      defaultValue={value}
      onChange={(newValue: string) => setValue(newValue)}
      isSelected={isSelected}
      selectDropdown={selectDropdown}
      options={options}
      isHeader={isHeader}
      isEditable={isEditable}
    />
  )
}

export default TableCellWrapper
