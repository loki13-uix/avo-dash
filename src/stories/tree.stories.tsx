import Tree from '@/shared/components/atoms/tree'
import { TreeProvider } from '@/shared/context/tree-data-context'
import type { Meta, StoryObj } from '@storybook/react'
import type React from 'react'

const meta: Meta<typeof Tree> = {
  title: 'Design System/atoms/Tree',
  component: Tree,
  tags: ['autodocs'],
  decorators: [
    (Story: React.ComponentType) => (
      <TreeProvider>
        <Story />
      </TreeProvider>
    ),
  ],
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
