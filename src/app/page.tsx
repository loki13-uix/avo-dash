'use client'

import TableCell from '@/shared/components/atoms/table-cell'
import Logo from '@/shared/icons/logo'

export default function Home() {
  return (
    <>
      <div className='border border-b-grey-4 px-4 py-3'>
        <Logo />
      </div>
      <div className='w-[349px] border border-none border-r-grey-5'>
        <TableCell
          isHeader
          defaultValue='Project: '
          className='px-3 py-4'
          title='Web Project'
          showIcon
        />
      </div>
    </>
  )
}
