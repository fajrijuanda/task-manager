"use client"

import { useEventDetail } from "@/hooks/use-event-detail"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Tag, Flag, CheckCircle2, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"

export function EventDetailDialog() {
  const { isOpen, selectedEvent, onClose } = useEventDetail()

  if (!selectedEvent) return null

  const priorityColors = {
    low: "bg-green-500/20 text-green-500",
    medium: "bg-yellow-500/20 text-yellow-500",
    high: "bg-orange-500/20 text-orange-500",
    urgent: "bg-red-500/20 text-red-500",
  }

  const statusColors = {
    pending: "bg-blue-500/20 text-blue-500",
    "in-progress": "bg-purple-500/20 text-purple-500",
    completed: "bg-green-500/20 text-green-500",
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden">
        {/* Color Banner */}
        <div 
          className="h-3 w-full"
          style={{ backgroundColor: selectedEvent.category?.color || '#3b82f6' }}
        />
        
        <div className="p-6 space-y-4">
          <DialogHeader className="space-y-3">
            <div className="flex items-start justify-between">
              <DialogTitle className="text-xl font-bold pr-4">
                {selectedEvent.title}
              </DialogTitle>
              <Badge 
                variant="secondary" 
                className={priorityColors[selectedEvent.priority]}
              >
                {selectedEvent.priority}
              </Badge>
            </div>
          </DialogHeader>

          {selectedEvent.description && (
            <p className="text-sm text-muted-foreground">
              {selectedEvent.description}
            </p>
          )}

          <Separator />

          {/* Event Details */}
          <div className="space-y-3">
            {selectedEvent.due_date && (
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(new Date(selectedEvent.due_date), "EEEE, MMMM d, yyyy")}</span>
              </div>
            )}
            
            {selectedEvent.due_time && (
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{selectedEvent.due_time}</span>
              </div>
            )}

            {selectedEvent.category && (
              <div className="flex items-center gap-3 text-sm">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <Badge 
                  variant="secondary"
                  style={{ 
                    backgroundColor: `${selectedEvent.category.color}20`,
                    color: selectedEvent.category.color,
                    borderColor: `${selectedEvent.category.color}40`
                  }}
                  className="border"
                >
                  {selectedEvent.category.name}
                </Badge>
              </div>
            )}

            <div className="flex items-center gap-3 text-sm">
              <Flag className="h-4 w-4 text-muted-foreground" />
              <Badge variant="secondary" className={priorityColors[selectedEvent.priority]}>
                {selectedEvent.priority} priority
              </Badge>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              <Badge variant="secondary" className={statusColors[selectedEvent.status]}>
                {selectedEvent.status}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" className="flex-1 text-destructive hover:text-destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
