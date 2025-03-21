import type TableCell from '@/shared/components/atoms/table-cell'
import type { Meta, StoryObj } from '@storybook/react'
import TableCellWrapper from '.'

const meta: Meta<typeof TableCellWrapper> = {
  title: 'Design System/atoms/table/cell',
  component: TableCellWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    isEditable: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'This is of boolean type',
    },
    isHeader: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'This is of boolean type',
    },
    isSelected: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'This is of boolean type',
    },
    selectDropdown: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'This is of boolean type',
    },
    defaultValue: {
      control: 'text',
      table: {
        disable: true,
      },
      description: 'This is of boolean type',
    },
  },
}

export default meta

type Story = StoryObj<typeof TableCell>
export const Selected: Story = {
  args: {
    isSelected: true,
    defaultValue: 'selected',
  },
}

export const Header: Story = {
  args: {
    isHeader: true,
    defaultValue: 'header',
  },
}

export const Editable: Story = {
  args: {
    isEditable: true,
    defaultValue: 'header',
  },
}

export const SelectFromDropdown: Story = {
  args: {
    selectDropdown: true,
    isSelected: true,
    defaultValue: 'light',
  },
}
