'use client'

import { cn } from '@/lib/utils'
import { Label } from '@/shared/components/ui/label'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'
import { Switch as ShadcnSwitch } from '../ui/switch'

export const switchVariants = cva('flex items-center gap-2', {
  variants: {
    variant: {
      left: 'flex-row-reverse',
      right: 'flex-row',
    },
  },
  defaultVariants: {
    variant: 'right',
  },
})

interface Props
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof switchVariants> {
  label?: string
  className?: string
  labelProps?: React.ComponentPropsWithoutRef<typeof Label>
  switchProps?: React.ComponentPropsWithoutRef<typeof ShadcnSwitch>
  id?: string
  ref?: React.Ref<HTMLButtonElement>
}

const Switch = ({ label, variant, className, id, ref, ...props }: Props) => {
  return (
    <div className={cn(switchVariants({ variant }), className)} {...props}>
      {label && (
        <Label
          htmlFor={id}
          className={cn(
            'text-[13px] leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            props.labelProps?.className
          )}
          {...props.labelProps}
        >
          {label}
        </Label>
      )}
      <ShadcnSwitch
        id={id}
        ref={ref}
        className={cn(
          'data-[state=checked]:bg-purple-primary data-[state=unchecked]:border-purple-primary data-[state=unchecked]:bg-white',
          props.switchProps?.className
        )}
        thumbClassName='data-[state=unchecked]:bg-purple-primary data-[state=unchecked]:border-purple-primary'
        {...props.switchProps}
      />
    </div>
  )
}

export { Switch }
