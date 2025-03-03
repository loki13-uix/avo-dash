import { ActionsColumn } from '@/constants/table-columns/action.column'
import { CheckboxColumn } from '@/constants/table-columns/checkbox-column'
import { EmailColumn } from '@/constants/table-columns/email-column'
import { HeaderCell } from '@/constants/table-columns/header-column'
import { NameColumn } from '@/constants/table-columns/name-column'
import type { ColumnDef } from '@tanstack/react-table'

type TableRow = {
  id: string
  name: string
  email: string
}

type CreateColumnsProps = {
  includeIcons?: boolean
  includeCheckbox?: boolean
  selectedRows?: string[]
  setSelectedRows?: (rows: string[]) => void
  headerChecked?: boolean | 'indeterminate'
  onHeaderCheckedChange?: (checked: boolean) => void
  onNameChange?: (id: string, value: string) => void
  onEmailChange?: (id: string, value: string) => void
  includeDropdown?: boolean
}

export const createColumns = ({
  includeIcons = false,
  includeCheckbox = false,
  selectedRows = [],
  setSelectedRows = () => {},
  headerChecked = false,
  onHeaderCheckedChange = () => {},
  onNameChange = () => {},
  onEmailChange = () => {},
  includeDropdown = false,
}: CreateColumnsProps): ColumnDef<TableRow>[] => {
  const columns: ColumnDef<TableRow>[] = []

  if (includeCheckbox) {
    columns.push({
      header: () => (
        <CheckboxColumn
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          isHeader={true}
          headerChecked={headerChecked}
          onHeaderCheckedChange={onHeaderCheckedChange}
        />
      ),
      accessorKey: 'checkbox',
      size: 36,
      cell: ({ row }) => (
        <CheckboxColumn
          row={row.original}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      ),
    })
  }

  columns.push({
    header: () => <HeaderCell title='Column with Select content' />,
    accessorKey: 'name',
    size: 300,
    cell: ({ row }) => (
      <NameColumn
        row={row.original}
        isSelected={selectedRows.includes(row.original.id)}
        isReadOnly={!includeIcons}
        onValueChange={onNameChange}
        isDropdown={includeDropdown}
      />
    ),
  })

  columns.push({
    header: () => <HeaderCell title='Column with Text content' />,
    accessorKey: 'email',
    size: 300,
    cell: ({ row }) => (
      <EmailColumn
        row={row.original}
        isSelected={selectedRows.includes(row.original.id)}
        onValueChange={onEmailChange}
      />
    ),
  })

  if (includeIcons) {
    columns.push({
      header: () => <ActionsColumn isHeader={true} />,
      accessorKey: 'icon',
      size: 36,
      cell: ({ row }) => (
        <ActionsColumn
          row={row.original}
          isSelected={selectedRows.includes(row.original.id)}
        />
      ),
    })
  }

  return columns
}
