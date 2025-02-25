import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>

const FileData = ({ width, height, ...props }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      {...props}
    >
      <path d='M7.33333 3C6.04635 3 5 4.06504 5 5.375V18.625C5 19.935 6.04635 21 7.33333 21H16.6667C17.9536 21 19 19.935 19 18.625V8.9375H14.3333C13.688 8.9375 13.1667 8.40684 13.1667 7.75V3H7.33333ZM14.3333 3V7.75H19L14.3333 3ZM7.91667 5.375H10.25C10.5708 5.375 10.8333 5.64219 10.8333 5.96875C10.8333 6.29531 10.5708 6.5625 10.25 6.5625H7.91667C7.59583 6.5625 7.33333 6.29531 7.33333 5.96875C7.33333 5.64219 7.59583 5.375 7.91667 5.375ZM7.91667 7.75H10.25C10.5708 7.75 10.8333 8.01719 10.8333 8.34375C10.8333 8.67031 10.5708 8.9375 10.25 8.9375H7.91667C7.59583 8.9375 7.33333 8.67031 7.33333 8.34375C7.33333 8.01719 7.59583 7.75 7.91667 7.75ZM9.89271 16.1684C9.67031 16.9217 8.98854 17.4375 8.21562 17.4375H7.91667C7.59583 17.4375 7.33333 17.1703 7.33333 16.8438C7.33333 16.5172 7.59583 16.25 7.91667 16.25H8.21562C8.47448 16.25 8.70052 16.0793 8.77344 15.827L9.31667 13.99C9.44062 13.5707 9.81979 13.2812 10.25 13.2812C10.6802 13.2812 11.0594 13.567 11.1833 13.99L11.6062 15.4225C11.876 15.1924 12.2187 15.0625 12.5833 15.0625C13.163 15.0625 13.6917 15.3965 13.9505 15.9234L14.1109 16.25H16.0833C16.4042 16.25 16.6667 16.5172 16.6667 16.8438C16.6667 17.1703 16.4042 17.4375 16.0833 17.4375H13.75C13.5276 17.4375 13.3271 17.3113 13.2286 17.1109L12.9078 16.4541C12.8458 16.3279 12.7219 16.25 12.587 16.25C12.4521 16.25 12.3245 16.3279 12.2661 16.4541L11.9453 17.1109C11.8396 17.3299 11.6099 17.4598 11.3729 17.4375C11.1359 17.4152 10.9318 17.2482 10.8661 17.0182L10.25 14.9512L9.89271 16.1684Z' />
    </svg>
  )
}

export default FileData
