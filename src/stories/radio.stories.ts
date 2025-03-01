import { Radio } from '@/shared/components/atoms/radio'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Radio> = {
  title: 'Design System/atoms/radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
    docs: {
      controls: {
        exclude: [
          'className',
          'labelProps',
          'radioGroupProps',
          'onClick',
          'id',
        ],
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      description: 'Types of variants',
      table: {
        defaultValue: { summary: 'right' },
      },
      options: ['left', 'right'],
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'right',
    options: [
      { label: 'Item 1', value: 'Item1' },
      { label: 'Item 2', value: 'Item2' },
    ],
  },
}

export const Left: Story = {
  args: {
    variant: 'left',
    options: [
      { label: 'Item 1', value: 'Item1' },
      { label: 'Item 2', value: 'Item2' },
    ],
  },
}
