import { Canvas as R3FCanvas } from '@react-three/fiber'
import { PerformanceMonitor, Html } from '@react-three/drei'
import { Suspense, useState, Component, type ErrorInfo, type ReactNode } from 'react'
import { Scene } from './Scene'
import { LoadingFallback } from './components/LoadingFallback'
import { XR } from '@react-three/xr'
import { xrStore } from '../stores/xrStore'

interface CanvasProps {
    className?: string
}

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
                    alpha: true, // Needed for transparent background in AR
                    preserveDrawingBuffer: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                }}
                shadows
            >
                <XR store={xrStore}>
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
                </XR>
            </R3FCanvas>
        </div>
    )
}
