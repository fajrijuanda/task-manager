"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <div className="text-sm text-muted-foreground">
                    Receive emails about your account activity and task updates.
                </div>
            </div>
            <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
                <Label className="text-base">Task Reminders</Label>
                <div className="text-sm text-muted-foreground">
                    Get notified when a task is due soon.
                </div>
            </div>
            <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
                <Label className="text-base">Weekly Summary</Label>
                <div className="text-sm text-muted-foreground">
                    Receive a summary of your weekly progress every Monday.
                </div>
            </div>
            <Switch />
        </div>
      </div>
    </div>
  )
}
