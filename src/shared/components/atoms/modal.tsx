import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from './button'

import type { ReactNode } from 'react'

interface Props {
  title?: string
  content?: ReactNode | string
  confirmText?: string
  cancelText?: string
  className?: string
  onConfirm?: () => void
  onCancel?: () => void
}

const Modal = ({
  title = 'Dialog Title',
  content = 'Dialog Content',
  confirmText,
  cancelText,
  className = 'w-[593px] h-[293px]',
  onConfirm,
  onCancel,
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
                variant='secondary-purple'
                className='p-4 cursor-pointer'
                onClick={onCancel}
              >
                {cancelText}
              </Button>
            </DialogClose>
            <Button
              variant='standard'
              className='px-[22.5px] py-1.5 cursor-pointer'
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
