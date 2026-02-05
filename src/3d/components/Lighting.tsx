export function Lighting() {
    return (
        <>
            {/* Ambient light for base illumination */}
            <ambientLight intensity={0.5} />

            {/* Main directional light */}
            <directionalLight
                position={[5, 5, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />

            {/* Fill light from the side */}
            <directionalLight position={[-5, 3, -5]} intensity={0.3} />

            {/* Spot light for highlights */}
            <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} castShadow />
        </>
    )
}
