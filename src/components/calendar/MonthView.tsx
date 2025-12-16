"use client"

import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday, startOfMonth, endOfMonth } from "date-fns"
import { cn } from "@/lib/utils"
// Use your Task type here
import { Task } from "@/types"

interface MonthViewProps {
  currentDate: Date
  tasks: Task[]
}

export function MonthView({ currentDate, tasks }: MonthViewProps) {
  const monthStart = startOfWeek(startOfMonth(currentDate))
  const monthEnd = endOfWeek(endOfMonth(currentDate))
  
  const calendarDays = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  })

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="flex flex-col h-full bg-card/40 rounded-xl border shadow-sm overflow-hidden backdrop-blur-sm">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b bg-muted/30">
        {weekDays.map((day) => (
          <div key={day} className="py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-7 grid-rows-5 md:grid-rows-6">
        {calendarDays.map((day, dayIdx) => {
            const isCurrentMonth = isSameMonth(day, currentDate)
            const isDayToday = isToday(day)
            // Filter tasks for this day - simplistic check, assume task.due_date is absolute date string
            const dayTasks = tasks.filter(t => t.due_date && isSameDay(new Date(t.due_date), day))
            
            return (
                <div
                    key={day.toString()}
                    className={cn(
                        "min-h-[60px] md:min-h-[100px] border-b border-r p-1 md:p-2 transition-colors relative group hover:bg-muted/20",
                        !isCurrentMonth && "bg-muted/5 text-muted-foreground/50",
                        dayIdx % 7 === 6 && "border-r-0" // Remove right border for last col
                    )}
                >
                    <div className="flex items-center justify-between pointer-events-none">
                        <span
                            className={cn(
                                "text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full pointer-events-auto cursor-pointer hover:bg-primary/20 transition-colors",
                                isDayToday && "bg-primary text-primary-foreground hover:bg-primary/90"
                            )}
                        >
                            {format(day, "d")}
                        </span>
                    </div>
                    
                    {/* Tasks/Events List */}
                    <div className="mt-1 space-y-0.5 md:space-y-1 overflow-hidden max-h-[40px] md:max-h-[80px]">
                        {dayTasks.slice(0, 3).map((task) => (
                             <div 
                                key={task.id} 
                                className="text-[10px] px-1.5 py-0.5 rounded truncate border cursor-pointer hover:opacity-80 transition-opacity"
                                style={{ 
                                    backgroundColor: `${task.category?.color || '#3b82f6'}15`, 
                                    color: task.category?.color || '#3b82f6',
                                    borderColor: `${task.category?.color || '#3b82f6'}30`
                                }}
                             >
                                {task.due_time && <span className="mr-1 opacity-70">{task.due_time}</span>}
                                {task.title}
                             </div>
                        ))}
                        {dayTasks.length > 3 && (
                            <div className="text-[10px] text-muted-foreground font-medium pl-1 cursor-pointer hover:text-foreground">
                                +{dayTasks.length - 3} more
                            </div>
                        )}
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  )
}
