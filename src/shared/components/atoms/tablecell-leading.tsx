import { cn } from '@/lib/utils'
import type React from 'react'
import { Checkbox as ShadcnCheckbox } from '../ui/checkbox'
import { Icon } from './icon'

interface Props {
  checkboxProps?: React.ComponentPropsWithoutRef<typeof ShadcnCheckbox>
  hoverState?: boolean
  selectedState?: boolean
  group?: boolean
}
const TableCellLeading = ({
  checkboxProps,
  hoverState,
  selectedState,
  group,
}: Props) => {
  return (
    <div
      className={cn(
        'border border-grey-3 py-[8px] px-[6px] m-10',
        hoverState && 'bg-[#F5F5FF]',
        selectedState && 'bg-[#EBEBFF]',
        group && 'bg-grey-2 border border-grey-3'
      )}
    >
      <ShadcnCheckbox
        {...checkboxProps}
        className={cn('border border-grey-8')}
      />

      {group && (
        <Icon name='chevron' rotate={270} color='#605BFF' className='size-4' />
      )}
    </div>
  )
}

export default TableCellLeading
