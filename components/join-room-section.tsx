"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { getJoinToken } from "@/lib/wemeet-api"
import { useUser } from "@/hooks/useUser"

export function JoinRoomSection() {
  const { user } = useUser()
  const [roomId, setRoomId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    const trimmedId = roomId.trim().toUpperCase()
    if (!trimmedId) {
      setError("Please enter a room ID")
      return
    }

    if (!user?.id) {
      setError("Please login first")
      return
    }

    setIsLoading(true)

    try {
      // Get user info from localStorage
      const userName = localStorage.getItem("userName") || 
                       localStorage.getItem("userEmail")?.split("@")[0] || 
                       "User"
      
      // Get join token from WeMeet-server
      const token = await getJoinToken(trimmedId, {
        name: userName,
        user_id: user.id,
        is_admin: false,
      })

      // Redirect to wemeet-client with access token
      window.location.href = `/?access_token=${token}`
    } catch (error) {
      console.error("Error joining room:", error)
      setError(error instanceof Error ? error.message : "Room not found or failed to join")
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-8 space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Join an Existing Room</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Enter a room ID to join an ongoing meeting
        </p>
      </div>

      <form onSubmit={handleJoin} className="space-y-4">
        {error && (
          <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

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
