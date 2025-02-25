import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>

const SearchIcon = ({ width, height, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 14 14' {...props}>
      <path d='M9.625 8.5H9.02875L8.82212 8.29375C9.5575 7.4425 10 6.33625 10 5.125C10 2.4325 7.8175 0.25 5.125 0.25C2.4325 0.25 0.25 2.4325 0.25 5.125C0.25 7.8175 2.4325 10 5.125 10C6.33625 10 7.4425 9.5575 8.29375 8.82625L8.5 9.0325V9.625L12.25 13.3675L13.3675 12.25L9.625 8.5ZM5.125 8.5C3.26125 8.5 1.75 6.98913 1.75 5.125C1.75 3.26087 3.26125 1.75 5.125 1.75C6.98875 1.75 8.5 3.26087 8.5 5.125C8.5 6.98913 6.98875 8.5 5.125 8.5Z' />
    </svg>
  )
}

export default SearchIcon
