"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { RoomSettingsModal } from "@/components/room-settings-modal"
import { useUser } from "@/hooks/useUser"
import { createWeMeetRoom, getJoinToken } from "@/lib/wemeet-api"
import type { DashboardRoomSettings } from "@/lib/defaultRoomMetadata"

interface RoomSettings {
  requirePassword: boolean
  password: string
  waitingRoom: boolean
  muteOnEntry: boolean
  allowGuests: boolean
}

export function CreateRoomSection() {
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [newRoomId, setNewRoomId] = useState<string | null>(null)
  const { user } = useUser()

  const handleCreateRoom = async () => {
    const roomId = Math.random().toString(36).substring(2, 10).toUpperCase()
    setNewRoomId(roomId)
    setShowSettings(true)
  }

  const handleSaveSettings = async (settings: RoomSettings) => {
    if (!newRoomId || !user?.id) return
    setIsLoading(true)

    try {
      const roomTitle = `Meeting Room ${newRoomId}`
      const dashboardSettings: DashboardRoomSettings = {
        roomTitle,
        waitingRoom: settings.waitingRoom,
        muteOnEntry: settings.muteOnEntry,
        allowGuests: settings.allowGuests,
      }
      await createWeMeetRoom(newRoomId, dashboardSettings)

      // Get user info from localStorage
      const userName = localStorage.getItem("userName") || 
                       localStorage.getItem("userEmail")?.split("@")[0] || 
                       "User"
      
      // Get join token
      const token = await getJoinToken(newRoomId, {
        name: userName,
        user_id: user.id,
        is_admin: true, // Creator is admin
      })

      // Redirect to wemeet-client with access token
      window.location.href = `/?access_token=${token}`
    } catch (error) {
      console.error("Error creating room:", error)
      alert(error instanceof Error ? error.message : "Failed to create room")
      setIsLoading(false)
    }
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

      {newRoomId && (
        <RoomSettingsModal
          isOpen={showSettings}
          onSave={handleSaveSettings}
          onClose={() => setShowSettings(false)}
          roomId={newRoomId}
        />
      )}
    </>
  )
}
