import type { TreeNode } from '@/constants/tree-data'

export const getParentFolderIds = (
  treeNodes: TreeNode[],
  nodeId: string
): string[] => {
  const result: string[] = []
  let currentNodeId = nodeId

  while (true) {
    const parentNode = getParentNodeById(treeNodes, currentNodeId)
    if (!parentNode) break

    result.push(parentNode.id)
    currentNodeId = parentNode.id
  }

  return result
}
export function updateNodeName(
  newName: string,
  id: string,
  treeNodes: TreeNode[]
) {
  const updateNodeNameRecursive = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.map((node) => {
      if (node.id === id) {
        return { ...node, name: newName }
      }
      if (node.nodes) {
        return { ...node, nodes: updateNodeNameRecursive(node.nodes) }
      }
      return node
    })
  }

  return updateNodeNameRecursive(treeNodes)
}

export const findNodeById = (
  nodes: TreeNode[],
  id: string
): TreeNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.nodes.length) {
      const foundNode = findNodeById(node.nodes, id)
      if (foundNode) return foundNode
    }
  }
  return null
}

export const removeNodeById = (nodes: TreeNode[], id: string): TreeNode[] => {
  return nodes
    .map((node) => ({
      ...node,
      nodes: node.nodes
        .filter((child) => child.id !== id)
        .map((child) => ({
          ...child,
          nodes: removeNodeById(child.nodes, id),
        })),
    }))
    .filter((node) => node.id !== id)
}

export const isDescendant = (parent: TreeNode, childId: string): boolean => {
  if (parent.nodes.some((node) => node.id === childId)) return true
  return parent.nodes.some((node) => isDescendant(node, childId))
}

export const getParentNodeById = (
  tree: TreeNode[],
  id: string,
  parent: TreeNode | null = null
): TreeNode | null => {
  for (const node of tree) {
    if (node.id === id) return parent
    const found = getParentNodeById(node.nodes, id, node)
    if (found) return found
  }
  return null
}

export const getSiblingsById = (tree: TreeNode[], id: string): TreeNode[] => {
  const parent = getParentNodeById(tree, id)
  return parent ? parent.nodes : tree
}

export const isSelectedNodeHaveParent = (
  tree: TreeNode[],
  parentId: string,
  selectedIds: string[]
): boolean => {
  for (const id of selectedIds) {
    let current = getParentNodeById(tree, id)
    while (current) {
      if (current.id === parentId) return true
      current = getParentNodeById(tree, current.id)
    }
  }
  return false
}

export const getSelectedParentOfChild = (
  tree: TreeNode[],
  childId: string,
  selectedIds: string[]
): string | null => {
  let current = getParentNodeById(tree, childId)
  while (current) {
    if (selectedIds.includes(current.id)) {
      return current.id
    }
    current = getParentNodeById(tree, current.id)
  }
  return null
}
