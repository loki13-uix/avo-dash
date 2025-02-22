import type { SVGProps } from 'react'

const SvgTest = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <path d='M3.25 3h17.5c.691 0 1.25.559 1.25 1.25V5.5c0 .691-.559 1.25-1.25 1.25H3.25C2.559 6.75 2 6.191 2 5.5V4.25C2 3.559 2.559 3 3.25 3m0 5h17.5v10c0 1.379-1.121 2.5-2.5 2.5H5.75a2.5 2.5 0 0 1-2.5-2.5zm5 3.125c0 .344.281.625.625.625h6.25a.627.627 0 0 0 .625-.625.627.627 0 0 0-.625-.625h-6.25a.627.627 0 0 0-.625.625' />
  </svg>
)
export default SvgTest
