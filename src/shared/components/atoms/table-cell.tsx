import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'

interface TableCellProps {
  defaultValue?: string
  isSelected?: boolean
  isEditable?: boolean
  isHeader?: boolean
  selectDropdown?: boolean
  options?: { value: string; label: string }[]
  onChange?: (value: string) => void
  onEditingChange?: (isEditing: boolean) => void
  className?: string
  onSelect?: (event: React.MouseEvent) => void
}

const TableCell = ({
  defaultValue = 'Text',
  isSelected = false,
  isEditable: initialIsEditable = false,
  isHeader = false,
  selectDropdown = false,
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
  const [isEditing, setIsEditing] = useState(initialIsEditable)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleClick = (e: React.MouseEvent) => {
    if (isHeader) return

    if (selectDropdown) {
      return
    }

    if (onSelect) {
      onSelect(e)
    }
  }

  const handleDoubleClick = () => {
    if (!isHeader && !selectDropdown && !isEditing) {
      setIsEditing(true)
      if (onEditingChange) {
        onEditingChange(true)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  if (isHeader) {
    return (
      <div
        className={cn(
          'border border-grey-3 py-[6px] px-2 bg-grey-2',
          className
        )}
      >
        <div className='font-semibold font-open-sans text-grey-13 text-sm'>
          {value}
        </div>
      </div>
    )
  }

  if (selectDropdown) {
    const selectedOption =
      options.find((option) => option.value === value) || options[0]

    return (
      <div
        className={cn(
          'border border-grey-3 py-[6px] px-2 hover:bg-[#F5F5FF] flex items-center',
          isSelected && 'bg-[#EBEBFF]',
          className
        )}
      >
        <Select value={value} onValueChange={handleSelectChange}>
          <SelectTrigger className='shadow-none p-0 h-auto bg-transparent font-normal font-open-sans text-grey-13 text-sm w-full'>
            <div className='flex justify-between w-full items-center'>
              <span className='font-normal font-open-sans text-grey-13 text-sm'>
                {selectedOption.label}
              </span>
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
        'border border-grey-3 py-[6px] px-2 hover:bg-[#F5F5FF]',
        isSelected && 'bg-[#EBEBFF]',
        isEditing && 'bg-purple-1',
        className
      )}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
    >
      {!isEditing ? (
        <div className='font-normal font-open-sans text-grey-13 text-sm'>
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
