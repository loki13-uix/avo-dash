// import { cn } from '@/lib/utils'
// import type React from 'react'
// import { Checkbox as ShadcnCheckbox } from '../ui/checkbox'
// import { Icon } from './icon'

// type Props = {
//   checkboxProps?: React.ComponentPropsWithoutRef<typeof ShadcnCheckbox>
//   selectedState?: boolean
//   group?: boolean
//   className?: string
// }
// const TableCellLeading = ({
//   checkboxProps,
//   selectedState,
//   group,
//   className,
// }: Props) => {
//   return (
//     <div
//       className={cn(
//         'border border-grey-3 hover:bg-[#F5F5FF] px-2 py-[6px] flex items-center justify-center',
//         selectedState && 'bg-[#EBEBFF]',
//         group && 'bg-grey-2 border border-grey-3 gap-x-2',
//         className
//       )}
//     >
//       <ShadcnCheckbox
//         {...checkboxProps}
//         className={cn('border border-grey-8')}
//       />

//       {group && <Icon name='chevron-down' color='#605BFF' className='size-4' />}
//     </div>
//   )
// }

// export default TableCellLeading

import { cn } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import type React from 'react'
import { createContext, useCallback, useContext, useState } from 'react'
import { Checkbox as ShadcnCheckbox } from '../ui/checkbox'
import { Icon } from './icon'

// Create a context for checkbox state management
type CheckboxContextType = {
  selectedRows: string[]
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>
  headerChecked: boolean | 'indeterminate'
  setHeaderChecked: React.Dispatch<
    React.SetStateAction<boolean | 'indeterminate'>
  >
  handleRowCheckedChange: (checked: boolean, rowId: string) => void
  handleHeaderCheckedChange: (checked: boolean) => void
  data: Array<{ id: string }>
}

const CheckboxContext = createContext<CheckboxContextType | undefined>(
  undefined
)

// Provider component to wrap around the table
export function TableCheckboxProvider({
  children,
  data,
  onChange,
}: {
  children: React.ReactNode
  data: Array<{ id: string }>
  onChange?: (selectedIds: string[]) => void
}) {
  const [headerChecked, setHeaderChecked] = useState<boolean | 'indeterminate'>(
    false
  )
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const handleHeaderCheckedChange = useCallback(
    (checked: boolean) => {
      setHeaderChecked(checked)
      const newSelectedIds = checked ? data.map((item) => item.id) : []
      setSelectedRows(newSelectedIds)
      onChange?.(newSelectedIds)
    },
    [data, onChange]
  )

  const handleRowCheckedChange = useCallback(
    (checked: boolean, rowId: string) => {
      let newSelectedRows: string[]

      if (checked) {
        newSelectedRows = [...selectedRows, rowId]
      } else {
        newSelectedRows = selectedRows.filter((id) => id !== rowId)
      }

      setSelectedRows(newSelectedRows)
      setHeaderChecked(
        newSelectedRows.length === 0
          ? false
          : newSelectedRows.length === data.length
            ? true
            : 'indeterminate'
      )

      onChange?.(newSelectedRows)
    },
    [selectedRows, data, onChange]
  )

  const value = {
    selectedRows,
    setSelectedRows,
    headerChecked,
    setHeaderChecked,
    handleRowCheckedChange,
    handleHeaderCheckedChange,
    data,
  }

  return (
    <CheckboxContext.Provider value={value}>
      {children}
    </CheckboxContext.Provider>
  )
}

// Hook to use the checkbox context
export const useCheckboxContext = () => {
  const context = useContext(CheckboxContext)
  if (!context) {
    throw new Error(
      'useCheckboxContext must be used within a TableCheckboxProvider'
    )
  }
  return context
}

// Original TableCellLeading props
type TableCellLeadingProps = {
  checkboxProps?: React.ComponentPropsWithoutRef<typeof ShadcnCheckbox>
  selectedState?: boolean
  group?: boolean
  className?: string
}

// Enhanced TableCellLeading component
const TableCellLeading = ({
  checkboxProps,
  selectedState,
  group,
  className,
}: TableCellLeadingProps) => {
  return (
    <div
      className={cn(
        'border border-grey-3 hover:bg-[#F5F5FF] px-2 py-[6px] flex items-center justify-center',
        selectedState && 'bg-[#EBEBFF]',
        group && 'bg-grey-2 border border-grey-3 gap-x-2',
        className
      )}
    >
      <ShadcnCheckbox
        {...checkboxProps}
        className={cn('border border-grey-8')}
      />

      {group && <Icon name='chevron-down' color='#605BFF' className='size-4' />}
    </div>
  )
}

// Header cell with checkbox
export const TableCellLeadingHeader = ({
  className,
}: {
  className?: string
}) => {
  const { headerChecked, handleHeaderCheckedChange } = useCheckboxContext()

  return (
    <TableCellLeading
      checkboxProps={{
        checked: headerChecked,
        onCheckedChange: handleHeaderCheckedChange,
      }}
      className={className}
    />
  )
}

// Row cell with checkbox
export const TableCellLeadingRow = ({
  rowId,
  className,
}: {
  rowId: string
  className?: string
}) => {
  const { selectedRows, handleRowCheckedChange } = useCheckboxContext()
  const isSelected = selectedRows.includes(rowId)

  return (
    <TableCellLeading
      checkboxProps={{
        checked: isSelected,
        onCheckedChange: (checked) => handleRowCheckedChange(!!checked, rowId),
      }}
      selectedState={isSelected}
      className={className}
    />
  )
}

// Helper function to get the checkbox column
export function getCheckboxColumn<T extends { id: string }>(): ColumnDef<
  T,
  unknown
> {
  return {
    id: 'selection',
    header: () => <TableCellLeadingHeader className='border-none ' />,
    cell: ({ row }) => (
      <TableCellLeadingRow rowId={row.original.id} className='px-1.5 py-2' />
    ),
  }
}

export default TableCellLeading
