import { cn } from '@/lib/utils'
import type React from 'react'
import type { ReactNode } from 'react'
import { Button } from './button'
import { Icon } from './icon'

interface ModalProps {
  title: string
  content: string | ReactNode
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  cancelText?: string
  confirmText?: string
  width?: string
  height?: string
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  isOpen,
  onClose,
  onConfirm,
  cancelText = 'Cancel',
  confirmText = 'OK',
  width = 'w-[500px]',
  height = 'h-[293px]',
}) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-opacity-50'>
      <div
        className={cn(
          'border-[0.5px] border-grey-8 rounded-sm gap-y-5 flex flex-col justify-between bg-white',
          width,
          height
        )}
      >
        <div>
          <div className='border border-white px-4 py-[10.5px] rounded-sm flex justify-between'>
            <p className='font-semibold text-sm text-grey-13'>{title}</p>
            <Icon name='close' className='text-grey-12 size-6' />
          </div>

          <div className='border border-white px-4 py-[10.5px] rounded-sm'>
            {typeof content === 'string' ? (
              <p className='font-semibold text-sm text-grey-13'>{content}</p>
            ) : (
              content
            )}
          </div>
        </div>
        <div className='border-t border-t-grey-4 px-4 py-4 flex justify-end gap-x-3 rounded-b-sm'>
          <Button
            variant='secondary-purple'
            className='h-8 px-4'
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button variant='standard' className='h-8 px-6' onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
