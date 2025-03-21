import { Button } from '@/shared/components/atoms/button'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  title: 'Design System/atoms/button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },

  argTypes: {
    variant: {
      control: 'select',
      description: 'Types of variants',
      options: [
        'standard',
        'secondary',
        'secondary-purple',
        'success',
        'danger',
      ],
      table: {
        defaultValue: {
          summary: undefined,
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    iconClassName: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    variant: 'standard',
    children: 'This is a button',
    disabled: false,
    icon: 'plus-icon',
    iconClassName: 'size-5',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'This is a button',
    icon: 'plus-icon',
    iconClassName: 'size-5',
  },
}

export const SecondaryPurple: Story = {
  args: {
    variant: 'secondary-purple',
    children: 'This is a button',
    icon: 'plus-icon',
    iconClassName: 'size-5',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'This is a button',
    icon: 'plus-icon',
    iconClassName: 'size-5',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'This is a button',
    icon: 'plus-icon',
    iconClassName: 'size-5',
  },
}
