import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button, type ButtonProps } from './button'

import type { ReactNode } from 'react'

interface Props {
  title?: string
  content?: ReactNode | string
  className?: string
  successButton: ButtonProps & {
    label: string
  }
  dangerButton: ButtonProps & {
    label: string
  }
}

const Modal = ({
  title = 'Dialog Title',
  content = 'Dialog Content',
  className = 'w-[593px] h-[293px]',
  successButton,
  dangerButton,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' className='cursor-pointer'>
          Open Dialog
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          'border-[0.5px] border-grey-8 rounded-sm p-0 gap-0 flex flex-col justify-between bg-white shadow-none',
          className
        )}
      >
        <DialogTitle>
          <div>
            <div className='border border-white px-4 py-[10.5px] rounded-sm flex justify-between'>
              <p className='font-semibold text-sm text-grey-13'>{title}</p>
            </div>

            <div className='border border-white px-4 py-[10.5px] rounded-sm font-semibold text-sm text-grey-13'>
              {content}
            </div>
          </div>
        </DialogTitle>
        <DialogFooter>
          <div className='border-t border-t-grey-4 px-4 py-4 flex justify-end gap-x-3 rounded-b-sm w-full'>
            <DialogClose asChild>
              <Button
                variant={dangerButton.variant ?? 'secondary-purple'}
                className={cn('p-4 cursor-pointer', dangerButton.className)}
                {...dangerButton}
              >
                {dangerButton.label}
              </Button>
            </DialogClose>
            <Button
              variant={successButton.variant ?? 'standard'}
              className={cn(
                'px-[22.5px] py-1.5 cursor-pointer',
                successButton.className
              )}
              {...successButton}
            >
              {successButton.label}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
