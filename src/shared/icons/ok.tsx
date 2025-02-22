import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>

const Ok = ({ width = '24', height = '24', ...props }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      {...props}
    >
      <path d='M12 21C14.3869 21 16.6761 20.0518 18.364 18.364C20.0518 16.6761 21 14.3869 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21ZM15.9727 10.3477L11.4727 14.8477C11.1422 15.1781 10.6078 15.1781 10.2809 14.8477L8.03086 12.5977C7.70039 12.2672 7.70039 11.7328 8.03086 11.4059C8.36133 11.0789 8.8957 11.0754 9.22266 11.4059L10.875 13.0582L14.7773 9.15234C15.1078 8.82188 15.6422 8.82188 15.9691 9.15234C16.2961 9.48281 16.2996 10.0172 15.9691 10.3441L15.9727 10.3477Z' />
    </svg>
  )
}

export default Ok
