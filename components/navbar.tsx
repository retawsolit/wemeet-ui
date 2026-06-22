"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-primary">
          WeMeet
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/login" className="text-foreground hover:text-primary transition-colors">
            Login
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-foreground" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95">
          <div className="px-4 py-3 space-y-3">
            <Link href="/login" className="block text-foreground hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/register" className="block text-foreground hover:text-primary transition-colors">
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
