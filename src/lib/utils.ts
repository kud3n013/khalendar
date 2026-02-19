import { clsx, type ClassValue } from 'clsx'

// Lightweight cn() helper — you can add twMerge later if needed
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}

/**
 * Format a date for display
 */
export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options,
    })
}

/**
 * Format a time for display (12-hour)
 */
export function formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
}

/**
 * Generate a random hex color from a predefined palette
 */
export const EVENT_COLORS = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // emerald
    '#f59e0b', // amber
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#f97316', // orange
] as const

export function getRandomColor(): string {
    return EVENT_COLORS[Math.floor(Math.random() * EVENT_COLORS.length)]
}
