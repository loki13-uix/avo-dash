import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>
const GripBar = ({ width, height, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' {...props}>
      <path d='M7.42857 13.7143C6.63839 13.7143 6 14.3527 6 15.1429C6 15.933 6.63839 16.5714 7.42857 16.5714H16.5714C17.3616 16.5714 18 15.933 18 15.1429C18 14.3527 17.3616 13.7143 16.5714 13.7143H7.42857ZM7.42857 8C6.63839 8 6 8.63839 6 9.42857C6 10.2188 6.63839 10.8571 7.42857 10.8571H16.5714C17.3616 10.8571 18 10.2188 18 9.42857C18 8.63839 17.3616 8 16.5714 8H7.42857Z' />
    </svg>
  )
}

export default GripBar
