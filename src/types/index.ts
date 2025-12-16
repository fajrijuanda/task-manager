// Task Types
export type Priority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";

export interface Task {
  id: string;
  user_id: string;
  category_id: string | null;
  title: string;
  description: string | null;
  due_date: string | null;
  due_time: string | null;
  start_date: string | null;
  start_time: string | null;
  all_day: boolean;
  status: TaskStatus;
  priority: Priority;
  is_recurring: boolean;
  recurrence_rule: Record<string, unknown> | null;
  parent_task_id: string | null;
  completed_at: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  category?: Category;
  subtasks?: Subtask[];
}

export interface Subtask {
  id: string;
  task_id: string;
  title: string;
  is_completed: boolean;
  order_index: number;
  created_at: string;
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon: string | null;
  created_at: string;
}

export interface Reminder {
  id: string;
  task_id: string;
  remind_at: string;
  type: "notification" | "email" | "whatsapp";
  is_sent: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone_number: string | null;
  timezone: string;
  notification_preferences: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// Form Types
export interface TaskFormData {
  title: string;
  description: string;
  due_date: Date | null;
  due_time: string;
  start_date: Date | null;
  start_time: string;
  all_day: boolean;
  priority: Priority;
  category_id: string | null;
  is_recurring: boolean;
  recurrence_rule: Record<string, unknown> | null;
}

export interface CategoryFormData {
  name: string;
  color: string;
  icon: string | null;
}

// Calendar Types
export type CalendarView = "month" | "week" | "day";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  priority: Priority;
  color: string;
  task: Task;
}

// Stats Types
export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  completionRate: number;
}

// Filter Types
export interface TaskFilters {
  status: TaskStatus | "all";
  priority: Priority | "all";
  category_id: string | "all";
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  search: string;
}
