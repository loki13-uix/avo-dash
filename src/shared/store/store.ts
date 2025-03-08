import { create } from 'zustand'

interface FileState {
  selectedFile: {
    id: string
    name: string
    email: string
    age: number
    phone: string
    address: string
  }[]
  setSelectedFile: (
    file: {
      id: string
      name: string
      email: string
      age: number
      phone: string
      address: string
    }[]
  ) => void
}

const useFileStore = create<FileState>((set) => ({
  selectedFile: [],
  setSelectedFile: (file) => set({ selectedFile: file }),
}))

export default useFileStore
