"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { StepCard } from "@/components/step-card"
import { Plus, Volume2, Share2, Zap } from "lucide-react"

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-background transition-theme">
      <Navbar />

      <main className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">How to Use WeMeet</h1>
          <p className="text-lg text-muted-foreground">A simple guide to get started with secure video meetings</p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          <StepCard
            number={1}
            icon={<Plus className="w-6 h-6" />}
            title="Create or Join a Room"
            description="Go to your dashboard and either create a new meeting room or join an existing one by entering the room ID. Each room is automatically assigned a unique identifier."
          />
          <StepCard
            number={2}
            icon={<Volume2 className="w-6 h-6" />}
            title="Enable Mic/Camera"
            description="Allow WeMeet to access your microphone and camera when prompted. You can toggle these on and off during the meeting using the toolbar buttons."
          />
          <StepCard
            number={3}
            icon={<Share2 className="w-6 h-6" />}
            title="Invite Others"
            description="Copy your room ID from the meeting toolbar and share it with others via email, chat, or any communication method. They can join directly using that ID."
          />
          <StepCard
            number={4}
            icon={<Zap className="w-6 h-6" />}
            title="Collaborate in Real Time"
            description="Use the built-in tools including screen sharing, real-time chat, and participant management. All data is encrypted end-to-end for complete privacy."
          />
        </div>

        {/* Features List */}
        <div className="bg-card border border-border rounded-lg p-8 space-y-6 mb-16">
          <h2 className="text-2xl font-bold text-foreground">Key Features</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Screen Sharing</h3>
              <p className="text-muted-foreground">
                Share your entire screen or specific applications with other participants.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Real-time Chat</h3>
              <p className="text-muted-foreground">
                Send text messages and files to participants without leaving the meeting.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Recording</h3>
              <p className="text-muted-foreground">
                Record your meetings for future reference. All recordings are secure and private.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Participant Management</h3>
              <p className="text-muted-foreground">
                View all participants, manage muting, and control access to your meeting.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 bg-muted/30 border border-border rounded-lg p-8">
          <h3 className="text-xl font-bold text-foreground">Ready to Get Started?</h3>
          <p className="text-muted-foreground">
            Create your first meeting room and experience secure video conferencing today.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/50 mt-16">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground text-sm">© 2025 WeMeet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
