import type { IconName } from '@/constants/icons'
import { cn } from '@/lib/utils'
import { Button as ShadcnButton } from '@/shared/components/ui/button'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'
import { Icon } from './icon'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors group',
  {
    variants: {
      variant: {
        secondary:
          'border bg-white text-grey-13 border-grey-12 hover:border hover:border-grey-11 hover:bg-transparent hover:text-grey-12 disabled:border-grey-8 disabled:text-grey-5',
        success:
          'bg-green-10 text-white hover:bg-green-9 disabled:bg-green-10 disabled:text-green-6',
        danger:
          'bg-red-10 text-white hover:bg-red-9 disabled:bg-red-10 disabled:text-red-6',
        'secondary-purple':
          'bg-transparent text-purple-10 border border-purple-10 hover:bg-transparent hover:text-purple-9 disabled:border-purple-4 disabled:text-purple-3',
        standard:
          'bg-purple-10 text-white hover:bg-purple-9 disabled:bg-purple-10 disabled:text-purple-7',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
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
  iconClassName?: string
}

const Button = ({
  className,
  variant,
  children,
  iconClassName,
  icon,
  ...props
}: ButtonProps) => {
  return (
    <ShadcnButton
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {icon ? (
        <Icon
          name={icon}
          className={cn(iconVariants({ variant }), iconClassName)}
        />
      ) : null}
      {children}
    </ShadcnButton>
  )
}

Button.displayName = 'Button'

export { Button }
