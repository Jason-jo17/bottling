import { useThree } from '@react-three/fiber'
import { useCallback } from 'react'

export function useScreenshot() {
    const { gl, scene, camera } = useThree()

    const captureScreenshot = useCallback(
        (filename = 'bottle-design.png', width = 2048, height = 2048) => {
            return new Promise<void>((resolve) => {
                // Store original size
                const originalWidth = gl.domElement.width
                const originalHeight = gl.domElement.height

                // Set high resolution
                gl.setSize(width, height, false)

                // Render one frame
                gl.render(scene, camera)

                // Convert to blob
                gl.domElement.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob)
                        const link = document.createElement('a')
                        link.href = url
                        link.download = filename
                        link.click()
                        URL.revokeObjectURL(url)
                    }

                    // Restore original size
                    gl.setSize(originalWidth, originalHeight, false)
                    gl.render(scene, camera)

                    resolve()
                }, 'image/png')
            })
        },
        [gl, scene, camera]
    )

    return { captureScreenshot }
}
