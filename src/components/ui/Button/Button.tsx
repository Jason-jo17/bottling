import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../../lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'md', isLoading, children, disabled, ...props }, ref) => {
        const baseStyles =
            'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-normal focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

        const variants = {
            default: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
            primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
            outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
        }

        const sizes = {
            sm: 'h-8 px-3 text-sm',
            md: 'h-10 px-4 text-base',
            lg: 'h-12 px-6 text-lg',
        }

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                )}
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'
