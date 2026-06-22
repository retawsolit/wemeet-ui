"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Meeting {
  id: string
  title: string
  created_at: string
  duration?: string
  host_id?: string
  status: "Completed" | "Live"
  participants?: number
}

export function MeetingHistory() {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from("rooms")
        .select("id, title, created_at, host_id, status, participants")

      if (error) {
        console.error("Failed to fetch meetings:", error)
      } else {
        setMeetings(data as Meeting[])
      }

      setLoading(false)
    }

    fetchMeetings()
  }, [])

  const getStatusBadge = (status: string) => {
    return status === "Live" ? (
      <Badge className="bg-red-500 hover:bg-red-600 text-white animate-pulse">Live</Badge>
    ) : (
      <Badge className="bg-green-600 hover:bg-green-700 text-white">Completed</Badge>
    )
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Meeting History</CardTitle>
        <CardDescription>View and manage your past meetings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Meeting Title</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Duration</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Host</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Participants</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-6 px-4 text-center text-muted-foreground">
                    Loading...
                  </td>
                </tr>
              ) : meetings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 px-4 text-center text-muted-foreground">
                    No meetings found.
                  </td>
                </tr>
              ) : (
                meetings.map((meeting) => (
                  <tr key={meeting.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{meeting.title}</td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">
                      {new Date(meeting.created_at).toLocaleDateString()} <br />
                      {new Date(meeting.created_at).toLocaleTimeString()}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{meeting.duration || "N/A"}</td>
                    <td className="py-4 px-4 text-muted-foreground">{meeting.host_id || "Unknown"}</td>
                    <td className="py-4 px-4 text-muted-foreground">{meeting.participants || 0}</td>
                    <td className="py-4 px-4">{getStatusBadge(meeting.status)}</td>
                    <td className="py-4 px-4">
                      <Link href={`/meeting/${meeting.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-primary hover:text-primary bg-transparent"
                        >
                          View Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
