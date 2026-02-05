import { Undo, Redo, Download, Moon, Sun } from 'lucide-react'
import { Button } from '../ui/Button'
import { useHistoryStore } from '../../stores/useHistoryStore'
import { useUIStore } from '../../stores/useUIStore'

export function Header() {
    const { undo, redo, canUndo, canRedo } = useHistoryStore()
    const isDarkMode = useUIStore((s) => s.isDarkMode)
    const toggleDarkMode = useUIStore((s) => s.toggleDarkMode)
    const setExportModalOpen = useUIStore((s) => s.setExportModalOpen)

    return (
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-black uppercase tracking-tight text-foreground leading-none">
                            Bottle<span className="text-secondary">Coating</span>
                        </h1>
                        <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase mt-0.5">
                            UV-Protective Powder Coating
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* History Controls */}
                <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={undo}
                        disabled={!canUndo}
                        title="Undo (Ctrl+Z)"
                        className="h-8 w-8 p-0"
                    >
                        <Undo className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={redo}
                        disabled={!canRedo}
                        title="Redo (Ctrl+Y)"
                        className="h-8 w-8 p-0"
                    >
                        <Redo className="h-4 w-4" />
                    </Button>
                </div>

                {/* Export Button */}
                <Button
                    variant="primary"
                    onClick={() => setExportModalOpen(true)}
                    className="gap-2 shadow-md"
                >
                    <Download className="h-4 w-4" />
                    Export
                </Button>

                {/* Theme Toggle */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleDarkMode}
                    title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    className="h-9 w-9 p-0"
                >
                    {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
            </div>
        </header>
    )
}
