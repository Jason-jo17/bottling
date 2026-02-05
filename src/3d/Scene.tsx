import { useRef, useEffect } from 'react'
import { Environment, Center, CameraControls } from '@react-three/drei'
import { Bottle } from './components/Bottle/Bottle'
import { Lighting } from './components/Lighting'
import { Suspense } from 'react'
import { useConfigStore } from '../stores/useConfigStore'

export function Scene() {
    const environment = useConfigStore((s) => s.environment)
    const sceneBackgroundColor = useConfigStore((s) => s.sceneBackgroundColor) || '#ffffff'
    const controlsRef = useRef<CameraControls>(null)

    useEffect(() => {
        // Subscribe to store changes for cameraTarget
        const unsub = useConfigStore.subscribe(
            (state) => state.cameraTarget,
            (target) => {
                if (!target || !controlsRef.current) return

                const controls = controlsRef.current
                console.log('Moving camera to:', target)

                switch (target) {
                    case 'front':
                        controls.setLookAt(0, 2, 8, 0, 2, 0, true)
                        break
                    case 'back':
                        controls.setLookAt(0, 2, -8, 0, 2, 0, true)
                        break
                    case 'left':
                        controls.setLookAt(-8, 2, 0, 0, 2, 0, true)
                        break
                    case 'right':
                        controls.setLookAt(8, 2, 0, 0, 2, 0, true)
                        break
                    case 'top':
                        controls.setLookAt(0, 10, 0, 0, 0, 0, true)
                        break
                    case 'label':
                        controls.setLookAt(0, 3, 4, 0, 3, 0, true)
                        break
                    case 'cap':
                        controls.setLookAt(0, 3.5, 3, 0, 3.0, 0, true)
                        break
                }
            }
        )
        return () => unsub()
    }, [])

    return (
        <Suspense fallback={null}>
            <color attach="background" args={[sceneBackgroundColor]} />
            <Environment preset={environment} background={false} />
            <Lighting />

            <Center>
                <Bottle />
            </Center>

            <CameraControls
                ref={controlsRef}
                makeDefault
                dollyToCursor={true}
                minDistance={1}
                maxDistance={25}
                smoothTime={0.25}
            />
        </Suspense>
    )
}
