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
    group: {
      description: 'this is a group state',
    },

    checkboxProps: {
      description: 'this is a checkbox props',
      table: {
        disable: true,
      },
    },

    selectedState: {
      description: 'this is selected state',
    },
  },
}

export default meta

type Story = StoryObj<typeof TableCellLeading>
export const Default: Story = {
  args: {},
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
