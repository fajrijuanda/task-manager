"use client"

import { format, startOfWeek, eachDayOfInterval, addDays, isSameDay, isToday } from "date-fns"
import { cn } from "@/lib/utils"
// Use your Task type here
import { Task } from "@/types"
import { ScrollArea } from "@/components/ui/scroll-area"

interface WeekViewProps {
  currentDate: Date
  tasks: Task[]
}

export function WeekView({ currentDate, tasks }: WeekViewProps) {
  const weekStart = startOfWeek(currentDate)
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6),
  })
  
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="flex flex-col h-full bg-card/40 rounded-xl border shadow-sm backdrop-blur-sm overflow-hidden">
       {/* Header */}
       <div className="flex border-b bg-muted/30">
          <div className="w-16 shrink-0 border-r bg-muted/10"></div> {/* Time gutter header */}
          <div className="flex-1 grid grid-cols-7 divide-x">
             {weekDays.map((day) => (
                <div key={day.toString()} className="py-2 text-center">
                    <div className="text-xs font-medium text-muted-foreground uppercase">{format(day, "EEE")}</div>
                    <div className={cn(
                        "mt-1 text-lg font-bold h-8 w-8 mx-auto flex items-center justify-center rounded-full",
                        isToday(day) && "bg-primary text-primary-foreground"
                    )}>
                        {format(day, "d")}
                    </div>
                </div>
             ))}
          </div>
       </div>

       {/* Time Grid */}
       <ScrollArea className="flex-1">
          <div className="flex min-h-[600px]"> {/* Ensure min height for scrolling */}
             <div className="w-16 shrink-0 border-r bg-muted/5 divide-y text-xs text-muted-foreground font-medium text-right pr-2">
                {hours.map((hour) => (
                   <div key={hour} className="h-20 relative">
                       <span className="absolute -top-2 right-2 bg-background/50 px-1 rounded">{format(new Date().setHours(hour, 0, 0, 0), "ga")}</span>
                   </div>
                ))}
             </div>
             
             <div className="flex-1 grid grid-cols-7 divide-x relative">
                 {/* Grid lines */}
                 {hours.map((hour) => (
                     <div key={`line-${hour}`} className="absolute w-full border-b border-dashed border-muted/50" style={{ top: `${(hour) * 80}px` }} />
                 ))}

                 {weekDays.map((day) => (
                    <div key={day.toString()} className="relative h-[1920px]"> {/* 24h * 80px */}
                        {/* Render events for this day */}
                        {tasks.filter(t => t.due_date && isSameDay(new Date(t.due_date), day)).map(task => {
                             // Simple positioning based on time string (e.g. "14:00")
                             // In real app, parse start/end times precisely
                             const timeParts = (task.due_time || "00:00").split(":")
                             const h = parseInt(timeParts[0]) || 0
                             const m = parseInt(timeParts[1]) || 0
                             const top = (h * 80) + ((m / 60) * 80)
                             
                             return (
                                 <div 
                                    key={task.id}
                                    className="absolute left-1 right-1 p-2 rounded-md border text-xs overflow-hidden shadow-sm hover:z-10 transition-all hover:scale-[1.02]"
                                    style={{
                                        top: `${top}px`,
                                        height: '70px', // Default duration 1h (approx)
                                        backgroundColor: `${task.category?.color || '#3b82f6'}20`, 
                                        color: task.category?.color || '#3b82f6',
                                        borderLeftWidth: '4px',
                                        borderLeftColor: task.category?.color || '#3b82f6'
                                    }}
                                 >
                                    <div className="font-semibold truncate">{task.title}</div>
                                    <div className="opacity-80 truncate">{task.due_time}</div>
                                 </div>
                             )
                        })}
                    </div>
                 ))}
             </div>
          </div>
       </ScrollArea>
    </div>
  )
}
