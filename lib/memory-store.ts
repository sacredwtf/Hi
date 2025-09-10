interface ChatMessage {
  id: number
  username: string
  message: string
  created_at: string
}

let messages: ChatMessage[] = []
let nextId = 1

export const memoryStore = {
  getMessages: (): ChatMessage[] => {
    return messages.slice(-50) // Return last 50 messages
  },

  addMessage: (username: string, message: string): ChatMessage => {
    const newMessage: ChatMessage = {
      id: nextId++,
      username,
      message,
      created_at: new Date().toISOString(),
    }
    messages.push(newMessage)

    // Keep only last 100 messages to prevent memory issues
    if (messages.length > 100) {
      messages = messages.slice(-100)
    }

    return newMessage
  },
}
