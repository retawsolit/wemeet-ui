"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    // Store user info in localStorage
    localStorage.setItem("userEmail", email)
    localStorage.setItem("userId", data.user.id)
    // Set userName from email (before @) or use user metadata if available
    const userName = data.user.user_metadata?.full_name || 
                     data.user.user_metadata?.name || 
                     email.split("@")[0] || 
                     "User"
    localStorage.setItem("userName", userName)

    router.push("/dashboard")
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Input */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
        />
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
        />
      </div>

      {/* Remember Me */}
      <div className="flex items-center gap-2">
        <input
          id="remember"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="w-4 h-4 rounded border-border cursor-pointer"
        />
        <label htmlFor="remember" className="text-sm text-foreground cursor-pointer">
          Remember me
        </label>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Login Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {/* Back to Home Link */}
      <div className="text-center pt-2">
         <Link 
            href="/" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
         >
            <span>←</span> Back to Home
         </Link>
      </div>
    </form>
  )
}
