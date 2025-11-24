"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface WaitingRoomProps {
  roomId: string
  userName: string
  isOpen: boolean
  onApproved: () => void
}

export function WaitingRoom({ roomId, userName, isOpen, onApproved }: WaitingRoomProps) {
  const [waitTime, setWaitTime] = useState(0)

  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setWaitTime((prev) => prev + 1)
    }, 1000)

    // Simulate host approval after 5 seconds (for demo)
    const approval = setTimeout(() => {
      const approved = Math.random() > 0.3 // 70% chance of approval
      if (approved) {
        sessionStorage.setItem(`room-${roomId}-${userName}-approved`, "true")
        onApproved()
      }
    }, 5000)

    return () => {
      clearInterval(timer)
      clearTimeout(approval)
    }
  }, [isOpen, roomId, userName, onApproved])

  if (!isOpen) return null

  const minutes = Math.floor(waitTime / 60)
  const seconds = waitTime % 60

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center space-y-6 p-6">
        <div className="flex justify-center">
          <div className="p-4 bg-primary/10 rounded-full">
            <Clock className="w-12 h-12 text-primary animate-spin" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Waiting Room</h2>
          <p className="text-muted-foreground">Please wait for the host to let you in</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-3">
          <p className="text-sm text-muted-foreground">
            Your name: <span className="font-semibold text-foreground">{userName}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Waiting time:{" "}
            <span className="font-semibold text-foreground">
              {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
            </span>
          </p>
        </div>

        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors"
        >
          Cancel & Go Back
        </button>
      </div>
    </div>
  )
}
