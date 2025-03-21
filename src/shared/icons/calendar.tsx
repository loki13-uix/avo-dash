import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>

const Calendar = ({ width, height, ...props }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      {...props}
    >
      <path d='M3.25 3H20.75C21.4414 3 22 3.55859 22 4.25V5.5C22 6.19141 21.4414 6.75 20.75 6.75H3.25C2.55859 6.75 2 6.19141 2 5.5V4.25C2 3.55859 2.55859 3 3.25 3ZM3.25 8H20.75V18C20.75 19.3789 19.6289 20.5 18.25 20.5H5.75C4.37109 20.5 3.25 19.3789 3.25 18V8ZM8.25 11.125C8.25 11.4688 8.53125 11.75 8.875 11.75H15.125C15.4688 11.75 15.75 11.4688 15.75 11.125C15.75 10.7812 15.4688 10.5 15.125 10.5H8.875C8.53125 10.5 8.25 10.7812 8.25 11.125Z' />
    </svg>
  )
}

export default Calendar
