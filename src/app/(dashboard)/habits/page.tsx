import { Repeat } from 'lucide-react'

export default function HabitsPage() {
    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-8">
                <Repeat className="w-7 h-7 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Habits</h1>
            </div>
            <div className="flex items-center justify-center h-96 rounded-2xl border border-border border-dashed bg-muted/30">
                <p className="text-muted-foreground">Habit tracking coming in Phase 5</p>
            </div>
        </div>
    )
}
