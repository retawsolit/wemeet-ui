"use client"

import { DashboardNavbar } from "@/components/dashboard-navbar"
import { CreateRoomSection } from "@/components/create-room-section"
import { JoinRoomSection } from "@/components/join-room-section"
import { MeetingHistory } from "@/components/meeting-history"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userName = localStorage.getItem("userName")
    if (!userName) {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background transition-theme">
      <DashboardNavbar />

      {/* Main Content */}
      <main className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Meeting Dashboard</h1>
            <p className="text-muted-foreground">Create a new meeting or join an existing one</p>
          </div>

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            <CreateRoomSection />
            <JoinRoomSection />
          </div>

          {/* Meeting History */}
          <MeetingHistory />

          {/* Info Section */}
          <div className="bg-muted/30 border border-border rounded-lg p-6 text-center text-muted-foreground text-sm space-y-3 mt-12">
            <p>
              💡 <strong>Pro Tip:</strong> Share your room ID with others to invite them to your meeting.
            </p>
            <p>🔒 All meetings are end-to-end encrypted for maximum privacy.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
