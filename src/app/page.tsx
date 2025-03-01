'use client'

import { folderTree } from '@/constants/tree-data'
import Tree from '@/shared/components/atoms/tree'
import { TreeProvider } from '@/shared/context/tree-data-context'
export default function Home() {
  return (
    <div className=''>
      <TreeProvider initialTreeNodes={folderTree}>
        <Tree />
      </TreeProvider>
    </div>
  )
}
