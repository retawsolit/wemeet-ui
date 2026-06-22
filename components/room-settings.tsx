"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import bcrypt from "bcryptjs"
import { supabase } from "@/lib/supabase"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function RoomSettings() {
  const params = useParams()
  const roomId = params?.id as string
  const [isSaving, setIsSaving] = useState(false)

  const [settings, setSettings] = useState({
    roomPassword: false,
    password: "",
    waitingRoom: false,
    muteOnEntry: false,
    allowGuests: true,
  })

  useEffect(() => {
    const fetchRoomSettings = async () => {
      if (!roomId) return

      const { data, error } = await supabase
        .from("rooms")
        .select("password_hash, settings")
        .eq("id", roomId)
        .single()

      if (error) {
        console.error("Failed to fetch room settings:", error)
        return
      }

      setSettings({
        roomPassword: !!data.password_hash,
        password: "",
        waitingRoom: data.settings?.waiting_room || false,
        muteOnEntry: data.settings?.mute_on_entry || false,
        allowGuests: data.settings?.allow_guest ?? true,
      })
    }

    fetchRoomSettings()
  }, [roomId])

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({
      ...prev,
      password: e.target.value,
    }))
  }

  const handleSave = async () => {
    if (!roomId) return
    setIsSaving(true)

    try {
      const updates: any = {
        updated_at: new Date().toISOString(),
        settings: {
          waiting_room: settings.waitingRoom,
          mute_on_entry: settings.muteOnEntry,
          allow_guest: settings.allowGuests,
        },
      }

      if (settings.roomPassword && settings.password) {
        updates.password_hash = await bcrypt.hash(settings.password, 12)
      } else {
        updates.password_hash = null
      }

      const { error } = await supabase.from("rooms").update(updates).eq("id", roomId)

      if (error) {
        toast.error("Failed to save room settings")
        console.error("Supabase update error:", error)
      } else {
        toast.success("Room settings saved successfully")
        setSettings((prev) => ({ ...prev, password: "" })) // clear plaintext
      }
    } catch (err) {
      toast.error("An error occurred while saving")
      console.error("Save error:", err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Settings</CardTitle>
        <CardDescription>Configure your meeting room preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Room Password */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="space-y-1">
              <Label className="text-foreground font-medium">Room Password</Label>
              <p className="text-sm text-muted-foreground">Require a password to join this room</p>
            </div>
            <Switch checked={settings.roomPassword} onCheckedChange={() => handleToggle("roomPassword")} />
          </div>

          {/* Password Input */}
          {settings.roomPassword && (
            <div className="pl-4">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter room password"
                value={settings.password}
                onChange={handlePasswordChange}
                className="mt-2"
              />
            </div>
          )}

          {/* Waiting Room */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="space-y-1">
              <Label className="text-foreground font-medium">Waiting Room</Label>
              <p className="text-sm text-muted-foreground">Guests wait for approval before entering</p>
            </div>
            <Switch checked={settings.waitingRoom} onCheckedChange={() => handleToggle("waitingRoom")} />
          </div>

          {/* Mute on Entry */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="space-y-1">
              <Label className="text-foreground font-medium">Mute Participants on Entry</Label>
              <p className="text-sm text-muted-foreground">New participants will join muted</p>
            </div>
            <Switch checked={settings.muteOnEntry} onCheckedChange={() => handleToggle("muteOnEntry")} />
          </div>

          {/* Allow Guests */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="space-y-1">
              <Label className="text-foreground font-medium">Allow Guest Users</Label>
              <p className="text-sm text-muted-foreground">Allow users without accounts to join</p>
            </div>
            <Switch checked={settings.allowGuests} onCheckedChange={() => handleToggle("allowGuests")} />
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full mt-6 bg-primary hover:bg-primary/90 text-white"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
