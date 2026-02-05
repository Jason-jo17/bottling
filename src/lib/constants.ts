export const APP_NAME = 'Bottle Customizer Pro'
export const APP_DESCRIPTION = 'Create and customize your perfect bottle design in 3D'

export const MAX_HISTORY_STEPS = 50
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

export const DEFAULT_CAMERA_POSITION: [number, number, number] = [0, 2, 5]
export const DEFAULT_CAMERA_FOV = 45

export const MODEL_PATHS = {
    classic: '/models/bottle-classic.glb',
    modern: '/models/bottle-modern.glb',
    wine: '/models/bottle-wine.glb',
    beer: '/models/bottle-beer.glb',
    spirits: '/models/bottle-spirits.glb',
} as const

export const USDZ_PATHS = {
    classic: '/models/bottle-classic.usdz',
    modern: '/models/bottle-modern.usdz',
    wine: '/models/bottle-wine.usdz',
    beer: '/models/bottle-beer.usdz',
    spirits: '/models/bottle-spirits.usdz',
} as const

export const ENVIRONMENT_PRESETS = {
    studio: 'studio',
    sunset: 'sunset',
    warehouse: 'warehouse',
    forest: 'forest',
} as const

export const KEYBOARD_SHORTCUTS = {
    UNDO: 'ctrl+z',
    REDO: 'ctrl+y',
    EXPORT: 'ctrl+e',
    RESET: 'ctrl+r',
} as const
