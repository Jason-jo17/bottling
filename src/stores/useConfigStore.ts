import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import type {
    BottleConfig,
    BottleModelType,
    MaterialType,
    CapMaterialType,
    EnvironmentPreset,
    LabelItem,
} from '../types/config'

const DEFAULT_CONFIG: BottleConfig = {
    model: 'classic',
    bodyColor: '#60A5FA',
    bodyMaterial: 'metal',
    bodyOpacity: 0.9,
    bodyRoughness: 0.05,
    bodyMetalness: 0.1,
    capColor: '#374151',
    capMaterial: 'metal',
    labels: [],
    environment: 'studio',
    sceneBackgroundColor: '#ffffff',
    cameraTarget: null,
    name: 'My Design',
    createdAt: new Date().toISOString(),
}

interface ConfigStore extends BottleConfig {
    // Actions
    setModel: (model: BottleModelType) => void
    setBodyColor: (color: string) => void
    setBodyMaterial: (material: MaterialType) => void
    setBodyOpacity: (opacity: number) => void
    setBodyRoughness: (roughness: number) => void
    setBodyMetalness: (metalness: number) => void
    setCapColor: (color: string) => void
    setCapMaterial: (material: CapMaterialType) => void

    // Label Actions
    addLabel: (label: Omit<LabelItem, 'id'>) => void
    updateLabel: (id: string, updates: Partial<LabelItem>) => void
    removeLabel: (id: string) => void

    setEnvironment: (env: EnvironmentPreset) => void
    setSceneBackgroundColor: (color: string) => void
    setCameraTarget: (target: string | null) => void // New Action
    resetConfig: () => void
    loadConfig: (config: Partial<BottleConfig>) => void

    // Non-reactive getters for useFrame
    getConfig: () => BottleConfig
}

export const useConfigStore = create<ConfigStore>()(
    subscribeWithSelector(
        persist(
            (set, get) => ({
                ...DEFAULT_CONFIG,
                cameraTarget: null, // Init

                setModel: (model) => set({ model }),
                setBodyColor: (color) => set({ bodyColor: color }),
                setBodyMaterial: (material) => set({ bodyMaterial: material }),
                setBodyOpacity: (opacity) => set({ bodyOpacity: opacity }),
                setBodyRoughness: (roughness) => set({ bodyRoughness: roughness }),
                setBodyMetalness: (metalness) => set({ bodyMetalness: metalness }),
                setCapColor: (color) => set({ capColor: color }),
                setCapMaterial: (material) => set({ capMaterial: material }),

                addLabel: (label) =>
                    set((state) => ({
                        labels: [...state.labels, { ...label, id: nanoid() }],
                    })),

                updateLabel: (id, updates) =>
                    set((state) => ({
                        labels: state.labels.map((l) => (l.id === id ? { ...l, ...updates } : l)),
                    })),

                removeLabel: (id) =>
                    set((state) => ({
                        labels: state.labels.filter((l) => l.id !== id),
                    })),

                setEnvironment: (env) => set({ environment: env }),
                setSceneBackgroundColor: (color) => set({ sceneBackgroundColor: color }),
                setCameraTarget: (target) => set({ cameraTarget: target }),

                resetConfig: () => set(DEFAULT_CONFIG),

                loadConfig: (config) => set((state) => ({ ...state, ...config })),

                // Non-reactive access for useFrame
                getConfig: () => {
                    const state = get()
                    return {
                        model: state.model,
                        bodyColor: state.bodyColor,
                        bodyMaterial: state.bodyMaterial,
                        bodyOpacity: state.bodyOpacity,
                        bodyRoughness: state.bodyRoughness,
                        bodyMetalness: state.bodyMetalness,
                        capColor: state.capColor,
                        capMaterial: state.capMaterial,
                        labels: state.labels,
                        environment: state.environment,
                        sceneBackgroundColor: state.sceneBackgroundColor,
                        cameraTarget: state.cameraTarget,
                    }
                },
            }),
            {
                name: 'bottle-config',
                partialize: (state) => ({
                    model: state.model,
                    bodyColor: state.bodyColor,
                    bodyMaterial: state.bodyMaterial,
                    bodyOpacity: state.bodyOpacity,
                    bodyRoughness: state.bodyRoughness,
                    bodyMetalness: state.bodyMetalness,
                    capColor: state.capColor,
                    capMaterial: state.capMaterial,
                    labels: state.labels,
                    environment: state.environment,
                    sceneBackgroundColor: state.sceneBackgroundColor,
                    // Do not persist cameraTarget
                }),
                version: 4, // Increment
            }
        )
    )
)
