"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal } from "lucide-react"

export function TaskFilters() {
  const priorities = ["low", "medium", "high", "urgent"]
  const categories = [
    { name: "Work", color: "#7C6AFA" },
    { name: "Personal", color: "#F59E0B" },
    { name: "Shopping", color: "#10B981" },
  ]

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter tasks..."
          className="pl-9 bg-secondary/50 border-0"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</h3>
        <div className="flex flex-wrap gap-2">
           <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20 bg-primary/10 text-primary">All</Badge>
           <Badge variant="outline" className="cursor-pointer hover:bg-muted">Pending</Badge>
           <Badge variant="outline" className="cursor-pointer hover:bg-muted">Completed</Badge>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Priority</h3>
        <div className="flex flex-wrap gap-2">
            {priorities.map(p => (
                <Badge key={p} variant="outline" className="cursor-pointer hover:bg-muted capitalize">
                    {p}
                </Badge>
            ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</h3>
        <div className="space-y-1">
            {categories.map(c => (
                <Button key={c.name} variant="ghost" size="sm" className="w-full justify-start text-sm font-normal">
                    <span className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: c.color }} />
                    {c.name}
                </Button>
            ))}
        </div>
      </div>
      
       <Button variant="outline" className="w-full border-dashed" size="sm">
          <SlidersHorizontal className="mr-2 h-3 w-3" />
          Advanced Filters
       </Button>
    </div>
  )
}
