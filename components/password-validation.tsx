"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface PasswordValidationProps {
  roomId: string
  isOpen: boolean
  onPasswordValid: () => void
}

export function PasswordValidation({ roomId, isOpen, onPasswordValid }: PasswordValidationProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate validation delay
    setTimeout(() => {
      // Get stored room settings from sessionStorage
      const roomSettings = sessionStorage.getItem(`room-${roomId}`)
      if (!roomSettings) {
        setError("Room not found")
        setIsLoading(false)
        return
      }

      const settings = JSON.parse(roomSettings)
      if (settings.password === password) {
        onPasswordValid()
        sessionStorage.setItem(`room-${roomId}-user-password-valid`, "true")
      } else {
        setError("Invalid password")
      }
      setIsLoading(false)
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md shadow-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Enter Room Password</h2>
        <p className="text-muted-foreground text-sm mb-6">This room is password protected</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            autoFocus
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Validating..." : "Enter Room"}
          </button>
        </form>
      </div>
    </div>
  )
}
