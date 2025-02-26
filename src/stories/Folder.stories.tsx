import { iconNames } from '@/constants/icons'
import FileItem from '@/shared/components/atoms/file'
import FolderItem from '@/shared/components/atoms/folder'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof FolderItem> = {
  title: 'Design System/atoms/Folder',
  component: FolderItem,
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
    onToggle: () => {},
  },
}

export const Expanded: Story = {
  args: {
    name: 'Example Folder',
    isExpanded: true,
    canRename: true,
    isSelected: false,
    selectedIds: [],
    onToggle: () => {},
    children: (
      <div className='pl-6 text-[13px]'>
        <FileItem
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
  },
}
