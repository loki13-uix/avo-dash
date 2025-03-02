import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Icon } from './icon'
import PopoverDemo from './popover'

type Props = {
  plusIcon?: boolean
  penIcon?: boolean
  fileWithData?: boolean
  deleteIcon?: boolean
  dots?: boolean
  isSelected?: boolean
  isHeader?: boolean
  className?: string
  onDotsClick?: () => void
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
  const [open, setOpen] = useState(false)
  return (
    <div
      className={cn(
        'flex items-center border border-grey-3 hover:bg-[#F5F5FF] px-2 py-1.5 gap-x-2',
        isSelected && 'bg-[#EBEBFF]',
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
      {dots && (
        <Icon
          name='dots'
          color='#605BFF'
          className='size-5'
          onClick={() => setOpen((prev) => !prev)}
        />
      )}
      {open && <PopoverDemo open={open} setOpen={setOpen} />}
    </div>
  )
}

export default TableCellActions
