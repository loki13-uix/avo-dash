'use client'
import {
  FOLDER_TREE_DEFAULT_SIZE,
  FOLDER_TREE_MIN_SIZE,
  MAIN_CONTENT_DEFAULT_SIZE,
  SIDEBAR_DEFAULT_SIZE,
  SIDEBAR_MAX_SIZE,
  SIDEBAR_MIN_SIZE,
} from '@/constants/constants'
import { folderTree } from '@/constants/tree-data'
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

import { Fragment, useEffect, useRef, useState } from 'react'
const trees = [folderTree, folderTree]

export default function Home() {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0])
  const panelRefs = useRef<(HTMLDivElement | null)[]>([null, null])

  const handleExpand = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const handleCollapse = (index: number) => {
    setExpandedIndices((prev) => prev.filter((indices) => indices !== index))
  }

  useEffect(() => {
    panelRefs.current.forEach((panel, index) => {
      if (panel) {
        const resizablePanel = panel.closest('[data-panel]')
        if (resizablePanel && resizablePanel instanceof HTMLElement) {
          if (!expandedIndices.includes(index)) {
            resizablePanel.style.flex = '0 0 10px'
          } else {
            resizablePanel.style.flex = '1 1 0'
          }
        }
      }
    })
  }, [expandedIndices])

  const setPanelRef = (index: number) => (el: HTMLDivElement | null) => {
    panelRefs.current[index] = el
  }

  const selectedFile = useFileStore((state) => state.selectedFile)

  return (
    <div className='h-screen overflow-hidden'>
      <div className='border-b border-grey-4 px-4 py-3'>
        <Icon name='logo' size={24} className='sticky top-0' />
      </div>

      <ResizablePanelGroup direction='horizontal' className='h-screen'>
        <ResizablePanel
          minSize={SIDEBAR_MIN_SIZE}
          maxSize={SIDEBAR_MAX_SIZE}
          defaultSize={SIDEBAR_DEFAULT_SIZE}
          className='!overflow-auto z-1 shadow-[0px_15px_40px_0px_rgba(202,202,213,0.55)]'
        >
          <div className='shadow-xl select-none flex h-screen flex-col overflow-auto'>
            <ResizablePanelGroup
              direction='vertical'
              className='h-full !overflow-auto  max-h-[calc(100vh-50px)]'
            >
              <TableCell
                isHeader
                defaultValue='Project: '
                className='px-3 py-4 border-none !min-h-[54px]'
                title='Web Project'
                showIcon
              />
              {trees.map((tree, index) => (
                <Fragment key={index}>
                  <ResizablePanel
                    minSize={FOLDER_TREE_MIN_SIZE}
                    className='!overflow-visible'
                    defaultSize={
                      expandedIndices.includes(index)
                        ? FOLDER_TREE_DEFAULT_SIZE
                        : FOLDER_TREE_MIN_SIZE
                    }
                  >
                    <div ref={setPanelRef(index)}>
                      <TreeWrapper
                        key={index}
                        initialTreeNodes={tree}
                        isExpanded={expandedIndices.includes(index)}
                        onExpand={() => handleExpand(index)}
                        onCollapse={() => handleCollapse(index)}
                      />
                    </div>
                  </ResizablePanel>
                  {index !== trees.length - 1 && (
                    <ResizableHandle className='!h-0.5 bg-muted' />
                  )}
                </Fragment>
              ))}
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
                  name={[
                    'copy',
                    'paste',
                    'trash',
                    'import',
                    'export',
                    'details',
                  ]}
                  iconClassName='size-5'
                  iconColors='#8793A0'
                  className='border-none gap-x-4'
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
