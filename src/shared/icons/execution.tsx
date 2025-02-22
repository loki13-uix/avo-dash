import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>
const Execution = ({ width = '24', height = '24', ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' {...props}>
      <path d='M11.184 3.18054C11.7014 2.94096 12.2986 2.94096 12.8159 3.18054L20.4062 6.68749C20.7014 6.8229 20.8889 7.11804 20.8889 7.44443C20.8889 7.77082 20.7014 8.06596 20.4062 8.20138L12.8159 11.7083C12.2986 11.9479 11.7014 11.9479 11.184 11.7083L3.59372 8.20138C3.29858 8.06249 3.11108 7.76735 3.11108 7.44443C3.11108 7.12151 3.29858 6.8229 3.59372 6.68749L11.184 3.18054ZM18.559 10.2778L20.4062 11.1319C20.7014 11.2673 20.8889 11.5625 20.8889 11.8889C20.8889 12.2153 20.7014 12.5104 20.4062 12.6458L12.8159 16.1528C12.2986 16.3923 11.7014 16.3923 11.184 16.1528L3.59372 12.6458C3.29858 12.5069 3.11108 12.2118 3.11108 11.8889C3.11108 11.566 3.29858 11.2673 3.59372 11.1319L5.44095 10.2778L10.7187 12.7153C11.5312 13.0903 12.4687 13.0903 13.2812 12.7153L18.559 10.2778ZM13.2812 17.1597L18.559 14.7222L20.4062 15.5764C20.7014 15.7118 20.8889 16.0069 20.8889 16.3333C20.8889 16.6597 20.7014 16.9548 20.4062 17.0903L12.8159 20.5972C12.2986 20.8368 11.7014 20.8368 11.184 20.5972L3.59372 17.0903C3.29858 16.9514 3.11108 16.6562 3.11108 16.3333C3.11108 16.0104 3.29858 15.7118 3.59372 15.5764L5.44095 14.7222L10.7187 17.1597C11.5312 17.5347 12.4687 17.5347 13.2812 17.1597Z' />
    </svg>
  )
}

export default Execution
