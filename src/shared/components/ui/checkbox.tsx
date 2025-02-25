'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import type * as React from 'react'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        'peer h-5 w-5 shrink-0 rounded-sm border border-purple-10 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-purple-primary data-[state=checked]:text-primary-foreground disabled:border-grey-10',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className={cn(
          'flex items-center justify-center text-current',
          'data-[state=indeterminate]:relative',
          'data-[state=indeterminate]:after:absolute data-[state=indeterminate]:after:h-3 data-[state=indeterminate]:after:w-3 data-[state=indeterminate]:after:bg-purple-10 data-[state=indeterminate]:after:rounded-[2px] data-[state=indeterminate]:after:top-0.5 data-[state=indeterminate]:after:right-[3px]',
          'data-[state=indeterminate]:children:hidden'
        )}
      >
        <Check className='h-4 w-4' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
