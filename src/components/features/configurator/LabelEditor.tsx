import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Type, Image as ImageIcon, Trash2 } from 'lucide-react'
import { ColorPicker } from '../../ui/ColorPicker'
import { Button } from '../../ui/Button'
import { useConfigStore } from '../../../stores/useConfigStore'
import { MAX_IMAGE_SIZE, ACCEPTED_IMAGE_TYPES } from '../../../lib/constants'
import { getLabelData } from '../../../3d/utils/bottleGeometry'

export function LabelEditor() {
    const labels = useConfigStore((s) => s.labels)
    const addLabel = useConfigStore((s) => s.addLabel)
    const updateLabel = useConfigStore((s) => s.updateLabel)
    const removeLabel = useConfigStore((s) => s.removeLabel)
    const model = useConfigStore((s) => s.model)

    const [expandedId, setExpandedId] = useState<string | null>(null)

    const handleAddText = () => {
        const { position, scale } = getLabelData(model)
        addLabel({
            type: 'text',
            content: 'New Label',
            // Use the correct radius (Z) but start at default Y. 
            // Rotation 0 means front. scale is default.
            position: position as [number, number, number],
            rotation: [0, 0, 0],
            // Start with a Wide aspect ratio for text (Landscape)
            scale: [1.2, 0.6, 1], // Wide width, shorter height
            color: '#000000',
            // font: 'Inter', // Causing errors
            fontSize: 72
        })
    }

    const handleAddImage = (imageContent: string) => {
        const { position, scale } = getLabelData(model)
        addLabel({
            type: 'image',
            content: imageContent,
            position: position as [number, number, number],
            rotation: [0, 0, 0],
            scale: scale as [number, number, number],
        })
    }

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0]
            if (!file) return
            if (file.size > MAX_IMAGE_SIZE) {
                alert('Image size must be less than 5MB')
                return
            }
            const reader = new FileReader()
            reader.onload = () => {
                handleAddImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        },
        [model]
    )

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: ACCEPTED_IMAGE_TYPES.reduce((acc: Record<string, string[]>, type: string) => ({ ...acc, [type]: [] }), {}),
        maxFiles: 1,
    })

    return (
        <div className="space-y-6 p-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Labels</h3>
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleAddText} title="Add Text Label">
                        <Type className="h-4 w-4" />
                    </Button>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Button size="sm" variant="outline" title="Add Image Label">
                            <ImageIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {labels.length === 0 && (
                    <div className="text-center text-sm text-muted-foreground py-4 border-2 border-dashed rounded-lg">
                        No labels added
                    </div>
                )}

                {labels.map((label) => (
                    <div key={label.id} className="border rounded-lg overflow-hidden bg-background">
                        <div
                            className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50"
                            onClick={() => setExpandedId(expandedId === label.id ? null : label.id)}
                        >
                            <div className="flex items-center gap-3">
                                {label.type === 'text' ? <Type className="h-4 w-4 text-muted-foreground" /> : <ImageIcon className="h-4 w-4 text-muted-foreground" />}
                                <span className="text-sm font-medium truncate w-32">
                                    {label.type === 'text' ? label.content : 'Image Label'}
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    removeLabel(label.id)
                                }}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        {expandedId === label.id && (
                            <div className="p-3 border-t bg-muted/10 space-y-4">
                                {label.type === 'text' && (
                                    <>
                                        <div>
                                            <label className="text-xs font-medium mb-1 block">Text</label>
                                            <input
                                                type="text"
                                                value={label.content}
                                                onChange={(e) => updateLabel(label.id, { content: e.target.value })}
                                                className="w-full text-sm p-2 rounded border bg-background"
                                            />
                                        </div>
                                        <ColorPicker
                                            label="Color"
                                            value={label.color || '#000000'}
                                            onChange={(color) => updateLabel(label.id, { color })}
                                            id={`color-${label.id}`}
                                        />
                                        <ColorPicker
                                            label="Background Color"
                                            value={label.backgroundColor || 'transparent'}
                                            onChange={(color) => {
                                                console.log('Updating BG Color:', color)
                                                updateLabel(label.id, { backgroundColor: color })
                                            }}
                                            id={`bgcolor-${label.id}`}
                                        />
                                        <div>
                                            <label className="text-xs font-medium mb-1 block">Label Finish</label>
                                            <select
                                                value={label.materialType || 'glossy'}
                                                onChange={(e) => updateLabel(label.id, { materialType: e.target.value as any })}
                                                className="w-full text-sm p-2 rounded border bg-background"
                                            >
                                                <option value="glossy">Glossy (Default)</option>
                                                <option value="matte">Matte</option>
                                                <option value="metal">Metallic</option>
                                                <option value="match-bottle">Match Bottle</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium mb-1 block">Font Size</label>
                                            <input
                                                type="range"
                                                min="0.5"
                                                max="5"
                                                step="0.1"
                                                value={label.fontSize || 2}
                                                onChange={(e) => updateLabel(label.id, { fontSize: parseFloat(e.target.value) })}
                                                className="w-full"
                                            />
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label className="text-xs font-medium mb-1 block">Vertical Position (Y)</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="3"
                                        step="0.01"
                                        value={label.position[1]}
                                        onChange={(e) => {
                                            const newY = parseFloat(e.target.value)
                                            updateLabel(label.id, { position: [label.position[0], newY, label.position[2]] })
                                        }}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium mb-1 block">Rotation (Around Bottle)</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max={Math.PI * 2}
                                        step="0.1"
                                        value={label.rotation?.[1] || 0}
                                        onChange={(e) => {
                                            const angle = parseFloat(e.target.value)
                                            // Get base radius from Z position (approx)
                                            // We assume the label was added with correct Z for front
                                            // To rotate, we orbit around Y axis.
                                            // x = r * sin(angle)
                                            // z = r * cos(angle)

                                            // Hack: We need the radius. Let's assume the current 'scale' or magnitude of X/Z is the radius?
                                            // Better: Use getLabelData again to know the radius for this model
                                            const { position: defaultPos } = getLabelData(model)
                                            const radius = defaultPos[2] // Z is radius for front-facing

                                            const newX = radius * Math.sin(angle)
                                            const newZ = radius * Math.cos(angle)

                                            // Update position AND rotation
                                            updateLabel(label.id, {
                                                rotation: [0, angle, 0],
                                                position: [newX, label.position[1], newZ]
                                            })
                                        }}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium mb-1 block">Scale</label>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="2"
                                        step="0.05"
                                        value={label.scale[0]} // Uniform scale
                                        onChange={(e) => {
                                            const s = parseFloat(e.target.value)
                                            updateLabel(label.id, { scale: [s, s, 1] })
                                        }}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
