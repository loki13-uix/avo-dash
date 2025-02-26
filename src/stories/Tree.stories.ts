import Tree from '@/shared/components/atoms/tree'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Tree> = {
  title: 'Design System/atoms/Tree',
  component: Tree,
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
}

export default meta

type Story = StoryObj<typeof Tree>

export const Default: Story = {
  args: {},
}
