import type { IconName } from '@/constants/icons'
import { cn } from '@/lib/utils'
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
        <Icon
          name='chevron-down'
          size={16}
          className={cn(
            'text-purple-primary shrink-0',
            !isExpanded && 'rotate-270'
          )}
          onClick={() => setIsExpanded(!isExpanded)}
        />
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
