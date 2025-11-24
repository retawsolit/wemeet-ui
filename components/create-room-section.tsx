"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { RoomSettingsModal } from "@/components/room-settings-modal"

interface RoomSettings {
  requirePassword: boolean
  password: string
  waitingRoom: boolean
  muteOnEntry: boolean
  allowGuests: boolean
}

export function CreateRoomSection() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const handleCreateRoom = async () => {
    setShowSettings(true)
  }

  const handleSaveSettings = async (settings: RoomSettings) => {
    setIsLoading(true)
    // Generate a random room ID
    const roomId = Math.random().toString(36).substring(2, 10).toUpperCase()

    // Store room settings in sessionStorage (for demo purposes)
    sessionStorage.setItem(`room-${roomId}`, JSON.stringify(settings))
    sessionStorage.setItem(`room-${roomId}-host`, "true")
    sessionStorage.setItem(`room-${roomId}-created-at`, new Date().toISOString())

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    router.push(`/room/${roomId}`)
  }

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-8 text-center space-y-4 hover:shadow-lg transition-shadow">
        <div className="flex justify-center">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Plus className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Start a New Meeting</h3>
          <p className="text-muted-foreground text-sm mb-6">
            Create a new room and get a unique meeting ID to share with others
          </p>
        </div>
        <button
          onClick={handleCreateRoom}
          disabled={isLoading}
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isLoading ? "Creating..." : "Create Room"}
        </button>
      </div>

      <RoomSettingsModal isOpen={showSettings} onSave={handleSaveSettings} onClose={() => setShowSettings(false)} />
    </>
  )
}
