"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-x-4">
        <Avatar className="h-16 w-16">
           <AvatarImage src="https://github.com/shadcn.png" />
           <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button variant="outline" size="sm">Change Avatar</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
         <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" defaultValue="John" />
         </div>
         <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" defaultValue="Doe" />
         </div>
      </div>
      
      <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue="john.doe@example.com" disabled className="bg-muted" />
            <p className="text-[0.8rem] text-muted-foreground">
                Email change is currently disabled.
            </p>
      </div>
      
      <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell us a little bit about yourself" className="resize-none" />
            <p className="text-[0.8rem] text-muted-foreground">
                This will be displayed on your profile.
            </p>
      </div>

      <div className="flex justify-end">
         <Button>Save Changes</Button>
      </div>
    </div>
  )
}
