import { useConfigStore } from '../../../stores/useConfigStore'
import { useHistoryStore } from '../../../stores/useHistoryStore'
import type { BottleModelType } from '../../../types/config'
import { cn } from '../../../lib/utils'
import { Wine } from 'lucide-react'

const BOTTLE_TYPES: Array<{ id: BottleModelType; name: string; description?: string; icon?: string }> = [
    { id: 'path', name: 'Path', icon: 'M 9 22 L 9 8 L 7 5 L 7 2 L 17 2 L 17 5 L 15 8 L 15 22 Z' }, // Simple SVG path approximation
    { id: 'classic', name: 'Classic', icon: 'M9 22h6v-14l-2-3V2h-2v3l-2 3v14z' },
    { id: 'modern', name: 'Modern', description: 'Contemporary design' },
    { id: 'wine', name: 'Wine', description: 'Wine bottle style' },
    { id: 'beer', name: 'Beer', description: 'Beer bottle style' },
    { id: 'spirits', name: 'Spirits', description: 'Spirits bottle style' },
]

export function BottleSelector() {
    const model = useConfigStore((s) => s.model)
    const setModel = useConfigStore((s) => s.setModel)
    const getConfig = useConfigStore((s) => s.getConfig)
    const pushState = useHistoryStore((s) => s.pushState)

    const handleModelChange = (newModel: BottleModelType) => {
        pushState(getConfig())
        setModel(newModel)
    }

    return (
        <div className="space-y-4 p-4">
            <h3 className="text-lg font-semibold">Bottle Model</h3>

            <div className="grid grid-cols-2 gap-3">
                {BOTTLE_TYPES.map((bottle) => (
                    <button
                        key={bottle.id}
                        onClick={() => handleModelChange(bottle.id)}
                        className={cn(
                            'flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-left transition-all',
                            model === bottle.id
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:bg-muted'
                        )}
                    >
                        <Wine className="h-8 w-8" />
                        <div>
                            <div className="font-medium">{bottle.name}</div>
                            <div className="text-xs text-muted-foreground">{bottle.description}</div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                <strong>Note:</strong> Currently using placeholder cylinder geometry. Actual bottle models
                coming soon!
            </div>
        </div>
    )
}
