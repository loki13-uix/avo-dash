import { type TreeNode, folderTree } from '@/constants/tree-data'
import type React from 'react'
import { createContext, useContext, useState } from 'react'

interface TreeContextType {
  treeNodes: TreeNode[]
  setTreeNodes: (treeNodes: TreeNode[]) => void
}

const TreeContext = createContext<TreeContextType | undefined>(undefined)

export const TreeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>(folderTree)

  return (
    <TreeContext.Provider value={{ treeNodes, setTreeNodes }}>
      {children}
    </TreeContext.Provider>
  )
}

export const useTreeContext = () => {
  const context = useContext(TreeContext)
  if (context === undefined) {
    throw new Error('useTreeContext must be used within a TreeProvider')
  }
  return context
}
