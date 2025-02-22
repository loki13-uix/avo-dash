import type { IconName } from '@/constants/icons'
import { cn } from '@/lib/utils'
import { Button as ShadcnButton } from '@/shared/components/ui/button'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'
import { Icon } from './icon'

const buttonVariants = cva(
  'group flex items-center gap-2 rounded-lg font-medium transition-colors',
  {
    variants: {
      variant: {
        standard:
          'bg-purple-10 text-white hover:bg-purple-9 disabled:bg-purple-10 disabled:text-purple-7',
        secondary:
          'border bg-white text-grey-13 border-grey-12 hover:border hover:border-grey-11 hover:bg-transparent hover:text-grey-12 disabled:border-grey-8 disabled:text-grey-5',
        'secondary-purple':
          'bg-transparent text-purple-10 border border-purple-10 hover:bg-transparent hover:text-purple-9 disabled:border-purple-4 disabled:text-purple-3',
        success:
          'bg-green-10 text-white hover:bg-green-9 disabled:bg-green-10 disabled:text-green-6',
        danger:
          'bg-red-10 text-white hover:bg-red-9 disabled:bg-red-10 disabled:text-red-6',
      },
    },
    defaultVariants: {
      variant: 'standard',
    },
  }
)

const iconVariants = cva('fill-current', {
  variants: {
    variant: {
      standard: 'fill-white group-disabled:fill-purple-7',

      secondary:
        'fill-grey-13 group-hover:fill-grey-12 group-disabled:fill-grey-5',
      'secondary-purple':
        'fill-purple-10 group-hover:fill-purple-9 group-disabled:fill-purple-3',
      success: 'fill-white group-disabled:fill-green-6',
      danger: 'fill-white group-disabled:fill-red-6',
    },
  },
  defaultVariants: {
    variant: 'standard',
  },
})

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: IconName
}

const Button = ({
  className,
  variant,
  children,
  icon,
  ...props
}: ButtonProps) => {
  return (
    <ShadcnButton
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {icon ? (
        <Icon name={icon} className={cn(iconVariants({ variant }))} />
      ) : null}
      {children}
    </ShadcnButton>
  )
}

Button.displayName = 'Button'

export { Button }
