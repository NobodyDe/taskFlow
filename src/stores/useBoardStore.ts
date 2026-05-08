import { create } from 'zustand'
import type { initialColumnProps } from '../types/initialColumnProps'
import { initialCards, initialColumn } from '../initialValue'
import type { CardProps } from '../types/CardProps'

interface BoardState {
  columns: initialColumnProps[]
  cards: Record<string, CardProps>
  selectedCardId: string | null
  addColumn: (column: initialColumnProps) => void
  updateColumn: (id: string, data: Partial<initialColumnProps>) => void
  deleteColumn: (id: string) => void
  createCard: (data: CardProps) => void
  deleteCard: (id: string) => void
  setSelectedCardId: (id: string | null) => void
}

export const useBoardStore = create<BoardState>((set) => ({
  columns: initialColumn,
  cards: initialCards,
  selectedCardId: null,
  addColumn: (column) => set((state) => ({ columns: [...state.columns, column] })),
  updateColumn: (id, data) =>
    set((state) => ({
      columns: state.columns.map((col) => (col.id === id ? { ...col, ...data } : col)),
    })),
  deleteColumn: (id) => set((state) => ({ columns: state.columns.filter((col) => col.id !== id) })),
  createCard: (data) =>
    set((state) => ({
      cards: { ...state.cards, [data.id]: data },
      columns: state.columns.map((col) =>
        col.id === data.columnId ? { ...col, cardIds: [...col.cardIds, data.id] } : col
      ),
    })),
  deleteCard: (id) =>
    set((state) => {
      const { [id]: _, ...remainingCards } = state.cards
      return {
        cards: remainingCards,
        columns: state.columns.map((col) => ({
          ...col,
          cardIds: col.cardIds.filter((cardId) => cardId !== id),
        })),
      }
    }),
  setSelectedCardId: (id) => set({ selectedCardId: id }),
}))
