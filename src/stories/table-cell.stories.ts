import TableCell from '@/shared/components/atoms/table-cell'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TableCell> = {
  title: 'Design System/atoms/table/cell',
  component: TableCell,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    className: {
      control: 'text',
      table: {
        disable: true,
      },
    },
    selectDropdown: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'light' },
      },
      description: 'This is of boolean type',
    },
    isEditable: {
      control: 'boolean',
      description: 'this is editable ',
    },
    isHeader: {
      control: 'boolean',
      description: 'this is to show header state',
    },
    isSelected: {
      control: 'boolean',
      description: 'This is of boolean type',
    },
    defaultValue: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    onEditingChange: {
      table: {
        disable: true,
      },
    },
    onSelect: {
      table: {
        disable: true,
      },
    },
    options: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof TableCell>
export const Selected: Story = {
  args: {
    defaultValue: 'Light',
    isSelected: true,
  },
}

export const Header: Story = {
  args: {
    isHeader: true,
  },
}

export const Editable: Story = {
  args: {
    isEditable: true,
  },
}

export const SelectFromDropdown: Story = {
  args: {
    selectDropdown: true,
    isSelected: true,
    defaultValue: 'light',
    options: [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
      { value: 'system', label: 'System' },
    ],
  },
}
