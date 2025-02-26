import Modal from '@/shared/components/atoms/modal'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Modal> = {
  title: 'Design System/atoms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Content of the modal',
      table: {
        defaultValue: {
          summary: 'This is a default modal content',
        },
      },
    },
    title: {
      control: 'text',
      description: 'Title of the modal',
      table: {
        defaultValue: {
          summary: 'Modal Title',
        },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onClose: {
      action: 'close',
      description: 'Function to close the modal',
      table: {
        disable: true,
      },
    },
    onConfirm: {
      action: 'confirm',
      description: 'Function to confirm the modal',
      table: {
        disable: true,
      },
    },
    cancelText: {
      control: 'text',
      description: 'Text for the cancel button',
      defaultValue: 'Cancel',
      table: {
        disable: true,
      },
    },
    confirmText: {
      control: 'text',
      description: 'Text for the confirm button',
      defaultValue: 'Confirm',
      table: {
        disable: true,
      },
    },
    width: {
      table: {
        defaultValue: {
          summary: 'w-[500px]',
        },
        disable: true,
      },
    },
    height: {
      table: {
        defaultValue: {
          summary: 'h-[293px]',
        },
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Default Modal',
    content: 'This is a default modal content',
    onClose: action('close'),
    onConfirm: action('confirm'),
  },
}

export const WithLongContent: Story = {
  args: {
    ...Default.args,
    content:
      'This is a modal with very long content. It demonstrates how the modal handles longer text and potentially wraps it. The modal should remain centered and properly sized regardless of content length.',
  },
}
