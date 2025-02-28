import TableCellLeading from '@/shared/components/atoms/tablecell-leading'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TableCellLeading> = {
  title: 'Design System/atoms/table/cell-leading',
  component: TableCellLeading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },

  argTypes: {
    checkboxProps: {
      description: 'Checkbox',
      table: {
        disable: true,
      },
    },
    group: {
      description: 'this is a group state',
    },

    selectedState: {
      description: 'this is selected state',
    },
  },
}

export default meta

type Story = StoryObj<typeof TableCellLeading>
export const Default: Story = {
  args: {
    checkboxProps: {},
  },
}

export const selected: Story = {
  args: {
    selectedState: true,
  },
}

export const group: Story = {
  args: {
    group: true,
  },
}
