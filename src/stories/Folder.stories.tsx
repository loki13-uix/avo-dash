import { iconNames } from '@/constants/icons'
import { folderTree } from '@/constants/tree-data'
import FileItem from '@/shared/components/atoms/file'
import FolderItem from '@/shared/components/atoms/folder'
import { TreeProvider } from '@/shared/context/tree-data-context'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import type React from 'react'

const FolderWrapper: React.FC<React.ComponentProps<typeof FolderItem>> = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <TreeProvider initialTreeNodes={folderTree}>
      <div className='w-48 h-32 select-none'>
        <FolderItem
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
          id='1'
          name='Example Folder'
          selectedIds={[]}
        />
      </div>
    </TreeProvider>
  )
}

const meta: Meta<typeof FolderItem> = {
  title: 'Design System/atoms/lists/folder',
  component: FolderWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
      include: ['name', 'isExpanded', 'canRename', 'isSelected'],
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Name of the folder',
    },
    isExpanded: {
      control: 'boolean',
      description: 'Whether the folder is expanded',
      defaultValue: false,
    },
    canRename: {
      control: 'boolean',
      description: 'Whether the folder can be renamed',
      defaultValue: true,
    },
    isSelected: {
      control: 'boolean',
      description: 'Whether the folder is selected',
      defaultValue: false,
    },
    isPreview: {
      control: 'boolean',
      description: 'Whether the folder is being previewed in drag operation',
    },
    iconName: {
      control: 'select',
      description: 'Custom icon name to override default folder icon',
      options: [...iconNames],
    },
  },
}

export default meta

type Story = StoryObj<typeof FolderItem>

export const Default: Story = {
  args: {
    name: 'Example Folder',
    isExpanded: false,
    canRename: true,
    isSelected: false,
    selectedIds: [],
  },
}

export const Expanded: Story = {
  args: {
    name: 'Example Folder',
    isExpanded: true,
    canRename: true,
    isSelected: false,
    selectedIds: [],
    children: (
      <div className='pl-6 text-[13px]'>
        <FileItem
          id='1'
          fileName='Example File'
          selectedIds={[]}
          canRename={true}
          isSelected={false}
          isPreview={false}
        />
      </div>
    ),
  },
}

export const Selected: Story = {
  args: {
    name: 'Example Folder',
    isExpanded: false,
    canRename: true,
    isSelected: true,
    selectedIds: ['1'],
  },
}

export const MultipleSelected: Story = {
  args: {
    name: 'Example Folder',
    isExpanded: false,
    canRename: true,
    isSelected: true,
    selectedIds: ['1', '2', '3'],
    isPreview: true,
  },
}
