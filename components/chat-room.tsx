"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Users } from "lucide-react"

interface ChatMessage {
  id: number
  username: string
  message: string
  created_at: string
}

export function ChatRoom() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")
  const [isJoined, setIsJoined] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isJoined) {
      fetchMessages()
      const interval = setInterval(fetchMessages, 2000) // Poll every 2 seconds
      return () => clearInterval(interval)
    }
  }, [isJoined])

  const fetchMessages = async () => {
    try {
      console.log("[v0] Fetching messages from client...")
      const response = await fetch("/api/chat")

      if (response.ok) {
        const text = await response.text()
        console.log("[v0] Response text:", text.substring(0, 100))

        try {
          const data = JSON.parse(text)
          if (Array.isArray(data)) {
            setMessages(data)
          } else if (data.messages) {
            setMessages(data.messages)
          } else {
            console.error("[v0] Unexpected response format:", data)
            setMessages([])
          }
        } catch (parseError) {
          console.error("[v0] JSON parse error:", parseError)
          console.error("[v0] Response was:", text)
          setMessages([])
        }
      } else {
        console.error("[v0] Response not ok:", response.status, response.statusText)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch messages:", error)
      setMessages([])
    }
  }

  const handleJoin = () => {
    if (username.trim()) {
      setIsJoined(true)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsLoading(true)
    try {
      console.log("[v0] Sending message from client...")
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, message: message.trim() }),
      })

      if (response.ok) {
        setMessage("")
        fetchMessages()
      } else {
        const errorText = await response.text()
        console.error("[v0] Failed to send message:", response.status, errorText)
      }
    } catch (error) {
      console.error("[v0] Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isJoined) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="neo-depth p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-mono font-bold mb-2">Join MMS Chat</h2>
          </div>
          <div className="space-y-4">
            <Input
              placeholder="Your name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              className="neo-depth-subtle"
              maxLength={50}
            />
            <Button onClick={handleJoin} disabled={!username.trim()} className="w-full neo-depth">
              Join Chat
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[70vh]">
      {/* Chat Header */}
      <div className="neo-depth p-4 mb-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-mono font-semibold">youngmook</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Chatting as <span className="font-medium text-foreground">{username}</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <Card className="neo-depth-inset flex-1 p-4 overflow-hidden">
        <div className="h-full overflow-y-auto space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>No messages yet. Be the first to say hello! 👋</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="group">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-mono font-bold text-primary">
                      {msg.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{msg.username}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-pretty break-words">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="mt-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="neo-depth-subtle flex-1"
            disabled={isLoading}
            maxLength={500}
          />
          <Button type="submit" disabled={!message.trim() || isLoading} className="neo-depth px-4">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
