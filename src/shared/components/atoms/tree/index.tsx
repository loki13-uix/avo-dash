import { type TreeNode, folderTree } from '@/constants/tree-data'
import { useState } from 'react'
import FileItem from '../file'
import FolderItem from '../folder'

type TreeNodeProps = {
  node: TreeNode
  onRename: (name: string, id: string) => void
}

function TreeNodeComponent({ node, onRename }: TreeNodeProps) {
  if (node.variant === 'file') {
    return (
      <FileItem
        name={node.name}
        id={node.id}
        onRenameSubmit={(name) => onRename(name, node.id)}
        isSelected={false}
        canRename={false}
      />
    )
  }

  return (
    <FolderItem
      name={node.name}
      id={node.id}
      onRenameSubmit={(name) => onRename(name, node.id)}
      isSelected={false}
    >
      <div className='pl-4'>
        {node.nodes?.map((childNode) => (
          <TreeNodeComponent
            key={childNode.id}
            node={childNode}
            onRename={onRename}
          />
        ))}
      </div>
    </FolderItem>
  )
}

function Tree() {
  const [treeNodes] = useState<TreeNode[]>(folderTree)

  function onRename(name: string, id: string) {
    alert(`${name} ${id}`)
  }

  return (
    <div className='w-96 h-dvh shadow-xl p-3 overflow-y-scroll'>
      {treeNodes.map((node) => (
        <TreeNodeComponent key={node.id} node={node} onRename={onRename} />
      ))}
    </div>
  )
}

export default Tree
