'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDays, CheckSquare, Repeat, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { signOut } from '@/app/(auth)/actions'

const navItems = [
    { href: '/calendar', label: 'Calendar', icon: CalendarDays },
    { href: '/tasks', label: 'Tasks', icon: CheckSquare },
    { href: '/habits', label: 'Habits', icon: Repeat },
    { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <>
            {/* Mobile hamburger */}
            <button
                onClick={() => setMobileOpen(true)}
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-muted border border-border text-foreground lg:hidden"
                aria-label="Open menu"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-muted/80 backdrop-blur-xl border-r border-border
          flex flex-col transition-transform duration-300
          lg:translate-x-0 lg:static lg:z-auto
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-border">
                    <Link href="/calendar" className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                            <CalendarDays className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-lg font-bold text-foreground">Kalendar</span>
                    </Link>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-1 text-muted-foreground hover:text-foreground lg:hidden"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }
                `}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Sign out */}
                <div className="p-3 border-t border-border">
                    <form action={signOut}>
                        <button
                            type="submit"
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            Sign out
                        </button>
                    </form>
                </div>
            </aside>
        </>
    )
}
