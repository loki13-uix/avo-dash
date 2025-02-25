import { type RefObject, useEffect, useState } from 'react'

type UseRenameProps = {
  ref: RefObject<HTMLDivElement | null>
  name: string
  onSubmit: (name: string) => void
  onCancel?: () => void
  canRename?: boolean
}

function useRename({
  name,
  onSubmit,
  onCancel,
  ref,
  canRename = true,
}: UseRenameProps) {
  const [isRenaming, setIsRenaming] = useState(false)
  const [newName, setNewName] = useState(name)

  const handleRename = (name: string) => {
    setNewName(name)
  }

  const handleCancel = () => {
    setIsRenaming(false)
    if (onCancel) {
      onCancel()
    }
  }

  const handleSubmit = () => {
    onSubmit(newName)
  }

  useEffect(() => {
    // Add event listener to double click the element, it will trigger the rename
    const element = ref?.current
    if (element && canRename) {
      element.addEventListener('dblclick', () => {
        setIsRenaming(true)
      })
    }

    return () => {
      if (element) {
        element.removeEventListener('dblclick', () => {})
      }
    }
  }, [ref])

  useEffect(() => {
    // If renaming is true, and it has input or textarea, focus on it, and select all the text
    if (isRenaming && ref?.current) {
      // if it has a input or textarea, focus on it, and select all the text
      const element = ref?.current
      if (element) {
        const renamingInput = element.querySelector('input')
        const renamingTextarea = element.querySelector('textarea')
        if (renamingInput) {
          renamingInput.focus()
          renamingInput.select()
        } else if (renamingTextarea) {
          renamingTextarea.focus()
          renamingTextarea.select()
        }
      }
    }
  }, [isRenaming, ref])

  useEffect(() => {
    if (isRenaming) {
      // On Esc key, cancel the renaming, and reset the name
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleCancel()
        } else if (event.key === 'Enter') {
          handleSubmit()
        }
      }

      window.addEventListener('keydown', handleEscape)

      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [isRenaming])

  return { isRenaming, newName, handleRename, handleCancel }
}

export default useRename
