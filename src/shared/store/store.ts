import { create } from 'zustand'

interface File {
  id: string
  name: string
  email: string
  age: number
  phone: string
  address: string
}

interface FileState {
  selectedFile: File[]
  setSelectedFile: (file: File[]) => void
}

const useFileStore = create<FileState>((set) => ({
  selectedFile: [],
  setSelectedFile: (file) => set({ selectedFile: file }),
}))

export default useFileStore
