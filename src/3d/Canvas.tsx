import { Canvas as R3FCanvas } from '@react-three/fiber'
import { Preload, PerformanceMonitor } from '@react-three/drei'
import { Suspense, useState } from 'react'
import { Scene } from './Scene'
import { LoadingFallback } from './components/LoadingFallback'

interface CanvasProps {
    className?: string
}

import React, { Component, ErrorInfo, ReactNode } from 'react'

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
    constructor(props: { children: ReactNode }) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('3D Error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <group>
                    <mesh>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="red" />
                    </mesh>
                    <Html>
                        <div style={{ color: 'red', background: 'white', padding: '10px', borderRadius: '5px' }}>
                            Error: {this.state.error?.message}
                        </div>
                    </Html>
                </group>
            )
        }

        return this.props.children
    }
}

import { Html } from '@react-three/drei'

export function Canvas({ className }: CanvasProps) {
    const [dpr, setDpr] = useState(1.5)

    return (
        <div className={className} style={{ width: '100%', height: '100%', position: 'relative', background: '#ffffff' }}>
            <R3FCanvas
                camera={{
                    position: [0, 2, 5],
                    fov: 45,
                    near: 0.1,
                    far: 1000,
                }}
                dpr={dpr}
                gl={{
                    antialias: true,
                    alpha: false,
                    preserveDrawingBuffer: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                }}
                shadows
            >
                <PerformanceMonitor
                    onIncline={() => setDpr(Math.min(2, dpr + 0.5))}
                    onDecline={() => setDpr(Math.max(1, dpr - 0.5))}
                >
                    <ErrorBoundary>
                        <Suspense fallback={<LoadingFallback />}>
                            <Scene />
                        </Suspense>
                    </ErrorBoundary>
                </PerformanceMonitor>
            </R3FCanvas>
        </div>
    )
}
