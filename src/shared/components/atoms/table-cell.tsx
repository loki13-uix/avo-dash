import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface TableCellProps {
  defaultValue?: string
  selectedState?: boolean
  editableState?: boolean
  headerState?: boolean
  selectState?: boolean
  options?: { value: string; label: string }[]
  onChange?: (value: string) => void
  onEditingChange?: (isEditing: boolean) => void
  className?: string
  onSelect?: (event: React.MouseEvent) => void
}

const TableCell = ({
  defaultValue = 'Text',
  selectedState = false,
  editableState: initialEditableState = false,
  headerState = false,
  selectState = false,
  options = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ],
  onChange,
  onEditingChange,
  className,
  onSelect,
}: TableCellProps) => {
  const [value, setValue] = useState(defaultValue)
  const [isEditing, setIsEditing] = useState(initialEditableState)
  // We don't need to track select open state manually as shadcn/ui Select handles this internally
  const inputRef = useRef<HTMLInputElement>(null)
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = (e: React.MouseEvent) => {
    if (headerState) return

    if (selectState) {
      // Select component handles its own open state
      return
    }

    clickTimeout.current = setTimeout(() => {
      if (onSelect) {
        onSelect(e)
      }
      clickTimeout.current = null
    }, 0)
  }

  const handleDoubleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current)
      clickTimeout.current = null
    }

    if (!headerState && !selectState && !isEditing) {
      setIsEditing(true)
      if (onEditingChange) {
        onEditingChange(true)
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleSelectChange = (newValue: string) => {
    setValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (onEditingChange) {
      onEditingChange(false)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEditing(false)
      if (onEditingChange) {
        onEditingChange(false)
      }
      event.preventDefault()
    }
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  if (headerState) {
    return (
      <div
        className={cn(
          'border border-grey-3 py-[6px] pl-2 pr-1 bg-grey-2 m-10',
          className
        )}
      >
        <div className='font-semibold font-open-sans text-grey-13 text-sm'>
          {value}
        </div>
      </div>
    )
  }

  if (selectState) {
    return (
      <div
        className={cn(
          'border border-grey-3 py-[6px] pl-2 pr-1 hover:bg-[#F5F5FF] m-10',
          selectedState && 'bg-[#EBEBFF]',
          className
        )}
      >
        <Select onValueChange={handleSelectChange} defaultValue={value}>
          <SelectTrigger className='border-none shadow-none p-0 h-auto bg-transparent font-normal font-open-sans text-grey-13 text-sm w-full'>
            <div className='flex justify-between w-full items-center'>
              <SelectValue defaultValue='Light' />
            </div>
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'border border-grey-3 py-[6px] pl-2 pr-1 hover:bg-[#F5F5FF] m-10',
        selectedState && 'bg-[#EBEBFF]',
        isEditing && 'bg-purple-1',
        className
      )}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
    >
      {!isEditing ? (
        <div className='font-normal font-open-sans text-grey-13 text-sm break-all'>
          {value}
        </div>
      ) : (
        <Input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className='font-normal font-open-sans text-grey-13 text-sm bg-white rounded-sm border border-[#9494F5]'
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  )
}

export default TableCell
