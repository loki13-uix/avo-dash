import type { Meta, StoryObj } from '@storybook/react'

import { CheckBox } from '@/shared/components/atoms/checkbox'

const meta: Meta<typeof CheckBox> = {
  title: 'Design System/atoms/checkbox',
  component: CheckBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
    docs: {
      controls: { exclude: ['className', 'labelProps', 'checkboxProps', 'id'] },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      description: 'Types of variants',
      table: {
        defaultValue: { summary: 'left' },
      },
      options: ['left', 'right'],
    },
    ref: {
      table: {
        disable: true,
      },
    },
    labelProps: {
      table: {
        disable: true,
      },
    },
    id: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    checkboxProps: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'left',
    label: 'Accept Terms and Conditions',
  },
}

export const Right: Story = {
  args: {
    variant: 'right',
    label: 'Accept Terms and Conditions',
  },
}

export const IndeterminateDefault: Story = {
  args: {
    variant: 'left',
    label: 'Accept Terms and Conditions',
    checkboxProps: {
      checked: 'indeterminate',
    },
  },
}

export const IndeterminateRight: Story = {
  args: {
    variant: 'right',
    label: 'Accept Terms and Conditions',
    checkboxProps: {
      checked: 'indeterminate',
    },
  },
}
