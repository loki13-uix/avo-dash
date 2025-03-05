import TableCellActions from '@/shared/components/atoms/table-cell-actions'

type TableRow = {
  id: string
  name: string
  email: string
}

type ActionsColumnProps = {
  row?: TableRow
  isSelected?: boolean
  isHeader?: boolean
}

export const ActionsColumn = ({
  isSelected,
  isHeader = false,
}: ActionsColumnProps) => (
  <TableCellActions
    plusIcon
    dots
    className='border-none'
    isHeader={isHeader}
    isSelected={isSelected}
  />
)
