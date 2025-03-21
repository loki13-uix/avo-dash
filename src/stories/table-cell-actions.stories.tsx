import TableCellActions from '@/shared/components/atoms/table-cell-actions'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TableCellActions> = {
  title: 'Design System/atoms/table/cell-actions',
  component: TableCellActions,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
  argTypes: {
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
    plusIcon: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'This is of boolean type',
    },
    penIcon: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'This is of boolean type',
    },
    fileWithData: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'This is of boolean type',
    },
    deleteIcon: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'This is of boolean type',
    },
    dots: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'This is of boolean type',
    },
    icons: {
      control: 'text',
      table: {
        disable: true,
      },
    },
    iconClassName: {
      control: 'text',
      table: {
        disable: true,
      },
    },
    iconColors: {
      control: 'text',
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
type Story = StoryObj<typeof TableCellActions>

export const Default: Story = {
  args: {
    isHeader: false,
    isSelected: false,
    plusIcon: true,
    penIcon: true,
    fileWithData: true,
    deleteIcon: true,
    dots: true,
  },
}

export const selected: Story = {
  args: {
    isHeader: false,
    isSelected: true,
    plusIcon: true,
    penIcon: true,
    fileWithData: true,
    deleteIcon: true,
    dots: true,
  },
}

export const header: Story = {
  args: {
    isHeader: true,
    isSelected: false,
    plusIcon: true,
    penIcon: true,
    fileWithData: true,
    deleteIcon: true,
    dots: true,
  },
}
