"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

export function JoinRoomSection() {
  const router = useRouter()
  const [roomId, setRoomId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!roomId.trim()) {
      setError("Please enter a room ID")
      return
    }

    setIsLoading(true)

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const upperRoomId = roomId.toUpperCase()
    // Store the room ID to check settings in the room page
    sessionStorage.setItem("joining-room-id", upperRoomId)

    router.push(`/room/${upperRoomId}?join=true`)
  }

  return (
    <div className="bg-card border border-border rounded-lg p-8 space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Join an Existing Room</h3>
        <p className="text-muted-foreground text-sm mb-6">Enter a room ID to join an ongoing meeting</p>
      </div>

      <form onSubmit={handleJoin} className="space-y-4">
        {error && <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

        <input
          type="text"
          placeholder="Enter room ID (e.g., ABC12345)"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
        >
          {isLoading ? (
            "Joining..."
          ) : (
            <>
              Join Room
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
