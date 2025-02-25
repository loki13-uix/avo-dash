'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import type * as React from 'react'

import { cn } from '@/lib/utils'

interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  thumbClassName?: string
}

function Switch({ className, thumbClassName, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot='switch'
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input data-[state=unchecked]:p-0.5',
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block h-4.5 w-4.5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
          thumbClassName
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
