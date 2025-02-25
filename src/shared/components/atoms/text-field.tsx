import { cn } from '@/lib/utils'
import React from 'react'
import { Input } from '../ui/input'
import { Icon } from './icon'

const TextField = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => {
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
        className='fill-grey-12 peer-disabled:fill-grey-3'
      />
    </div>
  )
})

TextField.displayName = 'TextField'

export default TextField
