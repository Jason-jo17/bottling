import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

export function CameraRig() {
    const { camera } = useThree()

    useEffect(() => {
        const handleMoveCamera = (e: Event) => {
            const view = (e as CustomEvent).detail

            let targetPos = new THREE.Vector3(0, 2, 5)

            switch (view) {
                case 'front': targetPos.set(0, 2, 5); break;
                case 'back': targetPos.set(0, 2, -5); break;
                case 'left': targetPos.set(-5, 2, 0); break;
                case 'right': targetPos.set(5, 2, 0); break;
                case 'top': targetPos.set(0, 8, 0); break;
            }

            // Animate Camera Position
            (gsap as any).to(camera.position, {
                x: targetPos.x,
                y: targetPos.y,
                z: targetPos.z,
                duration: 1.5,
                ease: 'power2.inOut',
                onUpdate: () => {
                    // controls.current.update() // Update controls if needed
                }
            })
        }

        window.addEventListener('move-camera', handleMoveCamera)
        return () => window.removeEventListener('move-camera', handleMoveCamera)
    }, [camera])

    return null
}
