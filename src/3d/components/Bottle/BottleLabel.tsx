import { Decal, RenderTexture, Text } from '@react-three/drei'
import { useConfigStore } from '../../../stores/useConfigStore'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { Suspense } from 'react'

function ImageDecal({ content, position, scale, rotation }: any) {
    const texture = useLoader(TextureLoader, content)
    return (
        <Decal
            position={position}
            rotation={rotation}
            scale={scale}
        >
            <meshStandardMaterial
                transparent
                polygonOffset
                polygonOffsetFactor={-1}
            >
                <primitive attach="map" object={texture} />
            </meshStandardMaterial>
        </Decal>
    )
}

import { FrontSide } from 'three'

// Helper to get material props
function getMaterialProps(type: string | undefined, bottleProps: any) {
    switch (type) {
        case 'glossy': return { roughness: 0.2, metalness: 0.1 }
        case 'matte': return { roughness: 0.8, metalness: 0 }
        case 'metal': return { roughness: 0.2, metalness: 1 }
        case 'match-bottle': return { roughness: bottleProps?.roughness || 0.2, metalness: bottleProps?.metalness || 0 }
        default: return { roughness: 0.2, metalness: 0 } // Default glossy-ish
    }
}

function TextDecal({ content, position, scale, rotation, color, backgroundColor = 'transparent', fontSize = 2, materialType, bottleProps }: any) {
    // Reduce Z depth to absolute minimum to prevent mirroring (punch-through)
    const decalScale: [number, number, number] = [scale[0], scale[1], 0.2]

    // Handle transparent background explicitly
    const hasBackground = backgroundColor && backgroundColor !== 'transparent' && backgroundColor !== 'none'

    // Get material properties
    const { roughness, metalness } = getMaterialProps(materialType, bottleProps)

    return (
        <Decal
            position={position}
            rotation={rotation}
            scale={decalScale}
        >
            <meshStandardMaterial
                transparent
                polygonOffset
                polygonOffsetFactor={-5} // Stronger offset to prevent Z-fighting
                depthTest={true}
                depthWrite={false}
                side={FrontSide}
                roughness={roughness}
                metalness={metalness}
            >
                <RenderTexture attach="map">
                    <ambientLight intensity={2} />
                    {hasBackground && (
                        <color attach="background" args={[backgroundColor]} />
                    )}
                    <Text
                        fontSize={fontSize}
                        color={color}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {content}
                    </Text>
                </RenderTexture>
            </meshStandardMaterial>
        </Decal>
    )
}

export function BottleLabel() {
    const labels = useConfigStore((s) => s.labels)
    const bodyRoughness = useConfigStore((s) => s.bodyRoughness)
    const bodyMetalness = useConfigStore((s) => s.bodyMetalness)

    const bottleProps = { roughness: bodyRoughness, metalness: bodyMetalness }

    return (
        <>
            {labels.map((label) => (
                <Suspense key={label.id} fallback={null}>
                    {label.type === 'image' ? (
                        <ImageDecal
                            content={label.content}
                            position={label.position}
                            scale={label.scale}
                            rotation={label.rotation}
                        />
                    ) : (
                        <TextDecal
                            content={label.content}
                            position={label.position}
                            scale={label.scale} // Text scale might need adjustment
                            rotation={label.rotation}
                            color={label.color}
                            backgroundColor={label.backgroundColor}
                            font={label.font}
                            fontSize={label.fontSize}
                            materialType={label.materialType}
                            bottleProps={bottleProps}
                        />
                    )}
                </Suspense>
            ))}
        </>
    )
}
