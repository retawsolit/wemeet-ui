"use client"

import type React from "react"

import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  linkText?: string
  linkHref?: string
}

export function AuthLayout({ children, title, subtitle, linkText, linkHref }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background transition-theme flex flex-col">
      {/* Top bar with theme toggle */}
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>

      {/* Auth content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-card border border-border rounded-lg shadow-lg p-8 space-y-6">
            {/* Header */}
            <div className="space-y-2 text-center">
              <Link href="/" className="inline-block font-bold text-2xl text-primary mb-4">
                WeMeet
              </Link>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
            </div>

            {/* Form */}
            {children}

            {/* Link */}
            {linkText && linkHref && (
              <div className="text-center text-sm text-muted-foreground">
                {linkText}{" "}
                <Link href={linkHref} className="text-primary hover:underline font-semibold">
                  {linkText.includes("?") ? "Sign up" : "Sign in"}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
