"use client"

import { X, Users, MessageSquare } from "lucide-react"
import { useState } from "react"

interface MeetingSidebarProps {
  isOpen: boolean
  onClose: () => void
  showChat: boolean
}

export function MeetingSidebar({ isOpen, onClose, showChat }: MeetingSidebarProps) {
  const [messages, setMessages] = useState<Array<{ id: string; name: string; text: string }>>([
    { id: "1", name: "System", text: "Welcome to the meeting!" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const participants = [
    { id: "1", name: "You" },
    { id: "2", name: "John Doe" },
    { id: "3", name: "Jane Smith" },
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          name: "You",
          text: newMessage,
        },
      ])
      setNewMessage("")
    }
  }

  if (!isOpen) return null

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          {showChat ? (
            <>
              <MessageSquare className="w-5 h-5" />
              Chat
            </>
          ) : (
            <>
              <Users className="w-5 h-5" />
              Participants
            </>
          )}
        </h3>
        <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
          <X className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {showChat ? (
          <div className="space-y-3 p-4">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-1">
                <p className="text-xs font-semibold text-primary">{msg.name}</p>
                <p className="text-sm text-foreground bg-muted/30 p-2 rounded-lg">{msg.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-semibold text-primary">{participant.name.charAt(0).toUpperCase()}</span>
                </div>
                <span className="font-medium text-foreground">{participant.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Input */}
      {showChat && (
        <div className="p-4 border-t border-border space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
