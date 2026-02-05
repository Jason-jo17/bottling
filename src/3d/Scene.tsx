import { useRef, useEffect } from 'react'
import { Environment, Center, CameraControls } from '@react-three/drei'
import { Bottle } from './components/Bottle/Bottle'
import { Lighting } from './components/Lighting'
import { Suspense } from 'react'
import { useConfigStore } from '../stores/useConfigStore'

import { useXR } from '@react-three/xr'

export function Scene() {
    const environment = useConfigStore((s) => s.environment)
    const sceneBackgroundColor = useConfigStore((s) => s.sceneBackgroundColor) || '#ffffff'
    const controlsRef = useRef<CameraControls>(null)
    const isPresenting = useXR((state) => state.mode === 'immersive-ar')

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
            {!isPresenting && <color attach="background" args={[sceneBackgroundColor]} />}
            <Environment preset={environment} background={false} />
            <Lighting />

            {/* In AR, scale down to realistic size (approx 30cm) and possibly lower to floor */}
            <Center top={!isPresenting}>
                <group scale={isPresenting ? 0.1 : 1}>
                    <Bottle />
                </group>
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
