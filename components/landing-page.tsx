"use client"

import { useState, useEffect } from "react"
import { Logo } from "./logo"

interface LandingPageProps {
  onReveal: () => void
}

export function LandingPage({ onReveal }: LandingPageProps) {
  const [selectionCount, setSelectionCount] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()
      if (selection && selection.toString().trim() === "i know your watching") {
        setSelectionCount((prev) => {
          const newCount = prev + 1
          if (newCount >= 5) {
            setIsRevealed(true)
            setTimeout(() => {
              onReveal()
            }, 1000)
          }
          return newCount
        })
      }
    }

    document.addEventListener("selectionchange", handleSelection)
    return () => document.removeEventListener("selectionchange", handleSelection)
  }, [onReveal])

  const handleTap = () => {
    setSelectionCount((prev) => {
      const newCount = prev + 1
      if (newCount >= 5) {
        setIsRevealed(true)
        setTimeout(() => {
          onReveal()
        }, 1000)
      }
      return newCount
    })
  }

  if (isRevealed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-2xl font-mono text-muted-foreground">jayden is bisexual...</div>
        </div>
      </div>
    )
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
        <main className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1
              className="text-4xl font-mono font-bold text-foreground cursor-pointer hover:text-primary transition-colors duration-300 active:scale-95 touch-manipulation"
              style={{ userSelect: "text", WebkitUserSelect: "text" }}
              onClick={handleTap}
              onTouchEnd={handleTap}
            >
              i know your watching
            </h1>
            {selectionCount > 0 && selectionCount < 5 && (
              <div className="mt-4 text-sm text-muted-foreground font-mono animate-pulse">{selectionCount}/5</div>
            )}
            {selectionCount === 0 && (
              <div className="mt-6 text-xs text-muted-foreground/60 font-mono">
                <span className="hidden md:inline">yungmooky</span>
                <span className="md:hidden">yungmooky</span>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
