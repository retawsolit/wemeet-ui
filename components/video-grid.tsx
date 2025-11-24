"use client"

import { MicOff, VideoOff } from "lucide-react"

interface Participant {
  id: string
  name: string
  isMuted: boolean
  hasVideo: boolean
}

interface VideoGridProps {
  participants: Participant[]
}

export function VideoGrid({ participants }: VideoGridProps) {
  return (
    <div
      className={`grid gap-4 h-full ${
        participants.length === 1
          ? "grid-cols-1"
          : participants.length === 2
            ? "grid-cols-2"
            : participants.length === 3 || participants.length === 4
              ? "grid-cols-2"
              : "grid-cols-3"
      }`}
    >
      {participants.map((participant) => (
        <div key={participant.id} className="relative bg-muted rounded-lg overflow-hidden group">
          {/* Video placeholder */}
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{participant.name.charAt(0).toUpperCase()}</span>
              </div>
              <p className="text-foreground font-semibold">{participant.name}</p>
              {participant.isMuted && (
                <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs mt-2">
                  <MicOff className="w-3 h-3" />
                  <span>Muted</span>
                </div>
              )}
            </div>
          </div>

          {/* Status indicators */}
          <div className="absolute top-3 right-3 flex gap-2">
            {!participant.hasVideo && (
              <div className="bg-destructive/80 p-2 rounded-lg">
                <VideoOff className="w-4 h-4 text-white" />
              </div>
            )}
            {participant.isMuted && (
              <div className="bg-destructive/80 p-2 rounded-lg">
                <MicOff className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* Hover info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
            <p className="text-white font-medium text-sm">{participant.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
