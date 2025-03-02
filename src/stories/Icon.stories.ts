import { iconRegistry } from '@/constants/icons'
import { Icon } from '@/shared/components/atoms/icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Icon> = {
  title: 'Design System/atoms/icons',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    name: {
      control: 'select',
      description: 'Name of the icon',
      options: Array.from(iconRegistry.keys()),
      table: {
        defaultValue: {
          summary: 'You can choose the type of icon from the dropdown',
        },
      },
    },

    color: {
      table: {
        defaultValue: { summary: 'customize the color' },
      },
    },
    height: {
      table: {
        defaultValue: { summary: 'customize the height' },
      },
    },
    width: {
      table: {
        defaultValue: { summary: 'customize the width' },
      },
    },
    style: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Icon>

export const Default: Story = {
  args: {
    name: 'admin',
    width: 56,
    height: 56,
    color: 'red',
  },
}
