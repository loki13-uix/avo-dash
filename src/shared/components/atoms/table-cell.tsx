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
  isEditable = false,
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
  const [isEditing, setIsEditing] = useState(isEditable)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleEditStart = () => {
    if (!isHeader && !selectDropdown && !isEditing) {
      setIsEditing(true)
      onEditingChange?.(true)
    }
  }

  const handleEditEnd = () => {
    setIsEditing(false)
    onEditingChange?.(false)
  }

  const handleValueChange = (newValue: string) => {
    setValue(newValue)
    onChange?.(newValue)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isHeader) return
    onSelect?.(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditEnd()
      e.preventDefault()
    }
  }

  const baseClassName = cn(
    'border border-grey-3 py-[6px] px-2',
    isSelected && 'bg-purple-2',
    !isHeader && !isEditing && !isSelected && 'hover:bg-[#F5F5FF]',
    isEditing && 'bg-purple-1',
    className
  )

  const selectedOption = selectDropdown
    ? options.find((opt) => opt.value === value) || options[0]
    : null

  if (isHeader) {
    return (
      <div className={cn(baseClassName, 'bg-grey-2')}>
        <div className='font-semibold font-open-sans text-grey-13 text-sm'>
          {value}
        </div>
      </div>
    )
  }

  return (
    <div
      className={baseClassName}
      onClick={handleClick}
      onDoubleClick={handleEditStart}
      onKeyDown={handleKeyDown}
    >
      {isEditing && !selectDropdown ? (
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => handleValueChange(e.target.value)}
          onBlur={handleEditEnd}
          onKeyDown={handleKeyDown}
          className='font-normal font-open-sans text-grey-13 text-sm bg-white rounded-sm border border-[#9494F5]'
          onClick={(e) => e.stopPropagation()}
        />
      ) : selectDropdown && isSelected ? (
        <Select value={value} onValueChange={handleValueChange}>
          <SelectTrigger className='shadow-none p-0 h-auto bg-transparent font-normal font-open-sans text-grey-13 text-sm w-full'>
            <span className='font-normal font-open-sans text-grey-13 text-sm'>
              {selectedOption?.label}
            </span>
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className='font-normal font-open-sans text-grey-13 text-sm'>
          {selectDropdown ? selectedOption?.label : value}
        </div>
      )}
    </div>
  )
}

export default TableCell
