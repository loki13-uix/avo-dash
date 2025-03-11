import type { IconName } from '@/constants/icons'
import { cn } from '@/lib/utils'
import { Icon } from './icon'

type Props = {
  plusIcon?: boolean
  penIcon?: boolean
  fileWithData?: boolean
  deleteIcon?: boolean
  dots?: boolean
  isSelected?: boolean
  isHeader?: boolean
  className?: string
  iconNames?: IconName
  iconColors?: string
  iconClassName?: string
}

const TableCellActions = ({
  plusIcon,
  penIcon,
  fileWithData,
  deleteIcon,
  dots,
  isHeader,
  isSelected,
  className,
  iconNames,
  iconColors,
  iconClassName,
}: Props) => {
  return (
    <>
      {!iconNames && (
        <div
          className={cn(
            'flex items-center border border-grey-3 px-2 py-1.5 gap-x-2 cursor-pointer min-h-8',
            isSelected ? 'bg-[#EBEBFF]' : !isHeader && 'hover:bg-[#F5F5FF]',
            isHeader && 'bg-grey-1 min-h-8',
            className
          )}
        >
          {plusIcon && (
            <Icon name='plus-icon' color='#605BFF' className='size-5' />
          )}
          {penIcon && <Icon name='pen' color='#605BFF' className='size-5' />}
          {fileWithData && (
            <Icon name='file-data' color='#605BFF' className='size-5' />
          )}
          {deleteIcon && (
            <Icon name='trash' color='#605BFF' className='size-5' />
          )}
          {dots && <Icon name='dots' color='#605BFF' className='size-5' />}
        </div>
      )}

      {iconNames && (
        <div
          className={cn(
            'flex items-center px-2 py-1.5 cursor-pointer min-h-8 hover:bg-[#F5F5FF]'
          )}
        >
          {iconNames && (
            <Icon
              name={iconNames}
              color={iconColors}
              className={iconClassName}
            />
          )}
        </div>
      )}
    </>
  )
}

export default TableCellActions
