import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>

const Pen = ({ width = '24', height = '24', ...props }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      {...props}
    >
      <path d='M15.3465 4.58658L13.8324 6.10072L17.8993 10.1676L19.4134 8.6535C20.1955 7.8714 20.1955 6.6044 19.4134 5.82229L18.1808 4.58658C17.3987 3.80447 16.1317 3.80447 15.3496 4.58658H15.3465ZM13.1253 6.80774L5.83303 14.1032C5.50767 14.4285 5.26991 14.8321 5.13852 15.2732L4.03107 19.0367C3.95286 19.3026 4.02481 19.5873 4.21877 19.7812C4.41273 19.9752 4.69742 20.0471 4.9602 19.9721L8.72367 18.8646C9.16478 18.7332 9.56834 18.4955 9.89369 18.1701L17.1923 10.8747L13.1253 6.80774Z' />
    </svg>
  )
}

export default Pen
