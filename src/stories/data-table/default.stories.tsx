import { DataTable } from '@/shared/components/atoms/data-table'
import { DataTableWithState } from '@/shared/components/atoms/data-table/data-table-with-state'
import type { Meta, StoryObj } from '@storybook/react'

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
  title: 'Design System/atoms/table/data-table',
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
    setData: {
      table: {
        disable: true,
      },
    },
    isSortable: {
      table: {
        disable: true,
      },
    },
    selectedRows: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof DataTable>

export const ReadOnly: Story = {
  render: () => (
    <DataTableWithState
      initialData={initialData}
      includeIcons={false}
      isSortable={false}
    />
  ),
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
