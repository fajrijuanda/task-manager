"use client"

import { TaskCard } from "@/components/tasks/TaskCard"
import type { Task } from "@/types"

// Mock data
const MOCK_TASKS: Task[] = [
  {
    id: "1",
    user_id: "u1",
    title: "Prepare Monthly Report",
    description: "Compile data from Q3 analytics and create presentation slides.",
    due_date: new Date().toISOString(),
    due_time: "14:00",
    status: "pending",
    priority: "high",
    category_id: "c1",
    category: { id: "c1", name: "Work", color: "#7C6AFA", created_at: "", user_id: "", icon: null },
    is_recurring: false,
    created_at: "",
    updated_at: "",
    start_date: null,
    start_time: null,
    all_day: false,
    recurrence_rule: null,
    parent_task_id: null,
    completed_at: null,
    deleted_at: null,
  },
  {
    id: "2",
    user_id: "u1",
    title: "Grocery Shopping",
    description: null,
    due_date: new Date(Date.now() + 86400000).toISOString(),
    due_time: "10:00",
    status: "pending",
    priority: "medium",
    category_id: "c2",
    category: { id: "c2", name: "Personal", color: "#F59E0B", created_at: "", user_id: "", icon: null },
    is_recurring: false,
    created_at: "",
    updated_at: "",
    start_date: null,
    start_time: null,
    all_day: false,
    recurrence_rule: null,
    parent_task_id: null,
    completed_at: null,
    deleted_at: null,
  },
  {
    id: "3",
    user_id: "u1",
    title: "Client Meeting",
    description: "Discuss project roadmap and timeline",
    due_date: new Date().toISOString(),
    due_time: "13:00",
    status: "completed",
    priority: "urgent",
    category_id: "c1",
    category: { id: "c1", name: "Work", color: "#7C6AFA", created_at: "", user_id: "", icon: null },
    is_recurring: false,
    created_at: "",
    updated_at: "",
    start_date: null,
    start_time: null,
    all_day: false,
    recurrence_rule: null,
    parent_task_id: null,
    completed_at: null,
    deleted_at: null,
  },
]

export function TaskList() {
  return (
    <div className="space-y-4">
      {/* Pending Tasks */}
      <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
         Pending <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{MOCK_TASKS.filter(t => t.status !== 'completed').length}</span>
      </h3>
      <div className="grid gap-3">
        {MOCK_TASKS.filter(t => t.status !== 'completed').map(task => (
            <TaskCard key={task.id} task={task} />
        ))}
      </div>
      
      {/* Completed Tasks */}
      <div className="pt-6">
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-3">
            Completed <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{MOCK_TASKS.filter(t => t.status === 'completed').length}</span>
        </h3>
        <div className="grid gap-3">
            {MOCK_TASKS.filter(t => t.status === 'completed').map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
      </div>
    </div>
  )
}
