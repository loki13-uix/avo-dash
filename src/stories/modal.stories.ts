import Modal from '@/shared/components/atoms/modal'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Modal> = {
  title: 'Design System/atoms/modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Accept any type of string',
    },
    className: {
      control: 'text',
      table: {
        disable: true,
      },
    },
    successButton: {
      table: {
        disable: true,
      },
    },
    dangerButton: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    title: 'Modal Title',
    content:
      'This is just a demo text. This text can be very short, but in most cases it will text approximately two or maybe even three lines.',
    successButton: {
      label: 'OK',
    },
    dangerButton: {
      label: 'Cancel',
    },
  },
}
