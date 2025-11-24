"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { FeatureCard } from "@/components/feature-card"
import { Lock, Share2, MessageSquare, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen transition-theme">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Blur */}
        <div className="absolute inset-0 wemeet-blur-hero" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-foreground max-w-3xl">
              <span className="text-pretty">Secure, Simple, Private Video Meetings</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              No installation. No tracking. Just meet.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Create Room
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                Join Room by ID
              </Link>
              <Link href="/guide" className="px-8 py-3 text-primary font-semibold hover:underline transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Choose WeMeet?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Lock className="w-8 h-8" />}
              title="Privacy-First"
              description="Your meetings are end-to-end encrypted. We don't track, store, or analyze your data."
            />
            <FeatureCard
              icon={<Share2 className="w-8 h-8" />}
              title="Screen Sharing"
              description="Share your screen effortlessly. Perfect for presentations, tutorials, and collaboration."
            />
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Real-time Chat"
              description="Send messages, links, and files during calls without leaving the meeting."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Collaborative Tools"
              description="Use built-in tools for polls, whiteboarding, and note-taking in real time."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© 2025 WeMeet. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Terms
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
