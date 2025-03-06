'use client'
import { folderTree } from '@/constants/tree-data'
import TreeWrapper from '@/shared/components/atoms/tree/tree-wrapper'
import { TableComponent } from '@/shared/components/table-component'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/shared/components/ui/resizable'
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

  return (
    <div className='flex h-screen w-full overflow-hidden'>
      <div className='h-screen w-[340px] shadow-xl select-none flex flex-col overflow-auto'>
        <ResizablePanelGroup
          direction='vertical'
          className='h-full !overflow-auto'
        >
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

      <div className='h-screen w-full p-4'>
        <TableComponent />
      </div>
    </div>
  )
}
