"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"

export function TaskForm({ children }: { children?: React.ReactNode }) {
  const [date, setDate] = useState<Date>()
  const [isRecurring, setIsRecurring] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
            <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                New Task
            </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] glass">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Add a new task to your list. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="e.g., Review Q3 Marketing Plan" className="bg-background/50" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Add details..." className="bg-background/50 min-h-[100px]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "w-full justify-start text-left font-normal bg-background/50",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
             </div>
             
             <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="time" type="time" className="pl-9 bg-background/50" />
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>Priority</Label>
                <Select defaultValue="medium">
                    <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                </Select>
             </div>
             
             <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                    <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="shopping">Shopping</SelectItem>
                    </SelectContent>
                </Select>
             </div>
          </div>
          
          <div className="flex items-center justify-between space-x-2 border rounded-lg p-3 bg-background/30">
             <Label htmlFor="recurring" className="flex flex-col space-y-1">
                <span>Recurring Task</span>
                <span className="font-normal text-xs text-muted-foreground">Repeat this task regularly</span>
             </Label>
             <Switch id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
