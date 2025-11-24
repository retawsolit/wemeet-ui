"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function RoomSettings() {
  const [settings, setSettings] = useState({
    roomPassword: false,
    password: "",
    waitingRoom: false,
    muteOnEntry: false,
    allowGuests: true,
  })

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

  const handleSave = () => {
    console.log("Room settings saved:", settings)
    // TODO: Send to API
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
          <Button onClick={handleSave} className="w-full mt-6 bg-primary hover:bg-primary/90 text-white">
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
