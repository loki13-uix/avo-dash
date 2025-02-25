import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>

const Screen = ({ width, height, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' {...props}>
      <path d='M21 14H3V4H21M21 2H3C1.89 2 1 2.8905 1 4V16C1 17.1045 1.8955 18 3 18H10L8 21V22H16V21L14 18H21C22.1045 18 23 17.1045 23 16V4C23 2.8905 22.0995 2 21 2Z' />
    </svg>
  )
}

export default Screen
