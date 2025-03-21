'use client'

import { cn } from '@/lib/utils'
import { Label } from '@/shared/components/ui/label'
import type * as React from 'react'
import { switchVariants } from '../atoms/switch'
import { Checkbox as ShadcnCheckbox } from '../ui/checkbox'

interface Props {
  label?: string
  className?: string
  variant?: 'left' | 'right'
  labelProps?: React.ComponentPropsWithoutRef<typeof Label>
  checkboxProps?: React.ComponentPropsWithoutRef<typeof ShadcnCheckbox>
  id?: string
  ref?: React.Ref<HTMLButtonElement>
}

const CheckBox = ({
  label,
  variant = 'left',
  className,
  id,
  ref,
  ...props
}: Props) => {
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
      <ShadcnCheckbox id={id} ref={ref} {...props.checkboxProps} />
    </div>
  )
}

export { CheckBox }
