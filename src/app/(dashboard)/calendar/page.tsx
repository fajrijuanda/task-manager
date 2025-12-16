"use client"

import { useState } from "react"
import { addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from "date-fns"
import { CalendarHeader } from "@/components/calendar/CalendarHeader"
import { MonthView } from "@/components/calendar/MonthView"
import { WeekView } from "@/components/calendar/WeekView"
import { DayView } from "@/components/calendar/DayView"
import { CalendarView as ViewType } from "@/types"
import type { Task } from "@/types"

// Temporary mock data sharing to visualize
const MOCK_TASKS: Task[] = [
  {
    id: "1",
    user_id: "u1",
    title: "Quarterly Review",
    due_date: new Date().toISOString(),
    due_time: "09:00",
    status: "pending",
    priority: "high",
    category: { id: "c1", name: "Work", color: "#7C6AFA", created_at: "", user_id: "", icon: null },
    is_recurring: false,
    created_at: "", updated_at: "", start_date: null, start_time: null, all_day: false, recurrence_rule: null, parent_task_id: null, completed_at: null, deleted_at: null
  },
  {
    id: "2",
    user_id: "u1",
    title: "Team Lunch",
    due_date: new Date().toISOString(),
    due_time: "12:30",
    status: "pending",
    priority: "medium",
    category: { id: "c2", name: "Personal", color: "#F59E0B", created_at: "", user_id: "", icon: null },
    is_recurring: false,
    created_at: "", updated_at: "", start_date: null, start_time: null, all_day: false, recurrence_rule: null, parent_task_id: null, completed_at: null, deleted_at: null
  },
   {
    id: "3",
    user_id: "u1",
    title: "Doctor Appointment",
    due_date: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days later
    due_time: "15:00",
    status: "pending",
    priority: "high",
    category: { id: "c3", name: "Health", color: "#10B981", created_at: "", user_id: "", icon: null },
    is_recurring: false,
    created_at: "", updated_at: "", start_date: null, start_time: null, all_day: false, recurrence_rule: null, parent_task_id: null, completed_at: null, deleted_at: null
  },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<ViewType>("month")

  const handlePrev = () => {
    if (view === "month") setCurrentDate(subMonths(currentDate, 1))
    if (view === "week") setCurrentDate(subWeeks(currentDate, 1))
    if (view === "day") setCurrentDate(subDays(currentDate, 1))
  }

  const handleNext = () => {
    if (view === "month") setCurrentDate(addMonths(currentDate, 1))
    if (view === "week") setCurrentDate(addWeeks(currentDate, 1))
    if (view === "day") setCurrentDate(addDays(currentDate, 1))
  }

  const handleToday = () => setCurrentDate(new Date())

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] min-h-0">
      <CalendarHeader
        currentDate={currentDate}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
        view={view}
        onViewChange={setView}
      />
      
      <div className="flex-1 overflow-hidden p-1">
        {view === "month" && (
            <MonthView currentDate={currentDate} tasks={MOCK_TASKS} />
        )}
        {view === "week" && (
            <WeekView currentDate={currentDate} tasks={MOCK_TASKS} />
        )}
        {view === "day" && (
            <DayView currentDate={currentDate} tasks={MOCK_TASKS} />
        )}
      </div>
    </div>
  )
}
