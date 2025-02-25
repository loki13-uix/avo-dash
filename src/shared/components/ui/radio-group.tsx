'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import type * as React from 'react'

import { cn } from '@/lib/utils'
import { Circle } from 'lucide-react'

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot='radio-group'
      className={cn('grid gap-3', className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot='radio-group-item'
      className={cn(
        'aspect-square h-5 w-5 rounded-full border border-purple-primary text-white ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-purple-primary',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
        <Circle className='h-2 w-2 fill-current text-current' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
