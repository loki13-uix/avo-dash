import TableCell from '../../shared/components/atoms/table-cell'

type HeaderCellProps = {
  title: string
}

export const HeaderCell = ({ title }: HeaderCellProps) => (
  <TableCell defaultValue={title} className='border-none' isHeader />
)
