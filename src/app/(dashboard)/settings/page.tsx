import { Settings } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export default async function SettingsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-8">
                <Settings className="w-7 h-7 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            </div>

            <div className="max-w-2xl space-y-6">
                {/* Account Info */}
                <div className="rounded-2xl border border-border bg-muted/30 p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Account</h2>
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm text-muted-foreground">Email</label>
                            <p className="text-foreground">{user?.email}</p>
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground">User ID</label>
                            <p className="text-foreground font-mono text-sm">{user?.id}</p>
                        </div>
                    </div>
                </div>

                {/* Placeholder for more settings */}
                <div className="rounded-2xl border border-border border-dashed bg-muted/30 p-6">
                    <p className="text-muted-foreground text-sm">
                        Profile customization (display name, timezone, theme) coming soon.
                    </p>
                </div>
            </div>
        </div>
    )
}
