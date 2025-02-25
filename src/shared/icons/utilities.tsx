import type React from 'react'

type Props = React.SVGProps<SVGSVGElement>

const Utilities = ({ width, height, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' {...props}>
      <mask id='path-1-inside-1_1_452' fill='white'>
        <rect x='2' y='2' width='9.62963' height='9.63031' rx='0.541655' />
      </mask>
      <rect
        x='2'
        y='2'
        width='9.62963'
        height='9.63031'
        rx='0.541655'
        stroke-width='2.79936'
        mask='url(#path-1-inside-1_1_452)'
      />
      <mask id='path-2-inside-2_1_452' fill='white'>
        <rect
          x='2'
          y='12.3744'
          width='9.62963'
          height='9.63031'
          rx='0.541655'
        />
      </mask>
      <rect
        x='2'
        y='12.3744'
        width='9.62963'
        height='9.63031'
        rx='0.541655'
        stroke-width='2.79936'
        mask='url(#path-2-inside-2_1_452)'
      />
      <mask id='path-3-inside-3_1_452' fill='white'>
        <rect
          x='12.3703'
          y='2'
          width='9.62963'
          height='9.63031'
          rx='0.541655'
        />
      </mask>
      <rect
        x='12.3703'
        y='2'
        width='9.62963'
        height='9.63031'
        rx='0.541655'
        stroke-width='2.79936'
        mask='url(#path-3-inside-3_1_452)'
      />
      <rect
        x='13.0702'
        y='13.0742'
        width='8.22995'
        height='8.23063'
        rx='2.18899'
        stroke-width='1.39968'
      />
    </svg>
  )
}

export default Utilities
