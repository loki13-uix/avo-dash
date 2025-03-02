import { folderTree } from '@/constants/tree-data'
import Tree from '@/shared/components/atoms/tree'
import { TreeProvider } from '@/shared/context/tree-data-context'
import type { Meta, StoryObj } from '@storybook/react'
import type React from 'react'

const meta: Meta<typeof Tree> = {
  title: 'Design System/atoms/tree',
  component: Tree,
  decorators: [
    (Story: React.ComponentType) => (
      <TreeProvider initialTreeNodes={folderTree}>
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
