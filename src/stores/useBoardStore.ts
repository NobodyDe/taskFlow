import { create } from 'zustand'
import type { initialColumnProps } from '../types/initialColumnProps'
import { initialColumn } from '../initialValue'

interface BoardState {
  columns: initialColumnProps[]
  addColumn: (column: initialColumnProps) => void
}

export const useBoardStore = create<BoardState>((set) => ({
  columns: initialColumn,
  addColumn: (column) => set((state) => ({ columns: [...state.columns, column] })),
}))
