import { useRef, useMemo } from 'react'
import { Group } from 'three'
import { useConfigStore } from '../../../stores/useConfigStore'
import { BottleLabel } from './BottleLabel'
import { getBottleGeometry, getCapGeometry, getNeckRingGeometry } from '../../utils/bottleGeometry'
import { MATERIAL_PRESETS } from '../../../types/materials'

interface BottleProps {
    position?: [number, number, number]
}

export function Bottle({ position = [0, 0, 0] }: BottleProps) {
    const groupRef = useRef<Group>(null)

    // Get config
    const model = useConfigStore((s) => s.model)
    const bodyColor = useConfigStore((s) => s.bodyColor)
    const bodyMaterial = useConfigStore((s) => s.bodyMaterial)
    const bodyOpacity = useConfigStore((s) => s.bodyOpacity)
    const bodyRoughness = useConfigStore((s) => s.bodyRoughness)
    const bodyMetalness = useConfigStore((s) => s.bodyMetalness)
    const capColor = useConfigStore((s) => s.capColor)

    // Get material config
    const materialConfig = useMemo(() => {
        const preset = MATERIAL_PRESETS[bodyMaterial]
        return {
            ...preset,
            opacity: bodyOpacity,
            roughness: bodyRoughness,
            metalness: bodyMetalness,
        }
    }, [bodyMaterial, bodyOpacity, bodyRoughness, bodyMetalness])

    // Create procedural geometry based on selected model
    const bottleGeometry = useMemo(() => {
        const geometry = getBottleGeometry(model)
        geometry.computeVertexNormals() // Ensure smooth lighting
        return geometry
    }, [model])

    const capGeometry = useMemo(() => getCapGeometry(), [])
    const neckRingGeometry = useMemo(() => getNeckRingGeometry(), [])

    // Cap position logic based on bottle type height
    const capY = useMemo(() => {
        switch (model) {
            case 'modern': return 3.15
            case 'wine': return 3.35
            case 'beer': return 2.65
            case 'spirits': return 2.75
            default: return 3.05
        }
    }, [model])

    return (
        <group ref={groupRef} position={position} dispose={null}>
            {/* Bottle Body */}
            <mesh
                geometry={bottleGeometry}
                castShadow
                receiveShadow
                position={[0, 0, 0]}
            >
                <meshPhysicalMaterial
                    color={bodyColor}
                    roughness={materialConfig.roughness}
                    metalness={materialConfig.metalness}
                    transparent={materialConfig.transparent}
                    opacity={materialConfig.opacity}
                    transmission={materialConfig.transmission}
                    thickness={materialConfig.thickness}
                    ior={materialConfig.ior}
                    envMapIntensity={1.2}
                    side={2}
                />

                {/* Label */}
                <BottleLabel />
            </mesh>

            {/* Bottle Cap */}
            <mesh geometry={capGeometry} position={[0, capY, 0]} castShadow>
                <meshStandardMaterial
                    color={capColor}
                    roughness={0.4}
                    metalness={1.0}
                    envMapIntensity={0.8}
                />
            </mesh>

            {/* Neck Ring (Lower Plate) */}
            <mesh geometry={neckRingGeometry} position={[0, capY - 0.12, 0]} castShadow>
                <meshStandardMaterial
                    color="#ffffff" // Always white as requested
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

        </group>
    )
}
