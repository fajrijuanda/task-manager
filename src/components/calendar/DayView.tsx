"use client"

import { format, isToday } from "date-fns"
import { cn } from "@/lib/utils"
// Use your Task type here
import { Task } from "@/types"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DayViewProps {
  currentDate: Date
  tasks: Task[]
}

export function DayView({ currentDate, tasks }: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="flex flex-col h-full bg-card/40 rounded-xl border shadow-sm backdrop-blur-sm overflow-hidden">
       {/* Header */}
       <div className="flex items-center justify-center py-4 border-b bg-muted/30">
            <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground uppercase">{format(currentDate, "EEEE")}</div>
                <div className={cn(
                    "mt-1 text-3xl font-bold h-12 w-12 mx-auto flex items-center justify-center rounded-full",
                    isToday(currentDate) && "bg-primary text-primary-foreground"
                )}>
                    {format(currentDate, "d")}
                </div>
            </div>
       </div>

       {/* Time Grid */}
       <ScrollArea className="flex-1">
          <div className="flex min-h-[600px]">
             <div className="w-20 shrink-0 border-r bg-muted/5 divide-y text-xs text-muted-foreground font-medium text-right pr-4 pt-1">
                {hours.map((hour) => (
                   <div key={hour} className="h-24 relative">
                       <span className="absolute -top-3 right-0">{format(new Date().setHours(hour, 0, 0, 0), "ha")}</span>
                   </div>
                ))}
             </div>
             
             <div className="flex-1 relative bg-background/30">
                 {/* Grid lines */}
                 {hours.map((hour) => (
                     <div key={`line-${hour}`} className="absolute w-full border-b border-muted/50" style={{ top: `${(hour) * 96}px` }} />
                 ))}

                 {/* Render events for this day */}
                 <div className="relative h-[2304px] w-full"> {/* 24h * 96px */}
                    {tasks.filter(t => t.due_date && new Date(t.due_date).toDateString() === currentDate.toDateString()).map(task => {
                            const timeParts = (task.due_time || "00:00").split(":")
                            const h = parseInt(timeParts[0]) || 0
                            const m = parseInt(timeParts[1]) || 0
                            const top = (h * 96) + ((m / 60) * 96)
                            
                            return (
                                <div 
                                key={task.id}
                                className="absolute left-2 right-4 p-3 rounded-lg border text-sm overflow-hidden shadow hover:z-10 group transition-all"
                                style={{
                                    top: `${top}px`,
                                    height: '80px', // Default
                                    backgroundColor: `${task.category?.color || '#3b82f6'}15`, 
                                    color: task.category?.color || '#3b82f6',
                                    borderColor: `${task.category?.color || '#3b82f6'}40`
                                }}
                                >
                                <div className="flex items-start justify-between">
                                    <div className="font-bold">{task.title}</div>
                                    <div className="text-xs font-mono opacity-70 bg-background/50 px-1 rounded">{task.due_time}</div>
                                </div>
                                <div className="text-xs opacity-80 mt-1 line-clamp-1">{task.description}</div>
                                </div>
                            )
                    })}
                 </div>
             </div>
          </div>
       </ScrollArea>
    </div>
  )
}
