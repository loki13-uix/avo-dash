import { folderTree } from '@/constants/tree-data'
import FileItem from '@/shared/components/atoms/file'
import { TreeProvider } from '@/shared/context/tree-data-context'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof FileItem> = {
  title: 'Design System/atoms/lists/file',
  component: FileItem,
  decorators: [
    (Story) => (
      <TreeProvider initialTreeNodes={folderTree}>
        <Story />
      </TreeProvider>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
      include: ['fileName', 'canRename', 'isSelected'],
    },
  },
  argTypes: {
    fileName: {
      control: 'text',
      description: 'Name of the file',
    },
    canRename: {
      control: 'boolean',
      description: 'Whether the file can be renamed',
      defaultValue: true,
    },
    isSelected: {
      control: 'boolean',
      description: 'Whether the file is selected',
      defaultValue: false,
    },
    isPreview: {
      control: 'boolean',
      description: 'Whether the file is being previewed in drag operation',
    },
  },
}

export default meta

type Story = StoryObj<typeof FileItem>

export const Default: Story = {
  args: {
    fileName: 'example.tsx',
    canRename: true,
    isSelected: false,
    selectedIds: [],
  },
}

export const Selected: Story = {
  args: {
    fileName: 'example.tsx',
    canRename: true,
    isSelected: true,
    selectedIds: ['1'],
  },
}

export const MultipleSelected: Story = {
  args: {
    fileName: 'example.tsx',
    canRename: true,
    isSelected: true,
    selectedIds: ['1', '2', '3'],
    isPreview: true,
  },
}
