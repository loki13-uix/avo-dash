import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>

const NotOk = ({ width, height, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' {...props}>
      <path d='M12 21C14.3869 21 16.6761 20.0518 18.364 18.364C20.0518 16.6761 21 14.3869 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21ZM9.15234 9.15234C9.48281 8.82188 10.0172 8.82188 10.3441 9.15234L11.9965 10.8047L13.6488 9.15234C13.9793 8.82188 14.5137 8.82188 14.8406 9.15234C15.1676 9.48281 15.1711 10.0172 14.8406 10.3441L13.1883 11.9965L14.8406 13.6488C15.1711 13.9793 15.1711 14.5137 14.8406 14.8406C14.5102 15.1676 13.9758 15.1711 13.6488 14.8406L11.9965 13.1883L10.3441 14.8406C10.0137 15.1711 9.4793 15.1711 9.15234 14.8406C8.82539 14.5102 8.82188 13.9758 9.15234 13.6488L10.8047 11.9965L9.15234 10.3441C8.82188 10.0137 8.82188 9.4793 9.15234 9.15234Z' />
    </svg>
  )
}

export default NotOk
