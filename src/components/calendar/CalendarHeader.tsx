"use client"


import { format } from "date-fns"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarView } from "@/types" // Ensure this type exists or define it locally if strict

interface CalendarHeaderProps {
  currentDate: Date
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  view: CalendarView
  onViewChange: (view: CalendarView) => void
}

export function CalendarHeader({ currentDate, onPrev, onNext, onToday, view, onViewChange }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 px-4 py-2 bg-gradient-to-r from-card to-background/50 backdrop-blur-sm border rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onToday} className="hidden md:flex">
          Today
        </Button>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onPrev} className="h-8 w-8 hover:bg-muted">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext} className="h-8 w-8 hover:bg-muted">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-foreground/90 min-w-[160px]">
          {format(currentDate, "MMMM yyyy")}
        </h2>
      </div>

      <div className="flex items-center gap-2">
         <div className="hidden md:flex items-center border rounded-md p-1 bg-muted/50">
             {(['month', 'week', 'day'] as CalendarView[]).map((v) => (
                 <button
                    key={v}
                    onClick={() => onViewChange(v)}
                    className={`px-3 py-1 text-xs font-medium rounded-sm transition-all capitalize ${view === v ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                 >
                    {v}
                 </button>
             ))}
         </div>
         
         {/* Mobile view selector */}
         <div className="md:hidden">
            <Select value={view} onValueChange={(v: CalendarView) => onViewChange(v)}>
                <SelectTrigger className="w-[100px] h-8 text-xs">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                </SelectContent>
            </Select>
         </div>
         
         <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 ml-2">
            <CalendarIcon className="mr-2 h-3.5 w-3.5" />
            New Event
         </Button>
      </div>
    </div>
  )
}
