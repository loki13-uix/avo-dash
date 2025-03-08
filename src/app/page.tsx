'use client'
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

export default function Home() {
  const trees = [folderTree, folderTree]
  const panelRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])

  const [expandedIndices, setExpandedIndices] = useState<number[]>([0])

  const handleExpand = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const handleCollapse = (index: number) => {
    setExpandedIndices((prev) => prev.filter((i) => i !== index))
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
          minSize={25}
          maxSize={40}
          defaultSize={25}
          className='!overflow-auto  z-1'
          style={{ boxShadow: '0px 15px 40px 0px #CACAD58C' }}
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
                    minSize={3}
                    className='!overflow-visible'
                    defaultSize={expandedIndices.includes(index) ? 53 : 3}
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
          defaultSize={70}
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
