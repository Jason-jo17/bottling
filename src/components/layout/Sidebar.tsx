import { Palette, Sparkles, Type, Wine } from 'lucide-react'
import { useUIStore } from '../../stores/useUIStore'
import { ColorPanel } from '../features/configurator/ColorPanel'
import { MaterialPanel } from '../features/configurator/MaterialPanel'
import { LabelEditor } from '../features/configurator/LabelEditor'
import { BottleSelector } from '../features/configurator/BottleSelector'
import { cn } from '../../lib/utils'

const TABS = [
    { id: 'model' as const, label: 'Model', icon: Wine },
    { id: 'color' as const, label: 'Colors', icon: Palette },
    { id: 'material' as const, label: 'Material', icon: Sparkles },
    { id: 'label' as const, label: 'Label', icon: Type },
]

export function Sidebar() {
    const activePanelTab = useUIStore((s) => s.activePanelTab)
    const setActivePanelTab = useUIStore((s) => s.setActivePanelTab)

    return (
        <aside className="flex h-full w-[360px] flex-col border-r border-border bg-card shadow-xl z-sidebar">
            {/* Navigation Tabs */}
            <div className="grid grid-cols-4 border-b border-border bg-muted/30">
                {TABS.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activePanelTab === tab.id

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActivePanelTab(tab.id)}
                            className={cn(
                                'group flex flex-col items-center justify-center gap-1.5 py-4 transition-all',
                                'border-b-2 hover:bg-muted',
                                isActive
                                    ? 'border-secondary bg-background text-secondary shadow-sm'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            <div className={cn(
                                "rounded-md p-1.5 transition-colors",
                                isActive ? "bg-secondary/10" : "group-hover:bg-background"
                            )}>
                                <Icon className={cn("h-5 w-5", isActive && "text-secondary")} />
                            </div>
                            <span className="text-[11px] font-medium tracking-wide uppercase">{tab.label}</span>
                        </button>
                    )
                })}
            </div>

            {/* Panel Content - improved padding and visuals */}
            <div className="flex-1 overflow-y-auto bg-card/50">
                <div className="h-full">
                    {activePanelTab === 'model' && (
                        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                            <BottleSelector />
                        </div>
                    )}
                    {activePanelTab === 'color' && (
                        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                            <ColorPanel />
                        </div>
                    )}
                    {activePanelTab === 'material' && (
                        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                            <MaterialPanel />
                        </div>
                    )}
                    {activePanelTab === 'label' && (
                        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                            <LabelEditor />
                        </div>
                    )}
                </div>
            </div>
        </aside>
    )
}
