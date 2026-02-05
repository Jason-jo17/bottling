import type { MaterialType } from './config'

export interface MaterialPreset {
    name: string
    color: string
    roughness: number
    metalness: number
    transmission?: number
    thickness?: number
    ior?: number
    opacity?: number
    transparent?: boolean
}

export const MATERIAL_PRESETS: Record<MaterialType, MaterialPreset> = {
    glass: {
        name: 'Glass',
        color: '#ffffff',
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.9,
        thickness: 0.5,
        ior: 1.5,
        transparent: true,
        opacity: 0.9,
    },
    plastic: {
        name: 'Plastic',
        color: '#ffffff',
        roughness: 0.3,
        metalness: 0.0,
        transparent: false,
    },
    metal: {
        name: 'Metal',
        color: '#c0c0c0',
        roughness: 0.2,
        metalness: 1.0,
        transparent: false,
    },
    matte: {
        name: 'Matte',
        color: '#ffffff',
        roughness: 0.9,
        metalness: 0.0,
        transparent: false,
    },
}
