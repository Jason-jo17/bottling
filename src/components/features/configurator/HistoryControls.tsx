import { Undo2, Redo2 } from 'lucide-react'
import { Button } from '../../ui/Button'
import { useHistoryStore } from '../../../stores/useHistoryStore'

export function HistoryControls() {
    const canUndo = useHistoryStore((s) => s.canUndo)
    const canRedo = useHistoryStore((s) => s.canRedo)
    const undo = useHistoryStore((s) => s.undo)
    const redo = useHistoryStore((s) => s.redo)

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={!canUndo}
                aria-label="Undo"
                title="Undo (Ctrl+Z)"
            >
                <Undo2 className="h-4 w-4" />
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={!canRedo}
                aria-label="Redo"
                title="Redo (Ctrl+Y)"
            >
                <Redo2 className="h-4 w-4" />
            </Button>
        </div>
    )
}
