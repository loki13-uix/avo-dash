'use client'
import {
  MAIN_CONTENT_DEFAULT_SIZE,
  SIDEBAR_DEFAULT_SIZE,
  SIDEBAR_MAX_SIZE,
  SIDEBAR_MIN_SIZE,
} from '@/constants/constants'
import type { IconName } from '@/constants/icons'
import { type TreeNode, folderTree } from '@/constants/tree-data'
import { cn } from '@/lib/utils'
import { Button } from '@/shared/components/atoms/button'
import { Icon } from '@/shared/components/atoms/icon'
import TableCell from '@/shared/components/atoms/table-cell'
import TableCellActions from '@/shared/components/atoms/table-cell-actions'
import TreeWrapper from '@/shared/components/atoms/tree/tree-wrapper'
import { TableComponent } from '@/shared/components/table-component'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/shared/components/ui/resizable'
import useFileStore from '@/shared/store/store'

import { Fragment, useState } from 'react'
const trees: {
  id: number
  headerIcon: IconName
  headerText: string
  treeNodes: TreeNode[]
}[] = [
  {
    id: 0,
    headerIcon: 'repository',
    headerText: 'Elements',
    treeNodes: folderTree,
  },
  {
    id: 1,
    headerIcon: 'test-case',
    headerText: 'Test Cases',
    treeNodes: folderTree,
  },
  {
    id: 2,
    headerIcon: 'flow',
    headerText: 'E2E Flows',
    treeNodes: folderTree,
  },
]

export default function Home() {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0])

  const handleExpand = (id: number) => {
    setExpandedIndices((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleCollapse = (id: number) => {
    setExpandedIndices((prev) => prev.filter((indices) => indices !== id))
  }

  const selectedFile = useFileStore((state) => state.selectedFile)

  return (
    <div className='h-dvh overflow-hidden'>
      <div className='border-b border-grey-4 px-4 py-3'>
        <Icon
          name='logo'
          size={24}
          className='sticky top-0'
          useDefaultColor={false}
        />
      </div>

      <ResizablePanelGroup direction='horizontal' className='h-dvh'>
        <ResizablePanel
          minSize={SIDEBAR_MIN_SIZE}
          maxSize={SIDEBAR_MAX_SIZE}
          defaultSize={SIDEBAR_DEFAULT_SIZE}
          className='z-1 shadow-[0px_15px_40px_0px_rgba(202,202,213,0.55)]'
        >
          <div className='shadow-xl select-none flex h-dvh flex-col overflow-auto'>
            <ResizablePanelGroup direction='vertical' className='h-full'>
              <TableCell
                isHeader
                defaultValue='Project: '
                className='px-3 py-4 border-none !min-h-[54px]'
                title='Web Project'
                showIcon
              />
              <div className='h-[calc(100vh-100px)] 2xl:h-[calc(100vh-80px)] overflow-auto flex flex-col'>
                {trees.map((tree, index) => (
                  <Fragment key={tree.id}>
                    <ResizablePanel
                      minSize={22}
                      className={cn(
                        !expandedIndices.includes(tree.id) &&
                          '!flex-grow-0 !flex-shrink-0 min-h-[50px]'
                      )}
                    >
                      <div className='h-full'>
                        <TreeWrapper
                          key={tree.id}
                          initialTreeNodes={tree.treeNodes}
                          isExpanded={expandedIndices.includes(tree.id)}
                          onExpand={() => handleExpand(tree.id)}
                          onCollapse={() => handleCollapse(tree.id)}
                          headerIcon={tree.headerIcon}
                          headerText={tree.headerText}
                        />
                      </div>
                    </ResizablePanel>
                    {index !== trees.length - 1 &&
                      expandedIndices.length > 0 && (
                        <ResizableHandle
                          className='!h-0.5 bg-muted'
                          disabled={
                            !expandedIndices.includes(trees[index + 1]?.id)
                          }
                        />
                      )}
                  </Fragment>
                ))}
              </div>
            </ResizablePanelGroup>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel
          defaultSize={MAIN_CONTENT_DEFAULT_SIZE}
          className='overflow-auto !w-[calc(100vw-500px)]'
        >
          <div className='flex h-full flex-col bg-grey-1'>
            {selectedFile.length > 0 && (
              <div className='w-full flex justify-end border-t-0 p-4 gap-1.5'>
                <TableCellActions
                  icons='copy'
                  iconClassName='size-5'
                  iconColors='#8793A0'
                  className='border-none '
                />
                <TableCellActions
                  icons='paste'
                  iconClassName='size-5'
                  iconColors='#8793A0'
                  className='border-none '
                />
                <TableCellActions
                  icons='trash'
                  iconClassName='size-5'
                  iconColors='#8793A0'
                  className='border-none '
                />
                <TableCellActions
                  icons='import'
                  iconClassName='size-5'
                  iconColors='#8793A0'
                  className='border-none '
                />
                <TableCellActions
                  icons='export'
                  iconClassName='size-5'
                  iconColors='#8793A0'
                  className='border-none '
                />

                <TableCellActions
                  icons='details'
                  iconClassName='size-5'
                  iconColors='#8793A0'
                  className='border-none '
                />

                <Button
                  variant='success'
                  className='border-none px-1.5 py-1 w-[78px] h-8'
                  icon='save'
                  iconClassName='size-5'
                >
                  Save
                </Button>
              </div>
            )}

            {selectedFile.length > 0 && (
              <div className='px-4 flex-1 overflow-auto'>
                <TableComponent className='bg-white' />
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
