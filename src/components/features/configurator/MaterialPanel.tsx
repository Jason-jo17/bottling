import { useConfigStore } from '../../../stores/useConfigStore'
import { useHistoryStore } from '../../../stores/useHistoryStore'
import { MATERIAL_PRESETS } from '../../../types/materials'
import type { MaterialType } from '../../../types/config'
import { cn } from '../../../lib/utils'

export function MaterialPanel() {
    const bodyMaterial = useConfigStore((s) => s.bodyMaterial)
    const bodyOpacity = useConfigStore((s) => s.bodyOpacity)
    const bodyRoughness = useConfigStore((s) => s.bodyRoughness)
    const bodyMetalness = useConfigStore((s) => s.bodyMetalness)
    const setBodyMaterial = useConfigStore((s) => s.setBodyMaterial)
    const setBodyOpacity = useConfigStore((s) => s.setBodyOpacity)
    const setBodyRoughness = useConfigStore((s) => s.setBodyRoughness)
    const setBodyMetalness = useConfigStore((s) => s.setBodyMetalness)
    const getConfig = useConfigStore((s) => s.getConfig)
    const pushState = useHistoryStore((s) => s.pushState)

    const handleMaterialChange = (material: MaterialType) => {
        pushState(getConfig())
        setBodyMaterial(material)
    }

    const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBodyOpacity(parseFloat(e.target.value))
    }

    const handleRoughnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBodyRoughness(parseFloat(e.target.value))
    }

    const handleMetalnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBodyMetalness(parseFloat(e.target.value))
    }

    return (
        <div className="space-y-6 p-4">
            <div>
                <h3 className="mb-4 text-lg font-semibold">Material Type</h3>

                <div className="grid grid-cols-2 gap-3">
                    {(Object.keys(MATERIAL_PRESETS) as MaterialType[]).map((material) => (
                        <button
                            key={material}
                            onClick={() => handleMaterialChange(material)}
                            className={cn(
                                'rounded-lg border-2 p-4 text-left transition-all',
                                bodyMaterial === material
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border hover:bg-muted'
                            )}
                        >
                            <div className="font-medium capitalize">{material}</div>
                            <div className="text-xs text-muted-foreground">
                                {MATERIAL_PRESETS[material].name}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Material Properties</h3>

                {bodyMaterial === 'glass' && (
                    <div>
                        <label className="mb-2 flex items-center justify-between text-sm">
                            <span>Opacity</span>
                            <span className="font-mono text-muted-foreground">{bodyOpacity.toFixed(2)}</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={bodyOpacity}
                            onChange={handleOpacityChange}
                            className="w-full"
                        />
                    </div>
                )}

                <div>
                    <label className="mb-2 flex items-center justify-between text-sm">
                        <span>Roughness</span>
                        <span className="font-mono text-muted-foreground">{bodyRoughness.toFixed(2)}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={bodyRoughness}
                        onChange={handleRoughnessChange}
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="mb-2 flex items-center justify-between text-sm">
                        <span>Metalness</span>
                        <span className="font-mono text-muted-foreground">{bodyMetalness.toFixed(2)}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={bodyMetalness}
                        onChange={handleMetalnessChange}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    )
}
