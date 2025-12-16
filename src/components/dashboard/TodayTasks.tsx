"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { cn, getPriorityColor } from "@/lib/utils"
import type { Task } from "@/types"
import { Clock } from "lucide-react"

// Mock data - replace with real data later
const MOCK_TASKS: Partial<Task>[] = [
  {
    id: "1",
    title: "Morning Standup Team A",
    due_time: "09:00",
    priority: "high",
    category: { id: "c1", name: "Work", color: "#7C6AFA", created_at: "", user_id: "", icon: null },
    status: "pending"
  },
  {
    id: "2",
    title: "Review PR #123",
    due_time: "10:30",
    priority: "medium",
    category: { id: "c1", name: "Work", color: "#7C6AFA", created_at: "", user_id: "", icon: null },
    status: "pending"
  },
  {
    id: "3",
    title: "Lunch with Client",
    due_time: "12:00",
    priority: "low",
    category: { id: "c2", name: "Personal", color: "#F59E0B", created_at: "", user_id: "", icon: null },
    status: "pending"
  },
  {
    id: "4",
    title: "Update Documentation",
    due_time: "14:00",
    priority: "medium",
    category: { id: "c1", name: "Work", color: "#7C6AFA", created_at: "", user_id: "", icon: null },
    status: "completed"
  },
]

export function TodayTasks() {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 glass h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
            <span>Today&apos;s Tasks</span>
            <span className="text-sm font-normal text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-4">
            {MOCK_TASKS.map((task) => {
               const priorityColor = getPriorityColor(task.priority!)
               return (
                <div
                    key={task.id}
                    className={cn(
                    "flex items-center justify-between p-3 rounded-xl border transition-all hover:bg-muted/50 group",
                    task.status === "completed" ? "opacity-60 bg-muted/20" : "bg-card/50",
                    priorityColor.border
                    )}
                >
                    <div className="flex items-start gap-3">
                        <Checkbox 
                            id={`task-${task.id}`} 
                            checked={task.status === "completed"}
                            className="mt-1 transition-all data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <div className="space-y-1">
                            <label
                            htmlFor={`task-${task.id}`}
                            className={cn(
                                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer block",
                                task.status === "completed" && "line-through text-muted-foreground"
                            )}
                            >
                            {task.title}
                            </label>
                            
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="flex items-center">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {task.due_time}
                                </span>
                                {task.category && (
                                    <Badge variant="secondary" className="h-5 px-1.5 text-[10px]" style={{ backgroundColor: `${task.category.color}20`, color: task.category.color }}>
                                        {task.category.name}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
               )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
