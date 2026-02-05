import { cn } from '../../../lib/utils'

interface ColorSwatchProps {
    color: string
    isSelected?: boolean
    onClick?: () => void
}

export function ColorSwatch({ color, isSelected, onClick }: ColorSwatchProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'h-8 w-8 rounded-md border-2 transition-all duration-fast',
                'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring',
                isSelected ? 'border-primary scale-110' : 'border-neutral-300'
            )}
            style={{ backgroundColor: color }}
            aria-label={`Color ${color}`}
            aria-pressed={isSelected}
        />
    )
}
