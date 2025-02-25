import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>
const Mobile = ({ width, height, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' {...props}>
      <path d='M5 4.5C5 3.12109 6.12109 2 7.5 2H16.25C17.6289 2 18.75 3.12109 18.75 4.5V19.5C18.75 20.8789 17.6289 22 16.25 22H7.5C6.12109 22 5 20.8789 5 19.5V4.5ZM10 19.5C10 19.8438 10.2812 20.125 10.625 20.125H13.125C13.4688 20.125 13.75 19.8438 13.75 19.5C13.75 19.1562 13.4688 18.875 13.125 18.875H10.625C10.2812 18.875 10 19.1562 10 19.5ZM16.25 4.5H7.5V17H16.25V4.5Z' />
    </svg>
  )
}

export default Mobile
