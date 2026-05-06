import { create } from 'zustand'

interface SidebarOpen {
  sidebarOpen: boolean
  toggleSidebarOpen: () => void
}

export const useSidebarStore = create<SidebarOpen>((set) => ({
  sidebarOpen: false,
  toggleSidebarOpen: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}))
