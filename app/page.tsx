"use client"

import { useState } from "react"
import { ChatRoom } from "@/components/chat-room"
import { Logo } from "@/components/logo"
import { LandingPage } from "@/components/landing-page"

export default function HomePage() {
  const [showChat, setShowChat] = useState(false)

  if (!showChat) {
    return <LandingPage onReveal={() => setShowChat(true)} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="absolute top-4 right-4 z-50">
          <Logo className="w-8 h-8" />
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 pt-16 pb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-mono font-bold text-balance mb-2">youngmook</h2>
          </div>
          <ChatRoom />
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Logo className="w-6 h-6" />
                <span className="text-sm text-muted-foreground font-mono">MMS</span>
              </div>
              <div className="text-xs text-muted-foreground">Powered by MMS</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
