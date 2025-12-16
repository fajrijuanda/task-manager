export type Priority = "low" | "medium" | "high" | "urgent"
export type TaskStatus = "pending" | "in-progress" | "completed"

export interface Category {
  id: string
  name: string
  color: string
  icon?: string | null
  user_id: string
  created_at: string
}

export interface Task {
  id: string
  user_id: string
  title: string
  description?: string | null
  due_date?: string | null
  due_time?: string | null
  start_date?: string | null
  start_time?: string | null
  all_day: boolean
  priority: Priority
  status: TaskStatus
  category_id?: string | null
  category?: Category
  is_recurring: boolean
  recurrence_rule?: string | null
  parent_task_id?: string | null
  created_at: string
  updated_at: string
  completed_at?: string | null
  deleted_at?: string | null
}

export interface Reminder {
  id: string
  task_id: string
  remind_at: string
  created_at: string
}

export type Profile = {
    id: string
    email: string
    full_name?: string
    avatar_url?: string
}

// Calendar Types
export type CalendarView = "month" | "week" | "day" | "list"

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  allDay?: boolean
  resource?: unknown
}
