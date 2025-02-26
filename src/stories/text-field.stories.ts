import TextField from '@/shared/components/atoms/text-field'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Design System/atoms/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the input field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
      defaultValue: 'Search...',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof TextField>

// Default state with value
export const Default: Story = {
  args: {
    placeholder: 'Search...',
    iconClassName: 'size-4',
  },
}

// Active/Focused state
export const Active: Story = {
  args: {
    value: 'Search text',
    autoFocus: true,
    iconClassName: 'size-4',
  },
}

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Search text',
    placeholder: 'Search...',
    iconClassName: 'size-4',
  },
}
