import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>

const ChevronDownIcon = ({ width, height, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' {...props}>
      <path d='M11.3948 15.6052C11.7296 15.9399 12.2731 15.9399 12.6078 15.6052L17.749 10.464C18.0837 10.1293 18.0837 9.58574 17.749 9.25103C17.4143 8.91632 16.8707 8.91632 16.536 9.25103L12 13.787L7.46402 9.25371C7.12931 8.919 6.58574 8.919 6.25103 9.25371C5.91632 9.58842 5.91632 10.132 6.25103 10.4667L11.3922 15.6078L11.3948 15.6052Z' />
    </svg>
  )
}

export default ChevronDownIcon
