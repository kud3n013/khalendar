import { CalendarDays } from 'lucide-react'

export default function CalendarPage() {
    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-8">
                <CalendarDays className="w-7 h-7 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
            </div>
            <div className="flex items-center justify-center h-96 rounded-2xl border border-border border-dashed bg-muted/30">
                <p className="text-muted-foreground">Calendar views coming in Phase 2</p>
            </div>
        </div>
    )
}
