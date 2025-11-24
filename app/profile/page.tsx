"use client"

import { DashboardNavbar } from "@/components/dashboard-navbar"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User"
    const email = localStorage.getItem("userEmail") || "user@example.com"
    setUserName(name)
    setUserEmail(email)

    // Check if user is logged in
    if (!name) {
      router.push("/login")
    }
  }, [router])

  const handleSaveProfile = async () => {
    setIsLoading(true)

    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 500))

    localStorage.setItem("userName", userName)
    localStorage.setItem("userEmail", userEmail)

    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background transition-theme">
      <DashboardNavbar />

      <main className="container max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Profile Card */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your WeMeet account information</p>
          </div>

          {/* Success Message */}
          {saveSuccess && (
            <div className="p-4 bg-green-500/10 text-green-600 rounded-lg text-sm">Profile updated successfully!</div>
          )}

          {/* Profile Form */}
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-4xl font-bold text-primary">{userName.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{userName}</h3>
                <p className="text-muted-foreground text-sm">{userEmail}</p>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
              <Link
                href="/dashboard"
                className="px-6 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Additional Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Account Information</h3>
            <div className="grid gap-4">
              <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-muted-foreground">Account Status</span>
                <span className="font-semibold text-green-600">Active</span>
              </div>
              <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-semibold text-foreground">2025</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
