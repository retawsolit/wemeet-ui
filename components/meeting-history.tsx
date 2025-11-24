"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data - replace with real data from API
const meetingData = [
  {
    id: "1",
    title: "Team Standup",
    date: "2024-01-15",
    startTime: "10:00 AM",
    endTime: "10:30 AM",
    duration: "30 min",
    host: "John Doe",
    status: "Completed",
    participants: 8,
    hasRecording: true,
  },
  {
    id: "2",
    title: "Design Review",
    date: "2024-01-14",
    startTime: "2:00 PM",
    endTime: "3:15 PM",
    duration: "1 hr 15 min",
    host: "Jane Smith",
    status: "Completed",
    participants: 5,
    hasRecording: true,
  },
  {
    id: "3",
    title: "Client Presentation",
    date: "2024-01-13",
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    duration: "1 hr",
    host: "Mike Johnson",
    status: "Completed",
    participants: 12,
    hasRecording: false,
  },
  {
    id: "4",
    title: "Weekly Sync",
    date: "2024-01-12",
    startTime: "3:00 PM",
    endTime: "3:45 PM",
    duration: "45 min",
    host: "Sarah Lee",
    status: "Live",
    participants: 6,
    hasRecording: false,
  },
]

export function MeetingHistory() {
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
                <th className="text-left py-3 px-4 font-semibold text-foreground">Date & Time</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Duration</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Host</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Participants</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetingData.map((meeting) => (
                <tr key={meeting.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 text-foreground font-medium">{meeting.title}</td>
                  <td className="py-4 px-4 text-muted-foreground text-sm">
                    {meeting.date} <br /> {meeting.startTime} - {meeting.endTime}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{meeting.duration}</td>
                  <td className="py-4 px-4 text-muted-foreground">{meeting.host}</td>
                  <td className="py-4 px-4 text-muted-foreground">{meeting.participants}</td>
                  <td className="py-4 px-4">{getStatusBadge(meeting.status)}</td>
                  <td className="py-4 px-4">
                    <Link href={`/meeting/${meeting.id}`}>
                      <Button variant="outline" size="sm" className="text-primary hover:text-primary bg-transparent">
                        View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
