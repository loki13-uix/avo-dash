import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>

const Report = ({ width, height, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' {...props}>
      <path d='M12.625 11.375V2.64844C12.625 2.29688 12.8984 2 13.25 2C18.082 2 22 5.91797 22 10.75C22 11.1016 21.7031 11.375 21.3516 11.375H12.625ZM2 12.625C2 7.88672 5.51953 3.96484 10.0859 3.33984C10.4453 3.28906 10.75 3.57812 10.75 3.94141V13.25L16.8633 19.3633C17.125 19.625 17.1055 20.0547 16.8047 20.2656C15.2734 21.3594 13.3984 22 11.375 22C6.19922 22 2 17.8047 2 12.625ZM22.5625 13.25C22.9258 13.25 23.2109 13.5547 23.1641 13.9141C22.8633 16.0977 21.8125 18.0391 20.2773 19.4727C20.043 19.6914 19.6758 19.6758 19.4492 19.4453L13.25 13.25H22.5625Z' />
    </svg>
  )
}

export default Report
