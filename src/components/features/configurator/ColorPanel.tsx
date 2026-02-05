import { ColorPicker } from '../../ui/ColorPicker'
import { useConfigStore } from '../../../stores/useConfigStore'
import { useHistoryStore } from '../../../stores/useHistoryStore'

export function ColorPanel() {
    const bodyColor = useConfigStore((s) => s.bodyColor)
    const capColor = useConfigStore((s) => s.capColor)
    const setBodyColor = useConfigStore((s) => s.setBodyColor)
    const setCapColor = useConfigStore((s) => s.setCapColor)
    const getConfig = useConfigStore((s) => s.getConfig)
    const pushState = useHistoryStore((s) => s.pushState)

    const handleBodyColorChange = (color: string) => {
        pushState(getConfig())
        setBodyColor(color)
    }

    const handleCapColorChange = (color: string) => {
        pushState(getConfig())
        setCapColor(color)
    }

    return (
        <div className="space-y-6 p-1">
            <div className="space-y-1">
                <h3 className="text-sm font-medium leading-none text-muted-foreground uppercase tracking-wider">Colors</h3>
                <p className="text-xs text-muted-foreground">Customize the base materials of your bottle.</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-3 rounded-xl border border-border bg-card/50 p-4 shadow-sm transition-all hover:bg-card hover:shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-primary/50" />
                        <span className="text-sm font-semibold">Body</span>
                    </div>
                    <ColorPicker
                        label="Body Color"
                        value={bodyColor}
                        onChange={handleBodyColorChange}
                        id="body-color"
                        hideLabel
                    />
                </div>

                <div className="space-y-3 rounded-xl border border-border bg-card/50 p-4 shadow-sm transition-all hover:bg-card hover:shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-primary/50" />
                        <span className="text-sm font-semibold">Cap</span>
                    </div>
                    <ColorPicker
                        label="Cap Color"
                        value={capColor}
                        onChange={handleCapColorChange}
                        id="cap-color"
                        hideLabel
                    />
                </div>

                <div className="space-y-3 rounded-xl border border-border bg-card/50 p-4 shadow-sm transition-all hover:bg-card hover:shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-primary/50" />
                        <span className="text-sm font-semibold">Scene Background</span>
                    </div>
                    <ColorPicker
                        label="Scene Background"
                        value={useConfigStore((s) => s.sceneBackgroundColor) || '#ffffff'}
                        onChange={(color) => useConfigStore.getState().setSceneBackgroundColor(color)}
                        id="scene-bg-color"
                        hideLabel
                    />
                </div>
            </div>
        </div>
    )
}
