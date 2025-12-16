"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Chrome } from "lucide-react"

export default function LoginPage() {
  return (
    <Card className="glass border-muted/50 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Enter your email to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" type="email" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" />
        </div>
        <Button className="w-full bg-primary hover:bg-primary/90 text-white">
          Sign In
        </Button>

        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground uppercase">Or continue with</span>
          <Separator className="flex-1" />
        </div>

        <Button variant="outline" className="w-full" type="button">
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
         <div className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
         </div>
      </CardFooter>
    </Card>
  )
}
