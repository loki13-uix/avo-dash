import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>

const ControlTextField = ({ width, height, ...props }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      {...props}
    >
      <rect
        x='2'
        y='6'
        width='20'
        height='11'
        rx='2'
        fill='white'
        stroke='#656E78'
        stroke-width='1.5'
      />
      <path
        d='M7.60596 14L7.35986 13.0635H5.73633L5.4834 14H4L5.63037 8.98242H7.43164L9.08252 14H7.60596ZM7.07959 11.9561L6.86426 11.1357C6.84147 11.0469 6.80843 10.9204 6.76514 10.7563C6.72184 10.59 6.67855 10.4191 6.63525 10.2437C6.59424 10.0659 6.56234 9.92008 6.53955 9.80615C6.51904 9.92008 6.48942 10.0614 6.45068 10.23C6.41423 10.3963 6.37549 10.5615 6.33447 10.7256C6.29574 10.8896 6.26156 11.0264 6.23193 11.1357L6.0166 11.9561H7.07959Z'
        fill='#656E78'
      />
      <path
        d='M12.5996 15.2954H9.07227V14.4546H12.5996V15.2954Z'
        fill='#656E78'
      />
    </svg>
  )
}

export default ControlTextField
