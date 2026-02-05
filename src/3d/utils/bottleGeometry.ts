import * as THREE from 'three'
import type { BottleModelType } from '../../types/config'

export function getBottleGeometry(type: BottleModelType) {
    const points: THREE.Vector2[] = []

    // Helper to add points
    const addLine = (x: number, y: number) => points.push(new THREE.Vector2(x, y))

    // Base falls at y=0 or slightly above
    // Height is roughly 0 to 2.5 or 3 units

    switch (type) {
        case 'modern':
            // Straighter, simpler
            addLine(0, 0)
            addLine(0.5, 0)
            addLine(0.5, 1.8) // Straight body
            addLine(0.15, 2.2) // Sharp shoulder
            addLine(0.15, 2.8) // Neck
            addLine(0.2, 2.85) // Lip
            addLine(0.15, 2.85) // Lip inner
            addLine(0, 2.85)
            break

        case 'wine':
            // Bordeaux style
            addLine(0, 0)
            addLine(0.4, 0)
            addLine(0.4, 1.8) // Body
            addLine(0.15, 2.4) // Rounded shoulder
            addLine(0.15, 2.9) // Neck
            addLine(0.17, 3.0) // Lip
            addLine(0, 3.0)
            break

        case 'beer':
            // Stubby
            addLine(0, 0)
            addLine(0.45, 0)
            addLine(0.45, 1.2) // Short body
            addLine(0.15, 1.8) // Long taper
            addLine(0.15, 2.4) // Neck
            addLine(0.18, 2.45) // Lip
            addLine(0, 2.45)
            break

        case 'spirits':
            // Wide shoulder, square-ish (as much as lathe can do)
            addLine(0, 0)
            addLine(0.55, 0)
            addLine(0.6, 1.5) // Tapered body up
            addLine(0.2, 1.7) // Sharp shoulder
            addLine(0.2, 2.2) // Neck
            addLine(0.25, 2.3) // Lip
            addLine(0, 2.3)
            break

        case 'path':
            // Wide body, smooth shoulder, wide neck
            // Ref: Image shows significant width, short neck
            addLine(0, 0)
            addLine(0.6, 0)
            addLine(0.6, 2.0) // Tall wide body
            addLine(0.2, 2.4) // Smooth shoulder tapers quickly
            addLine(0.2, 2.7) // Neck
            addLine(0.22, 2.75) // Lip
            addLine(0, 2.75)
            break

        case 'classic':
        default:
            // Standard bottle
            addLine(0, 0)
            addLine(0.4, 0) // Base radius
            addLine(0.4, 0.2)
            addLine(0.4, 1.5) // Body
            addLine(0.15, 2.0) // Shoulder
            addLine(0.15, 2.5) // Neck
            addLine(0.18, 2.6) // Lip
            addLine(0.14, 2.6) // Inner lip
            addLine(0, 2.6)
            break
    }

    // Close the shape? Not needed for lathe if we start at x=0

    const geometry = new THREE.LatheGeometry(points, 32)
    geometry.computeVertexNormals()
    return geometry
}

export function getCapGeometry() {
    // Simple Cylinder for cap
    return new THREE.CylinderGeometry(0.17, 0.17, 0.15, 32)
}

export function getNeckRingGeometry() {
    // Ring below cap
    return new THREE.CylinderGeometry(0.17, 0.17, 0.05, 32)
}

export function getCapPosition(type: BottleModelType): [number, number, number] {
    switch (type) {
        case 'modern': return [0, 2.85, 0] // Adjusted slightly
        case 'wine': return [0, 3.0, 0]
        case 'beer': return [0, 2.45, 0]
        case 'spirits': return [0, 2.3, 0]
        case 'path': return [0, 2.75, 0] // Path cap pos
        case 'classic':
        default: return [0, 2.6, 0]
    }
}

export function getLabelData(type: BottleModelType) {
    // Returns { position: [x,y,z], scale: [x,y,z] }
    // Z is slightly offset from radius to avoid z-fighting but stay close
    switch (type) {
        case 'modern':
            // Body radius 0.5, Height ~1.8
            return { position: [0, 1.5, 0.51], scale: [0.8, 0.8, 1] }
        case 'wine':
            // Body radius 0.4, Height ~1.8
            return { position: [0, 1.5, 0.41], scale: [0.8, 0.8, 1] }
        case 'beer':
            // Body radius 0.45, Height ~1.2. Label lower.
            return { position: [0, 1.2, 0.46], scale: [0.7, 0.7, 1] }
        case 'spirits':
            // Body Radius increases 0.55->0.6. At y=0.8 it's ~0.58
            // Using z=0.58 might clip if not careful? 
            // Spirits is tapered outwards. 
            return { position: [0, 1.3, 0.6], scale: [0.8, 0.6, 1] }
        case 'path': return { position: [0, 1.4, 0.61], scale: [0.9, 0.9, 1] } // Path label
        case 'classic':
        default:
            // Radius 0.4
            return { position: [0, 1.4, 0.41], scale: [0.8, 0.8, 1] }
    }
}
