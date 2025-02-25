'use client'

import { cn } from '@/lib/utils'
import { Label } from '@/shared/components/ui/label'
import * as React from 'react'
import {
  RadioGroupItem as ShadcnRadio,
  RadioGroup as ShadcnRadioGroup,
} from '../ui/radio-group'
import { switchVariants } from './switch'

interface Props {
  className?: string
  variant?: 'left' | 'right'
  labelProps?: React.ComponentPropsWithoutRef<typeof Label>
  radioGroupProps?: React.ComponentPropsWithoutRef<typeof ShadcnRadioGroup>
  options: { label: string; value: string }[]
  id?: string
}

const Radio = React.forwardRef<HTMLDivElement, Props>(
  ({ variant = 'right', className, id, options, ...props }, ref) => {
    return (
      <div className={className} {...props}>
        <ShadcnRadioGroup
          ref={ref}
          className={props.radioGroupProps?.className}
          {...props.radioGroupProps}
          id={id}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                'flex items-center gap-2',
                switchVariants({ variant })
              )}
            >
              <ShadcnRadio id={option.value} value={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </ShadcnRadioGroup>
      </div>
    )
  }
)

Radio.displayName = 'RadioGroup'

export { Radio }
