import { create } from 'zustand'

export type ExportFormat = 'png' | 'glb' | 'usdz'

interface ExportStore {
    format: ExportFormat
    resolution: number
    isExporting: boolean
    exportProgress: number

    setFormat: (format: ExportFormat) => void
    setResolution: (resolution: number) => void
    setExporting: (exporting: boolean) => void
    setExportProgress: (progress: number) => void
}

export const useExportStore = create<ExportStore>((set) => ({
    format: 'png',
    resolution: 2048,
    isExporting: false,
    exportProgress: 0,

    setFormat: (format) => set({ format }),
    setResolution: (resolution) => set({ resolution }),
    setExporting: (exporting) => set({ isExporting: exporting }),
    setExportProgress: (progress) => set({ exportProgress: progress }),
}))
