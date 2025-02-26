import { cn } from '@/lib/utils'
import type React from 'react'
import { Input } from '../ui/input'
import { Icon } from './icon'

const TextField = ({
  className,
  iconClassName,
  ref,
  ...props
}: React.ComponentProps<'input'> & {
  ref?: React.Ref<HTMLInputElement>
  iconClassName?: string
}) => {
  return (
    <div
      className={cn(
        'relative flex items-center p-2 gap-x-2 rounded-sm w-80 border border-grey-7 focus-within:border-purple-10 disabled:border-grey-3 disabled:bg-transparent',
        className
      )}
    >
      <Input
        type='text'
        className='peer flex-1 p-0 text-grey-13 border-none bg-transparent placeholder:text-grey-8 disabled:text-grey-4'
        ref={ref}
        {...props}
      />
      <Icon
        name='search-icon'
        className={cn(
          'text-grey-12 peer-disabled:text-grey-3',

          iconClassName
        )}
      />
    </div>
  )
}
export default TextField
