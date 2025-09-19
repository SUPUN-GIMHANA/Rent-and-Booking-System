import React, { useState } from "react"
import { Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AuthDialog() {
  const [isLogin, setIsLogin] = useState(true)
  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
          {isLogin ? (
            <>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">Login</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your credentials to access your account
                </p>
              </div>

              <form className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="********" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>

              <p className="text-center text-sm mt-6 text-muted-foreground">
                Don’t have an account?{" "}
                <Button
                  variant="link"
                  className={cn("p-0 h-auto text-primary")}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </Button>
              </p>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">Sign Up</h2>
                <p className="text-sm text-muted-foreground">
                  Create your account to get started
                </p>
              </div>

              <form className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+1 234 567 890" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="********" required />
                </div>
                <Button type="submit" className="w-full" onClick={() => setIsLogin(true)}>
                  Create Account
                </Button>
              </form>

              <p className="text-center text-sm mt-6 text-muted-foreground">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className={cn("p-0 h-auto text-primary")}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </Button>
              </p>
            </>
          )}
    </Dialog>
  )
}
