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
}: Props) => {
  return (
    <div
      className={cn(
        'flex items-center border border-grey-3 hover:bg-[#F5F5FF] px-2 py-1.5 gap-x-2 cursor-pointer',
        isSelected && 'bg-purple-1',
        isHeader && 'bg-grey-1',
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
    </div>
  )
}

export default TableCellActions
