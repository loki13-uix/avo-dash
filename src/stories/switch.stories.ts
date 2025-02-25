import type { Meta, StoryObj } from '@storybook/react'

import { Switch } from '@/shared/components/atoms/switch'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof Switch> = {
  title: 'Design System/atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
    docs: {
      controls: {
        exclude: ['className', 'labelProps', 'switchProps', 'onClick', 'id'],
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
    onClick: {
      action: 'clicked',
      description: 'Function called when the switch is clicked',
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'right',
    onClick: action('default click'),
    label: 'Run Tests',
  },
}

export const Left: Story = {
  args: {
    variant: 'left',
    onClick: action('default click'),
    label: 'Run Tests',
  },
}
