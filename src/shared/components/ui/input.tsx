import { cn } from '@/lib/utils'
import type React from 'react'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'w-full text-base bg-white p-0 placeholder:text-grey-13 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export { Input }
