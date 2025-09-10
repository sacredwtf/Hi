"use client"

import { Logo } from "./logo"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

export function Navigation() {
  return (
    <Card className="neo-depth border-0 bg-card/80 backdrop-blur-sm">
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <h1 className="text-xl font-mono font-medium tracking-wider text-foreground">MMS</h1>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Analytics
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Settings
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="neo-depth-subtle border-border/50 bg-transparent">
            Sign In
          </Button>
          <Button size="sm" className="neo-depth bg-primary text-primary-foreground">
            Get Started
          </Button>
        </div>
      </nav>
    </Card>
  )
}
