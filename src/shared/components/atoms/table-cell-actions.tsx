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
  name?: IconName[]
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
  name,
  iconColors,
  iconClassName,
}: Props) => {
  return (
    <div
      className={cn(
        'flex items-center border border-grey-3 px-2 py-1.5 gap-x-2 cursor-pointer min-h-8',
        isSelected ? 'bg-purple-1' : 'hover:bg-purple-0',
        isHeader && 'bg-grey-1 min-h-8',
        className
      )}
    >
      {plusIcon && <Icon name='plus-icon' color='#605BFF' className='size-5' />}
      {penIcon && <Icon name='pen' color='#605BFF' className='size-5' />}
      {fileWithData && (
        <Icon name='file-data' color='#605BFF' className='size-5' />
      )}
      {deleteIcon && <Icon name='trash' color='#605BFF' className='size-5' />}
      {dots && <Icon name='dots' color='#605BFF' className='size-5' />}
      {name?.map((item) => (
        <Icon
          name={item}
          key={item}
          color={iconColors}
          className={iconClassName}
        />
      ))}
    </div>
  )
}

export default TableCellActions
