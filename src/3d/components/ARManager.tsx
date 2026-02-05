import { useRef, useState } from 'react'
import { useXR, useXRHitTest } from '@react-three/xr'
import { Html } from '@react-three/drei'
import { Lock, Unlock, Plus, Minus, RotateCcw } from 'lucide-react'
import * as THREE from 'three'

export function ARManager({ children }: { children: React.ReactNode }) {
    const isPresenting = useXR((state) => state.mode === 'immersive-ar')
    const [isLocked, setIsLocked] = useState(false)
    const [scale, setScale] = useState(0.1) // Default small for AR
    const [rotation, setRotation] = useState(0)

    // Position state
    const bottleGroup = useRef<THREE.Group>(null)
    const reticleRef = useRef<THREE.Mesh>(null)

    const matrixHelper = useRef(new THREE.Matrix4())

    useXRHitTest((results, getWorldMatrix) => {
        if (isLocked) return

        if (results.length > 0 && reticleRef.current && bottleGroup.current) {
            // Get position from first hit
            getWorldMatrix(matrixHelper.current, results[0])

            // Apply hit matrix to reticle
            reticleRef.current.visible = true
            reticleRef.current.position.setFromMatrixPosition(matrixHelper.current)
            reticleRef.current.quaternion.setFromRotationMatrix(matrixHelper.current)

            // Also move bottle to this position automatically (preview mode)
            bottleGroup.current.position.copy(reticleRef.current.position)
        }
    }, 'viewer')

    if (!isPresenting) {
        return <>{children}</>
    }

    return (
        <>
            <group ref={bottleGroup} scale={scale} rotation={[0, rotation, 0]}>
                {children}
            </group>

            {/* Reticle - Only visible when unlocking and finding surfaces */}
            {!isLocked && (
                <mesh ref={reticleRef} rotation-x={-Math.PI / 2} visible={false}>
                    <ringGeometry args={[0.08, 0.1, 32]} />
                    <meshBasicMaterial color="white" opacity={0.8} transparent />
                </mesh>
            )}

            {/* AR Control UI Overlay */}
            <Html zIndexRange={[100, 0]} fullscreen style={{ pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '80px', alignItems: 'center' }}>
                <div style={{ pointerEvents: 'auto', display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.6)', padding: '12px', borderRadius: '24px', backdropFilter: 'blur(10px)' }}>

                    {/* Lock / Unlock */}
                    <button
                        onClick={() => setIsLocked(!isLocked)}
                        className={`p-3 rounded-full ${isLocked ? 'bg-red-500 text-white' : 'bg-green-500 text-black'}`}
                    >
                        {isLocked ? <Lock size={24} /> : <Unlock size={24} />}
                    </button>

                    {/* Scale Controls */}
                    <div className="flex items-center gap-2 bg-white/10 rounded-full px-2">
                        <button onClick={() => setScale(s => Math.max(0.01, s - 0.02))} className="p-2 text-white">
                            <Minus size={20} />
                        </button>
                        <span className="text-white font-mono text-xs w-8 text-center">{(scale * 100).toFixed(0)}%</span>
                        <button onClick={() => setScale(s => Math.min(1, s + 0.02))} className="p-2 text-white">
                            <Plus size={20} />
                        </button>
                    </div>

                    {/* Rotate */}
                    <button
                        onClick={() => setRotation(r => r + Math.PI / 4)}
                        className="p-3 bg-white/10 rounded-full text-white"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>
            </Html>
        </>
    )
}
