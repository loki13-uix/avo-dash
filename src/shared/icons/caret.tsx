import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>
const Caret = ({ width, height, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' {...props}>
      <path d='M11.1524 15.8484C11.621 16.3169 12.3819 16.3169 12.8505 15.8484L17.6485 11.0504C17.9933 10.7055 18.0945 10.192 17.9071 9.74219C17.7197 9.29238 17.2849 9 16.7976 9L7.20159 9.00375C6.71804 9.00375 6.27947 9.29613 6.09205 9.74594C5.90463 10.1958 6.00958 10.7093 6.35069 11.0541L11.1487 15.8521L11.1524 15.8484Z' />
    </svg>
  )
}

export default Caret
