"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "./ThemeToggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sidebar } from "./Sidebar"

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/50 glass px-6 backdrop-blur-xl sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-r-0">
                <Sidebar className="w-full relative h-full bg-background border-none block" />
            </SheetContent>
        </Sheet>
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="w-64 rounded-full bg-secondary/50 pl-9 focus-visible:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
             <div className="flex items-center justify-between px-4 py-2 border-b">
                <p className="font-semibold text-sm">Notifications</p>
                <span className="text-xs text-muted-foreground">Mark all as read</span>
             </div>
             <div className="grid gap-1 p-1 max-h-[300px] overflow-y-auto">
                 {[
                    { title: "Project meeting", time: "1 hour ago", desc: "Team meeting for Q4 planning" },
                    { title: "Task overdue", time: "2 hours ago", desc: "Review marketing copy is overdue", active: true },
                    { title: "New comment", time: "5 hours ago", desc: "Sarah commented on 'Homepage Design'" }
                 ].map((item, i) => (
                    <div key={i} className={`flex flex-col gap-1 p-3 rounded-md hover:bg-muted/50 cursor-pointer ${item.active ? 'bg-muted/20' : ''}`}>
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.title}</span>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                       </div>
                       <p className="text-xs text-muted-foreground line-clamp-1">{item.desc}</p>
                    </div>
                 ))}
             </div>
             <div className="p-2 border-t text-center">
                <Button variant="ghost" size="sm" className="w-full h-8 text-xs">View all notifications</Button>
             </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9 border transition-all hover:scale-105">
                <AvatarImage src="/avatars/01.png" alt="@user" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 focus:bg-red-500/10 focus:text-red-500">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
