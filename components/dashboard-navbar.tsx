"use client"

import Link from "next/link"
import { LogOut, User, Settings } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

export function DashboardNavbar() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User"
    setUserName(name)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  return (
    <nav className="border-b border-border bg-card">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-primary">
          WeMeet
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-foreground text-sm">
            Hi, <span className="font-semibold">{userName}</span>
          </div>

          <ThemeToggle />

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
              aria-label="User menu"
            >
              <Settings className="w-5 h-5" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted transition-colors"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-muted transition-colors border-t border-border"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
