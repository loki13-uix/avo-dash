import { cn } from '@/lib/utils'
import { CheckBox } from './checkbox'

interface Props {
  selectedState?: boolean
  group?: boolean
}
const TableCellLeading = ({ selectedState, group }: Props) => {
  return (
    <CheckBox
      className={cn(
        'border border-grey-3 hover:bg-[#F5F5FF] px-2 py-[6px] flex items-center',
        selectedState && 'bg-[#EBEBFF]',
        group && 'bg-grey-2 border border-grey-3 gap-x-2'
      )}
      shadcnClassName={cn('border border-grey-8')}
      group={group}
      variant='right'
    />
  )
}

export default TableCellLeading
