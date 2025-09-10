import { sql } from "@/lib/db"
import { memoryStore } from "@/lib/memory-store"
import { NextResponse } from "next/server"

async function createChatTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `
    await sql`
      CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC)
    `
    console.log("[v0] Chat table created successfully")
    return true
  } catch (error) {
    console.log("[v0] Failed to create chat table:", error)
    return false
  }
}

async function testTableExists() {
  try {
    const result = await sql`SELECT COUNT(*) as count FROM chat_messages`
    console.log("[v0] Chat table exists and accessible, current message count:", result[0]?.count || 0)
    return true
  } catch (error) {
    console.log("[v0] Chat table does not exist or not accessible:", error.message)
    console.log("[v0] Attempting to create table...")
    return await createChatTable()
  }
}

export async function GET() {
  console.log("[v0] Fetching messages...")

  try {
    const tableExists = await testTableExists()

    if (tableExists) {
      try {
        const messages = await sql`
          SELECT id, username, message, created_at 
          FROM chat_messages 
          ORDER BY created_at DESC 
          LIMIT 50
        `
        console.log("[v0] Messages fetched from database successfully:", messages.length)
        return NextResponse.json(messages.reverse())
      } catch (dbError) {
        console.log("[v0] Database SELECT query failed:", dbError.message)
        console.log("[v0] Falling back to memory store")
        const messages = memoryStore.getMessages()
        return NextResponse.json(messages)
      }
    } else {
      const messages = memoryStore.getMessages()
      console.log("[v0] Messages fetched from memory store:", messages.length)
      return NextResponse.json(messages)
    }
  } catch (error) {
    console.log("[v0] General error, using memory store:", error.message)
    const messages = memoryStore.getMessages()
    return NextResponse.json(messages)
  }
}

export async function POST(request: Request) {
  try {
    console.log("[v0] Posting message...")
    const { username, message } = await request.json()

    if (!username || !message) {
      return NextResponse.json({ error: "Username and message are required" }, { status: 400 })
    }

    if (username.length > 50 || message.length > 500) {
      return NextResponse.json({ error: "Username or message too long" }, { status: 400 })
    }

    try {
      const tableExists = await testTableExists()

      if (tableExists) {
        const result = await sql`
          INSERT INTO chat_messages (username, message)
          VALUES (${username.trim()}, ${message.trim()})
          RETURNING id, username, message, created_at
        `
        console.log("[v0] Message posted to database successfully:", result[0]?.id)
      } else {
        memoryStore.addMessage(username.trim(), message.trim())
        console.log("[v0] Message posted to memory store successfully")
      }
    } catch (dbError) {
      console.log("[v0] Database INSERT operation failed:", dbError.message)
      console.log("[v0] Using memory store as fallback")
      memoryStore.addMessage(username.trim(), message.trim())
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error in POST request:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
