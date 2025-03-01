import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
type TableCellProps = {
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
  defaultValue,
  isSelected = false,
  isEditable = false,
  isHeader = false,
  selectDropdown = false,
  options = [],
  onChange,
  onEditingChange,
  className,
  onSelect,
}: TableCellProps) => {
  const [isEditing, setIsEditing] = useState(isEditable)
  const inputRef = useRef<HTMLInputElement>(null)

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
    onChange?.(newValue)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isHeader) return
    onSelect?.(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      handleEditEnd()
      e.preventDefault()
    }
  }

  const baseClassName = cn(
    'border border-grey-3 py-[6px] px-2 font-open-sans text-grey-13 text-sm',
    isSelected && 'bg-purple-2',
    !isHeader && !isEditing && !isSelected && 'hover:bg-[#F5F5FF]',
    isEditing && 'bg-purple-1',
    className
  )

  const selectedOption = selectDropdown
    ? options.find((opt) => opt.value === defaultValue) || options[0]
    : null

  if (isHeader) {
    return (
      <div className={cn(baseClassName, 'bg-grey-2')}>
        <div className='font-semibold'>{defaultValue}</div>
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
          value={defaultValue}
          onChange={(e) => handleValueChange(e.target.value)}
          onBlur={handleEditEnd}
          onKeyDown={handleKeyDown}
          className='text-sm bg-white rounded-sm border border-[#9494F5]'
        />
      ) : selectDropdown && isSelected ? (
        <Select value={defaultValue} onValueChange={handleValueChange}>
          <SelectTrigger className='shadow-none p-0 h-auto bg-transparent w-full '>
            <span>{selectedOption?.label}</span>
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
        <div>{selectDropdown ? selectedOption?.label : defaultValue}</div>
      )}
    </div>
  )
}

export default TableCell
