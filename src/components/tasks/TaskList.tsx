"use client"

import { TaskCard } from "@/components/tasks/TaskCard"
import type { Task } from "@/types"

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  const pendingTasks = tasks.filter(t => t.status !== 'completed')
  const completedTasks = tasks.filter(t => t.status === 'completed')

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
          <span className="text-2xl">📋</span>
        </div>
        <h3 className="font-medium mb-1">No tasks found</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or create a new task
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <>
          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
             Pending <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{pendingTasks.length}</span>
          </h3>
          <div className="grid gap-3">
            {pendingTasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </>
      )}
      
      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="pt-6">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-3">
              Completed <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{completedTasks.length}</span>
          </h3>
          <div className="grid gap-3">
              {completedTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
