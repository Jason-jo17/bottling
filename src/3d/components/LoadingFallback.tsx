import { Html, useProgress } from '@react-three/drei'

export function LoadingFallback() {
    const { progress, active } = useProgress()

    if (!active && progress === 100) return null

    return (
        <Html center>
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
                    <div
                        className="h-full bg-primary transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                    Loading {progress.toFixed(0)}%
                </span>
            </div>
        </Html>
    )
}
