import type { TreeNode } from '@/constants/tree-data'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

// Find a node's parent in the tree structure
export const findParentNode = (
  nodes: TreeNode[],
  id: string,
  parent: TreeNode | null = null
): TreeNode | null => {
  for (const node of nodes) {
    if (node.id === id) return parent
    if (node.nodes.length) {
      const foundParent = findParentNode(node.nodes, id, node)
      if (foundParent) return foundParent
    }
  }
  return null
}

export const removeNode = (nodes: TreeNode[], id: string): TreeNode[] => {
  return nodes
    .map((node) => ({
      ...node,
      nodes: node.nodes
        .filter((child) => child.id !== id)
        .map((child) => ({
          ...child,
          nodes: removeNode(child.nodes, id),
        })),
    }))
    .filter((node) => node.id !== id)
}

export const isDescendant = (parent: TreeNode, childId: string): boolean => {
  if (parent.nodes.some((node) => node.id === childId)) return true
  return parent.nodes.some((node) => isDescendant(node, childId))
}

export function calcPadLeft(level: number) {
  return `${level * 24}px`
}

export const getParentFolderIds = (
  treeNodes: TreeNode[],
  nodeId: string
): string[] => {
  const result: string[] = []
  let currentNodeId = nodeId

  while (true) {
    const parentNode = findParentNode(treeNodes, currentNodeId)
    if (!parentNode) break

    result.push(parentNode.id)
    currentNodeId = parentNode.id
  }

  return result
}
