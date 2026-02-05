import { useState, useCallback } from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import { ColorSwatch } from './ColorSwatch'
import { cn } from '../../../lib/utils'

interface ColorPickerProps {
    value: string
    onChange: (color: string) => void
    presets?: string[]
    label?: string
    id?: string
    hideLabel?: boolean
}

const DEFAULT_PRESETS = [
    '#EF4444', '#F97316', '#F59E0B', '#EAB308',
    '#84CC16', '#22C55E', '#14B8A6', '#06B6D4',
    '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7',
    '#EC4899', '#F43F5E', '#78716C', '#1F2937',
]

export function ColorPicker({
    value,
    onChange,
    presets = DEFAULT_PRESETS,
    label,
    id,
    hideLabel,
}: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleColorChange = useCallback(
        (color: string) => {
            onChange(color)
        },
        [onChange]
    )

    return (
        <div className="space-y-3">
            {label && !hideLabel && (
                <div className="flex items-center justify-between">
                    <label htmlFor={id} className="text-sm font-medium text-foreground">
                        {label}
                    </label>
                    <span className="text-xs font-mono text-muted-foreground uppercase">{value}</span>
                </div>
            )}

            <button
                id={id}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'flex w-full items-center gap-3 rounded-lg border p-2',
                    'border-border transition-colors hover:bg-muted',
                    isOpen && 'ring-2 ring-primary ring-offset-1'
                )}
                aria-label={`Current color: ${value}. Click to open color picker.`}
                aria-expanded={isOpen}
            >
                <div
                    className="h-8 w-8 rounded-md border border-border shadow-sm"
                    style={{ backgroundColor: value }}
                />
                {!hideLabel && <span className="font-mono text-sm uppercase">{value}</span>}
                {hideLabel && <span className="flex-1 text-left font-mono text-sm uppercase text-muted-foreground">{value}</span>}
            </button>

            {isOpen && (
                <div className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                    <HexColorPicker
                        color={value === 'transparent' ? '#ffffff' : value}
                        onChange={handleColorChange}
                    />

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">#</span>
                        <HexColorInput
                            color={value}
                            onChange={handleColorChange}
                            className={cn(
                                'flex-1 rounded-md border border-border bg-background px-2 py-1',
                                'font-mono text-sm uppercase',
                                'focus:outline-none focus:ring-2 focus:ring-ring'
                            )}
                            aria-label="Hex color code"
                        />
                    </div>

                    <div className="grid grid-cols-8 gap-2">
                        {/* Explicit Transparent Option */}
                        <button
                            className={cn(
                                "h-6 w-6 rounded-md border border-border shadow-sm bg-[url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.8yO5x5oW5F5o5o5o5o5o5o%26pid%3DApi&f=1&ipt=transparent')] bg-center bg-cover", // rudimentary checkerboard
                                value === 'transparent' && "ring-2 ring-primary ring-offset-1"
                            )}
                            style={{
                                backgroundImage: `linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
                                backgroundSize: `8px 8px`,
                                backgroundColor: '#fff'
                            }}
                            onClick={() => handleColorChange('transparent')}
                            title="Transparent"
                        />
                        {presets.map((preset) => (
                            <ColorSwatch
                                key={preset}
                                color={preset}
                                isSelected={preset.toLowerCase() === value.toLowerCase()}
                                onClick={() => handleColorChange(preset)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
