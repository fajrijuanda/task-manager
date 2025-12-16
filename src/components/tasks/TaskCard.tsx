"use client"

import { useState } from "react"
import { MoreHorizontal, Calendar, Clock, CheckCircle2, Circle } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn, getPriorityColor, formatRelativeDate } from "@/lib/utils"
import type { Task } from "@/types"

interface TaskCardProps {
  task: Task
  onComplete?: (id: string) => void
  onDelete?: (id: string) => void
  onEdit?: (task: Task) => void
}

export function TaskCard({ task, onComplete, onDelete, onEdit }: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(task.status === "completed")
  const priorityColor = getPriorityColor(task.priority)

  const handleComplete = () => {
    setIsCompleted(!isCompleted)
    onComplete?.(task.id)
  }

  return (
    <div
      className={cn(
        "group flex items-start justify-between rounded-xl border p-4 transition-all hover:bg-muted/50 hover:shadow-sm bg-card/60 glass",
        isCompleted && "opacity-60 bg-muted/20",
        priorityColor.border
      )}
    >
      <div className="flex items-start gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "mt-0.5 h-6 w-6 rounded-full border-2 p-0 hover:bg-transparent",
            isCompleted
              ? "border-primary bg-primary text-primary-foreground hover:bg-primary"
              : "border-muted-foreground hover:border-primary"
          )}
          onClick={handleComplete}
        >
          {isCompleted ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Circle className="h-4 w-4 fill-transparent" />
          )}
          <span className="sr-only">Toggle completion</span>
        </Button>

        <div className="space-y-1">
          <h4
            className={cn(
              "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              isCompleted && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </h4>
          
          {task.description && (
            <p className={cn("text-sm text-muted-foreground line-clamp-2", isCompleted && "line-through")}>
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-muted-foreground">
            {task.due_date && (
               <div className={cn("flex items-center gap-1", 
                  new Date(task.due_date) < new Date() && !isCompleted ? "text-red-500 font-medium" : ""
               )}>
                  <Calendar className="h-3 w-3" />
                  <span>{formatRelativeDate(new Date(task.due_date))}</span>
               </div>
            )}
            
            {task.due_time && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{task.due_time}</span>
              </div>
            )}

            {task.category && (
               <Badge variant="outline" className="h-5 gap-1 border-0" style={{ backgroundColor: `${task.category.color}15`, color: task.category.color }}>
                 <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: task.category.color }} />
                 {task.category.name}
               </Badge>
            )}
            
            <Badge variant="secondary" className={cn("h-5 px-1.5 text-[10px] capitalize", priorityColor.bg, priorityColor.text)}>
                {task.priority}
            </Badge>
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit?.(task)}>Edit</DropdownMenuItem>
          <DropdownMenuItem>Set Reminder</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-100 dark:focus:bg-red-900/40" onClick={() => onDelete?.(task.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
