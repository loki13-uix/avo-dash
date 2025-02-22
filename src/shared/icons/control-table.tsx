import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>
const ControlTable = ({ width = '24', height = '24', ...props }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      {...props}
    >
      <path d='M5.75 11.5V8.71429H11.125V11.5H5.75ZM5.75 13.3571H11.125V16.1429H5.75V13.3571ZM12.875 16.1429V13.3571H18.25V16.1429H12.875ZM18.25 11.5H12.875V8.71429H18.25V11.5ZM5.75 5C4.78477 5 4 5.83281 4 6.85714V16.1429C4 17.1672 4.78477 18 5.75 18H18.25C19.2152 18 20 17.1672 20 16.1429V6.85714C20 5.83281 19.2152 5 18.25 5H5.75Z' />
    </svg>
  )
}

export default ControlTable
