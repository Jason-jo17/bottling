import { create } from 'zustand'

interface UIStore {
    // Modals
    isExportModalOpen: boolean
    isPresetGalleryOpen: boolean
    isShareModalOpen: boolean

    // Panels
    activePanelTab: 'color' | 'material' | 'label' | 'model'
    isSidebarOpen: boolean
    isMobileControlsOpen: boolean

    // Loading states
    isLoading: boolean
    loadingMessage: string

    // Theme
    isDarkMode: boolean

    // Actions
    setExportModalOpen: (open: boolean) => void
    setPresetGalleryOpen: (open: boolean) => void
    setShareModalOpen: (open: boolean) => void
    setActivePanelTab: (tab: 'color' | 'material' | 'label' | 'model') => void
    setSidebarOpen: (open: boolean) => void
    setMobileControlsOpen: (open: boolean) => void
    setLoading: (loading: boolean, message?: string) => void
    toggleDarkMode: () => void
}

export const useUIStore = create<UIStore>((set) => ({
    // Modals
    isExportModalOpen: false,
    isPresetGalleryOpen: false,
    isShareModalOpen: false,

    // Panels
    activePanelTab: 'model',
    isSidebarOpen: true,
    isMobileControlsOpen: false,

    // Loading states
    isLoading: false,
    loadingMessage: '',

    // Theme
    isDarkMode: false,

    // Actions
    setExportModalOpen: (open) => set({ isExportModalOpen: open }),
    setPresetGalleryOpen: (open) => set({ isPresetGalleryOpen: open }),
    setShareModalOpen: (open) => set({ isShareModalOpen: open }),
    setActivePanelTab: (tab) => set({ activePanelTab: tab }),
    setSidebarOpen: (open) => set({ isSidebarOpen: open }),
    setMobileControlsOpen: (open) => set({ isMobileControlsOpen: open }),
    setLoading: (loading, message = '') =>
        set({ isLoading: loading, loadingMessage: message }),
    toggleDarkMode: () =>
        set((state) => {
            const newMode = !state.isDarkMode
            if (newMode) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
            return { isDarkMode: newMode }
        }),
}))
