'use client'
import type { IconName } from '@/constants/icons'
import { iconRegistry } from '@/constants/icons'
import { cn } from '@/lib/utils'
import type React from 'react'
import type { SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number | string
  color?: string
  style?: React.CSSProperties
  useDefaultColor?: boolean
}
export const Icon: React.FC<IconProps> = ({
  name,
  size,
  color,
  className,
  style,
  onClick,
  useDefaultColor = true,
  ...props
}) => {
  const IconComponent = iconRegistry.get(name)

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return (
    <IconComponent
      width={size}
      height={size}
      color={color}
      className={cn(
        'inline-block align-middle',
        useDefaultColor && 'icon',
        className
      )}
      style={style}
      onClick={onClick}
      {...props}
    />
  )
}
