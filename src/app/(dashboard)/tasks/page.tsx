"use client"

import { TaskFilters } from "@/components/tasks/TaskFilters"
import { TaskList } from "@/components/tasks/TaskList"
import { TaskForm } from "@/components/tasks/TaskForm"
import { Button } from "@/components/ui/button"
import { ListFilter, Plus } from "lucide-react"

export default function TasksPage() {
  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Sidebar Filters - Desktop */}
      <aside className="hidden md:block w-64 shrink-0 space-y-6">
        <div className="sticky top-6">
            <h2 className="text-lg font-semibold mb-4 px-1">Filters</h2>
            <TaskFilters />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">My Tasks</h1>
                <p className="text-muted-foreground">Manage and track your daily activities</p>
            </div>
            
            <TaskForm>
                <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                </Button>
            </TaskForm>
        </div>
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
            <Button variant="outline" className="w-full">
                <ListFilter className="mr-2 h-4 w-4" />
                Filters
            </Button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 pb-10">
            <TaskList />
        </div>
      </div>
    </div>
  )
}
