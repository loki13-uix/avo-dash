'use client'

import type { IconName } from '@/constants/icons'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import type React from 'react'
import { type SVGProps, Suspense } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number | string
  color?: string
  style?: React.CSSProperties
  fallback?: React.ReactNode
}

const getIconComponent = (
  name: IconName
): React.ComponentType<SVGProps<SVGSVGElement>> =>
  dynamic(
    () =>
      import(`@/shared/icons/${name}`).catch(() => {
        console.warn(`Icon "${name}" not found`)
        return { default: () => null }
      }),
    {
      ssr: false,
      loading: () => null,
    }
  )

export const Icon: React.FC<IconProps> = ({
  name,
  size,
  color,
  className,
  style,
  fallback = null,
  ...props
}) => {
  const IconComponent = getIconComponent(name)

  return (
    <Suspense fallback={fallback}>
      <IconComponent
        width={size}
        height={size}
        color={color}
        className={cn('icon inline-block align-middle', className)}
        style={style}
        {...props}
      />
    </Suspense>
  )
}
