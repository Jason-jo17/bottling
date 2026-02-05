import { useState } from 'react'
import { X, Download, Image as ImageIcon } from 'lucide-react'
import { Button } from '../../ui/Button'
import { useUIStore } from '../../../stores/useUIStore'
import { useExportStore } from '../../../stores/useExportStore'
import { cn } from '../../../lib/utils'
import { toast } from 'sonner'

export function ExportModal() {
    const isOpen = useUIStore((s) => s.isExportModalOpen)
    const setOpen = useUIStore((s) => s.setExportModalOpen)
    const format = useExportStore((s) => s.format)
    const resolution = useExportStore((s) => s.resolution)
    const setFormat = useExportStore((s) => s.setFormat)
    const setResolution = useExportStore((s) => s.setResolution)

    const [isExporting, setIsExporting] = useState(false)

    const handleExport = async () => {
        setIsExporting(true)

        try {
            // Simulate export
            await new Promise((resolve) => setTimeout(resolve, 1000))

            if (format === 'png') {
                toast.success(`PNG export (${resolution}x${resolution}) - Coming soon!`)
            } else if (format === 'glb') {
                toast.info('GLB export coming soon!')
            } else if (format === 'usdz') {
                toast.info('USDZ export coming soon!')
            }
        } catch (error) {
            toast.error('Export failed. Please try again.')
            console.error('Export error:', error)
        } finally {
            setIsExporting(false)
            setOpen(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-card p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Export Design</h2>
                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-lg p-2 hover:bg-muted"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Format Selection */}
                    <div>
                        <label className="mb-3 block text-sm font-medium">Export Format</label>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={() => setFormat('png')}
                                className={cn(
                                    'flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all',
                                    format === 'png'
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border hover:bg-muted'
                                )}
                            >
                                <ImageIcon className="h-6 w-6" />
                                <span className="text-sm font-medium">PNG</span>
                                <span className="text-xs text-muted-foreground">Image</span>
                            </button>

                            <button
                                onClick={() => setFormat('glb')}
                                className={cn(
                                    'flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all',
                                    format === 'glb'
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border hover:bg-muted'
                                )}
                            >
                                <Download className="h-6 w-6" />
                                <span className="text-sm font-medium">GLB</span>
                                <span className="text-xs text-muted-foreground">3D Model</span>
                            </button>

                            <button
                                onClick={() => setFormat('usdz')}
                                className={cn(
                                    'flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all',
                                    format === 'usdz'
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border hover:bg-muted'
                                )}
                            >
                                <Download className="h-6 w-6" />
                                <span className="text-sm font-medium">USDZ</span>
                                <span className="text-xs text-muted-foreground">iOS AR</span>
                            </button>
                        </div>
                    </div>

                    {/* Resolution Selection (PNG only) */}
                    {format === 'png' && (
                        <div>
                            <label className="mb-3 block text-sm font-medium">
                                Resolution: {resolution}×{resolution}
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {[1024, 2048, 4096].map((res) => (
                                    <button
                                        key={res}
                                        onClick={() => setResolution(res)}
                                        className={cn(
                                            'rounded-lg border-2 p-3 text-sm font-medium transition-all',
                                            resolution === res
                                                ? 'border-primary bg-primary/10'
                                                : 'border-border hover:bg-muted'
                                        )}
                                    >
                                        {res}px
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Export Button */}
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleExport}
                            isLoading={isExporting}
                            className="flex-1"
                        >
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
