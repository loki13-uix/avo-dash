import type { IconName } from '@/constants/icons'
import { cn } from '@/lib/utils'
import { Button } from '@/shared/components/atoms/button'
import { Icon } from '@/shared/components/atoms/icon'

interface TreeHeaderProps {
  isExpanded: boolean
  setIsExpanded: (isExpanded: boolean) => void
  iconName?: IconName
  headerText?: string
}

function TreeHeader({
  isExpanded,
  setIsExpanded,
  iconName = 'test-case',
  headerText = 'Default Test Case',
}: TreeHeaderProps) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <Button
          variant='secondary'
          className='p-0 border-none h-5 w-5 bg-inherit'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon
            name='chevron-down'
            size={16}
            className={cn(
              'text-purple-primary shrink-0',
              !isExpanded && 'rotate-270'
            )}
          />
        </Button>
        <div className='flex items-center gap-1'>
          <Icon name={iconName} size={20} className='fill-grey-12  shrink-0' />
          <span>{headerText}</span>
        </div>
      </div>
      <Icon
        name='plus-icon'
        size={18}
        className='shrink-0 text-purple-primary  mt-1'
      />
    </div>
  )
}

export default TreeHeader
