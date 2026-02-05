import { Move3d } from 'lucide-react'
import { Button } from '../../ui/Button'

// This component needs to be inside Canvas or have access to the camera
// For now, let's make it a UI component that dispatches events or uses a global store to control camera
// Or better, we can directy manipulation if we use a global event bus or store for camera target
// NOTE: Since this is outside Canvas in the professional layout, we need a bridge.
// A simple way is to use a store that the CameraRig inside Canvas listens to.

// Let's implement a simple CameraRig inside 3D that listens to a "cameraTarget" in store?
// Or we can just put this INSIDE the Canvas as <Html> or keep it overlay and access R3F state via a bridge?
// The prompt asks for "Floating Camera Controls". A UI overlay is best.

// Let's add 'cameraView' to useUIStore or new useCameraStore.
// For simplicity, let's keep it local or just use a simple event system for now since we haven't built a robust event bus.
// Actually, let's just create the UI first.

import { useConfigStore } from '../../../stores/useConfigStore'

export function FloatingControls() {
    const setCameraTarget = useConfigStore((s) => s.setCameraTarget)

    // We'll dispatch a custom event for camera movement
    const moveCamera = (view: 'front' | 'back' | 'left' | 'right' | 'top' | 'label' | 'cap') => {
        console.log('Dispatching move-camera:', view)
        setCameraTarget(view) // Update store
        // Also dispatch event as backup/legacy if needed, but store is source of truth now
        setTimeout(() => setCameraTarget(null), 100) // Reset trigger
    }

    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-border bg-card/80 p-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/50">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => moveCamera('front')}
                className="h-8 w-8 rounded-full p-0"
                title="Front View"
            >
                <span className="font-bold text-xs">F</span>
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => moveCamera('back')}
                className="h-8 w-8 rounded-full p-0"
                title="Back View"
            >
                <span className="font-bold text-xs">B</span>
            </Button>
            <div className="h-4 w-px bg-border" />
            <Button
                variant="ghost"
                size="sm"
                onClick={() => moveCamera('left')}
                className="h-8 w-8 rounded-full p-0"
                title="Left View"
            >
                <span className="font-bold text-xs">L</span>
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => moveCamera('right')}
                className="h-8 w-8 rounded-full p-0"
                title="Right View"
            >
                <span className="font-bold text-xs">R</span>
            </Button>
            <div className="h-4 w-px bg-border" />
            <Button
                variant="ghost"
                size="sm"
                onClick={() => moveCamera('top')}
                className="h-8 w-8 rounded-full p-0"
                title="Top View"
            >
                <Move3d className="h-4 w-4" />
            </Button>
            <div className="h-4 w-px bg-border" />
            <Button
                variant="ghost"
                size="sm"
                onClick={() => moveCamera('label')}
                className="h-8 w-8 rounded-full p-0"
                title="Label View"
            >
                <span className="font-bold text-xs">Lb</span>
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => moveCamera('cap')}
                className="h-8 w-8 rounded-full p-0"
                title="Cap View"
            >
                <span className="font-bold text-xs">Cp</span>
            </Button>
        </div>
    )
}
