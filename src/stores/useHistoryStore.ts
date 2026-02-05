import { create } from 'zustand'
import { useConfigStore } from './useConfigStore'
import type { BottleConfig } from '../types/config'

interface HistoryStore {
    past: BottleConfig[]
    future: BottleConfig[]
    canUndo: boolean
    canRedo: boolean

    pushState: (state: BottleConfig) => void
    undo: () => void
    redo: () => void
    clear: () => void
}

const MAX_HISTORY = 50

export const useHistoryStore = create<HistoryStore>((set, get) => ({
    past: [],
    future: [],
    canUndo: false,
    canRedo: false,

    pushState: (state) => {
        set((s) => ({
            past: [...s.past.slice(-MAX_HISTORY + 1), state],
            future: [],
            canUndo: true,
            canRedo: false,
        }))
    },

    undo: () => {
        const { past, future } = get()
        if (past.length === 0) return

        const previous = past[past.length - 1]
        const currentState = useConfigStore.getState().getConfig()

        useConfigStore.getState().loadConfig(previous)

        set({
            past: past.slice(0, -1),
            future: [currentState, ...future],
            canUndo: past.length > 1,
            canRedo: true,
        })
    },

    redo: () => {
        const { past, future } = get()
        if (future.length === 0) return

        const next = future[0]
        const currentState = useConfigStore.getState().getConfig()

        useConfigStore.getState().loadConfig(next)

        set({
            past: [...past, currentState],
            future: future.slice(1),
            canUndo: true,
            canRedo: future.length > 1,
        })
    },

    clear: () => set({ past: [], future: [], canUndo: false, canRedo: false }),
}))
