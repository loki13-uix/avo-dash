import { cn } from '@/lib/utils'
import type React from 'react'
import { Checkbox as ShadcnCheckbox } from '../ui/checkbox'
import { Icon } from './icon'

type Props = {
  checkboxProps?: React.ComponentPropsWithoutRef<typeof ShadcnCheckbox>
  selectedState?: boolean
  group?: boolean
}
const TableCellLeading = ({ checkboxProps, selectedState, group }: Props) => {
  return (
    <div
      className={cn(
        'border border-grey-3 hover:bg-[#F5F5FF] px-2 py-[6px] flex items-center',
        selectedState && 'bg-[#EBEBFF]',
        group && 'bg-grey-2 border border-grey-3 gap-x-2'
      )}
    >
      <ShadcnCheckbox
        {...checkboxProps}
        className={cn('border border-grey-8')}
      />

      {group && <Icon name='chevron-down' color='#605BFF' className='size-4' />}
    </div>
  )
}

export default TableCellLeading
