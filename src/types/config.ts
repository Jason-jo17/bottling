export type BottleModelType = 'classic' | 'modern' | 'wine' | 'beer' | 'spirits' | 'path'
export type MaterialType = 'glass' | 'plastic' | 'metal' | 'matte'
export type CapMaterialType = 'plastic' | 'metal' | 'wood'
export type EnvironmentPreset = 'studio' | 'sunset' | 'warehouse' | 'forest'

export interface LabelItem {
    id: string
    type: 'text' | 'image'
    content: string // text content or image URL
    position: [number, number, number]
    rotation: [number, number, number]
    scale: [number, number, number]
    color?: string
    backgroundColor?: string // New property
    font?: string
    fontSize?: number
    materialType?: 'match-bottle' | 'glossy' | 'matte' | 'metal'
}

export interface BottleConfig {
    // Model
    model: BottleModelType

    // Body
    bodyColor: string
    bodyMaterial: MaterialType
    bodyOpacity: number
    bodyRoughness: number
    bodyMetalness: number

    // Cap
    capColor: string
    capMaterial: CapMaterialType

    // Labels
    labels: LabelItem[]

    // Environment
    environment: EnvironmentPreset
    sceneBackgroundColor?: string

    // Camera
    cameraTarget: string | null // 'front' | 'back' | etc.

    // Metadata
    name?: string
    description?: string
    createdAt?: string
    updatedAt?: string
}

export interface PresetConfig extends Partial<BottleConfig> {
    id: string
    name: string
    thumbnail: string
    category: 'modern' | 'classic' | 'minimal' | 'luxury'
}
