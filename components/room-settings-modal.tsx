"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"

interface RoomSettings {
  requirePassword: boolean
  password: string
  waitingRoom: boolean
  muteOnEntry: boolean
  allowGuests: boolean
}

interface RoomSettingsModalProps {
  isOpen: boolean
  onSave?: (settings: RoomSettings) => void
  onClose: () => void
  roomId: string
}

export function RoomSettingsModal({ isOpen, onSave, onClose, roomId }: RoomSettingsModalProps) {
  const [settings, setSettings] = useState<RoomSettings>({
    requirePassword: false,
    password: "",
    waitingRoom: false,
    muteOnEntry: false,
    allowGuests: true,
  })

  useEffect(() => {
    if (isOpen && roomId) {
      const fetchSettings = async () => {
        const { data: roomData } = await supabase
          .from("rooms")
          .select("is_public")
          .eq("id", roomId)
          .single()

        const { data: roomSettingsData } = await supabase
          .from("room_settings")
          .select("*")
          .eq("room_id", roomId)
          .single()

        if (roomData && roomSettingsData) {
          setSettings({
            requirePassword: !roomData.is_public,
            password: "",
            waitingRoom: roomSettingsData.waiting_room,
            muteOnEntry: roomSettingsData.mute_on_entry,
            allowGuests: roomSettingsData.allow_guests,
          })
        }
      }

      fetchSettings()
    }
  }, [isOpen, roomId])

  const handleSave = async () => {
    if (settings.requirePassword && settings.password.trim() !== "") {
      const passwordHash = await bcrypt.hash(settings.password, 10)

      await supabase
        .from("rooms")
        .update({ is_public: false, password_hash: passwordHash })
        .eq("id", roomId)
    } else {
      await supabase
        .from("rooms")
        .update({ is_public: true, password_hash: null })
        .eq("id", roomId)
    }

    await supabase.from("room_settings").upsert({
      room_id: roomId,
      waiting_room: settings.waitingRoom,
      mute_on_entry: settings.muteOnEntry,
      allow_guests: settings.allowGuests,
    })

    onSave?.(settings)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Room Settings</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Password Setting */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Require Room Password</label>
              <Switch
                checked={settings.requirePassword}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requirePassword: checked })
                }
              />
            </div>
            {settings.requirePassword && (
              <Input
                type="password"
                placeholder="Enter room password"
                value={settings.password}
                onChange={(e) =>
                  setSettings({ ...settings, password: e.target.value })
                }
                className="w-full"
              />
            )}
          </div>

          {/* Waiting Room */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-foreground block">Waiting Room</label>
              <p className="text-xs text-muted-foreground">Guests wait for approval to join</p>
            </div>
            <Switch
              checked={settings.waitingRoom}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, waitingRoom: checked })
              }
            />
          </div>

          {/* Mute on Entry */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-foreground block">Mute on Entry</label>
              <p className="text-xs text-muted-foreground">Participants muted by default</p>
            </div>
            <Switch
              checked={settings.muteOnEntry}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, muteOnEntry: checked })
              }
            />
          </div>

          {/* Allow Guests */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-foreground block">Allow Guest Users</label>
              <p className="text-xs text-muted-foreground">Non-registered users can join</p>
            </div>
            <Switch
              checked={settings.allowGuests}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, allowGuests: checked })
              }
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
