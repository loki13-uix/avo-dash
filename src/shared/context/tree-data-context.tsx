import type { TreeNode } from '@/constants/tree-data'
import { updateNodeName } from '@/utils/tree'
import type React from 'react'
import { createContext, useContext, useState } from 'react'

interface TreeContextType {
  treeNodes: TreeNode[]
  setTreeNodes: (treeNodes: TreeNode[]) => void
  updateTreeNodeName: (nodeId: string, newName: string) => void
}

const TreeContext = createContext<TreeContextType | undefined>(undefined)

export const TreeProvider: React.FC<{
  children: React.ReactNode
  initialTreeNodes: TreeNode[]
}> = ({ children, initialTreeNodes }) => {
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>(initialTreeNodes)

  function updateTreeNodeName(nodeId: string, newName: string) {
    const updatedTreeNodes = updateNodeName(newName, nodeId, treeNodes)
    setTreeNodes(updatedTreeNodes)
  }

  return (
    <TreeContext.Provider
      value={{ treeNodes, setTreeNodes, updateTreeNodeName }}
    >
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
