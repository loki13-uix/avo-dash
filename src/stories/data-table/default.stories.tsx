import { DataTable } from '@/shared/components/atoms/data-table'
import { DataTableWithState } from '@/shared/components/atoms/data-table/data-table-with-state'
import { createColumns } from '@/utils/create-columns-data-table'
import type { Meta, StoryObj } from '@storybook/react'
import type { ColumnDef } from '@tanstack/react-table'

type TableRow = {
  id: string
  name: string
  email: string
}

const initialData: TableRow[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
  { id: '2', name: 'John Doe1', email: 'john.doe@example.com' },
  { id: '3', name: 'John Doe45', email: 'john.doe@example.com' },
  { id: '4', name: 'John Doe34', email: 'john.doe@example.com' },
]

const meta: Meta<typeof DataTable> = {
  title: 'Design System/atoms/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    columns: { table: { disable: true } },
    data: { table: { disable: true } },
  },
}

export default meta

type Story = StoryObj<typeof DataTable>

export const ReadOnly: Story = {
  args: {
    columns: createColumns({}) as unknown as ColumnDef<
      { id: string | number },
      unknown
    >[],
    data: initialData,
  },
}

export const DataControls: Story = {
  render: () => (
    <DataTableWithState initialData={initialData} includeIcons={true} />
  ),
}

export const DataWithControls: Story = {
  render: () => (
    <DataTableWithState
      initialData={initialData}
      includeIcons={true}
      includeCheckbox={true}
    />
  ),
}

export const DataWithControlsSelectionAndDropdown: Story = {
  render: () => (
    <DataTableWithState
      initialData={initialData}
      includeIcons={true}
      includeCheckbox={true}
      includeDropdown={true}
    />
  ),
}
