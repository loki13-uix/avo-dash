import { cn } from '@/lib/utils'
import { Button as ShadcnButton } from '@/shared/components/ui/button'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

const buttonVariants = cva(
  'group flex items-center gap-2 rounded-lg font-medium transition-colors',
  {
    variants: {
      variant: {
        standard:
          'bg-purple-10 text-white hover:bg-purple-9 disabled:bg-purple-10 disabled:text-purple-7 [&_svg]:fill-white',
        secondary:
          'border border-grey-12 bg-white text-grey-13 hover:border hover:border-grey-11 hover:bg-transparent hover:text-grey-12 disabled:border-grey-8 disabled:text-grey-5 [&_svg]:fill-grey-13',
        'secondary-purple':
          'border border-purple-10 bg-transparent text-purple-10 hover:bg-transparent hover:text-purple-9 disabled:border-purple-4 disabled:text-purple-3 [&_svg]:fill-purple-9',
        success:
          'bg-green-10 text-white hover:bg-green-9 disabled:bg-green-11 disabled:text-green-6 [&_svg]:fill-white',
        danger:
          'bg-red-10 text-white hover:bg-red-9 disabled:bg-red-10 disabled:text-red-6 [&_svg]:fill-white disabled:[&_svg]:fill-black',
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
      standard: 'fill-white group-disabled:fill-white',
      secondary: 'fill-grey-13',
      'secondary-purple': 'fill-purple-9',
      success: 'fill-white',
      danger: 'fill-white',
    },
  },
  defaultVariants: {
    variant: 'standard',
  },
})

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ElementType
}

const Button = ({
  className,
  variant,
  children,
  icon,
  ...props
}: ButtonProps) => {
  const Icon = icon
  return (
    <ShadcnButton
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {Icon ? <Icon className={cn(iconVariants({ variant }))} /> : null}
      {children}
    </ShadcnButton>
  )
}

Button.displayName = 'Button'

export { Button }
