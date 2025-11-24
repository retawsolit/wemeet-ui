"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Share2,
  MessageSquare,
  Users,
  CreditCard as Record,
  Square,
  LogOut,
  Copy,
} from "lucide-react"

interface MeetingToolbarProps {
  roomId: string
  onChatToggle: () => void
  onParticipantsToggle: () => void
}

export function MeetingToolbar({ roomId, onChatToggle, onParticipantsToggle }: MeetingToolbarProps) {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(false)
  const [hasVideo, setHasVideo] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleLeaveRoom = () => {
    const confirmed = confirm("Are you sure you want to leave the meeting?")
    if (confirmed) {
      router.push("/dashboard")
    }
  }

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-card border-t border-border p-4">
      <div className="flex flex-col gap-4">
        {/* First Row - Main Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Mic Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-full transition-colors ${
              isMuted
                ? "bg-destructive/80 hover:bg-destructive text-white"
                : "bg-muted hover:bg-muted/80 text-foreground"
            }`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Video Toggle */}
          <button
            onClick={() => setHasVideo(!hasVideo)}
            className={`p-3 rounded-full transition-colors ${
              !hasVideo
                ? "bg-destructive/80 hover:bg-destructive text-white"
                : "bg-muted hover:bg-muted/80 text-foreground"
            }`}
            title={hasVideo ? "Stop Video" : "Start Video"}
          >
            {hasVideo ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          {/* Screen Share */}
          <button
            className="p-3 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
            title="Share Screen"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {/* Recording Toggle */}
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-3 rounded-full transition-colors ${
              isRecording
                ? "bg-destructive/80 hover:bg-destructive text-white"
                : "bg-muted hover:bg-muted/80 text-foreground"
            }`}
            title={isRecording ? "Stop Recording" : "Start Recording"}
          >
            {isRecording ? <Square className="w-5 h-5" /> : <Record className="w-5 h-5" />}
          </button>

          {/* Chat */}
          <button
            onClick={onChatToggle}
            className="p-3 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
            title="Toggle Chat"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* Participants */}
          <button
            onClick={onParticipantsToggle}
            className="p-3 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
            title="Show Participants"
          >
            <Users className="w-5 h-5" />
          </button>

          {/* Leave Room */}
          <button
            onClick={handleLeaveRoom}
            className="p-3 rounded-full bg-destructive/80 hover:bg-destructive text-white transition-colors"
            title="Leave Room"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Second Row - Room ID and Copy */}
        <div className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-2">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-sm text-muted-foreground">Room ID:</span>
            <code className="text-sm font-mono font-semibold text-foreground">{roomId}</code>
          </div>
          <button
            onClick={handleCopyRoomId}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
            title="Copy Room ID"
          >
            <Copy className="w-4 h-4" />
          </button>
          {copied && <span className="text-xs text-primary ml-2">Copied!</span>}
        </div>
      </div>
    </div>
  )
}
