import { create } from 'zustand'
import type { initialColumnProps } from '../types/initialColumnProps'
import { initialCards, initialColumn } from '../initialValue'
import type { CardProps } from '../types/CardProps'

type ColumnFormData = {
  id?: string
  title: string
  color: string
}

export type BoardAction =
  | {
      type: 'column/create'
      payload: {
        column: initialColumnProps
      }
    }
  | {
      type: 'column/update'
      payload: {
        columnId: string
        data: Partial<ColumnFormData>
      }
    }
  | {
      type: 'column/delete'
      payload: {
        columnId: string
      }
    }
  | {
      type: 'card/create'
      payload: {
        columnId: string
        data: CardProps
      }
    }
  | {
      type: 'card/delete'
      payload: {
        id: string
      }
    }

interface BoardState {
  columns: initialColumnProps[]
  cards: Record<string, CardProps>
  selectedCardId: string | null
  selectedProject: string | null
  setSelectedProject: (id: string) => void
  dispatch: (action: BoardAction) => void

  deleteCard: (id: string) => void
  setSelectedCardId: (id: string | null) => void
  updateCard: (id: string, data: Partial<CardProps>) => void
}

export const useBoardStore = create<BoardState>((set) => ({
  columns: initialColumn,
  cards: initialCards,
  selectedCardId: null,
  selectedProject: null,

  setSelectedProject: (id) =>
    set({
      selectedProject: id,
    }),

  dispatch: (action: BoardAction) =>
    set((state) => {
      switch (action.type) {
        case 'column/create':
          return {
            columns: [...state.columns, action.payload.column],
          }

        case 'column/update':
          return {
            columns: state.columns.map((column) =>
              column.id === action.payload.columnId ? { ...column, ...action.payload.data } : column
            ),
          }

        case 'column/delete':
          return {
            columns: state.columns.filter((col) => col.id !== action.payload.columnId),
          }

        case 'card/create':
          return {
            cards: { ...state.cards, [action.payload.data.id]: action.payload.data },
            columns: state.columns.map((col) =>
              col.id === action.payload.columnId
                ? { ...col, cardIds: [...col.cardIds, action.payload.data.id] }
                : col
            ),
          }
        case 'card/delete':
          const { [action.payload.id]: _, ...remainingCards } = state.cards
          return {
            cards: remainingCards,
            columns: state.columns.map((col) => ({
              ...col,
              cardIds: col.cardIds.filter((cardId) => cardId !== action.payload.id),
            })),
          }
      }
    }),

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
  updateCard: (id, data) =>
    set((state) => ({
      cards: {
        ...state.cards,
        [id]: {
          ...state.cards[id],
          ...data,
        },
      },
    })),
}))
