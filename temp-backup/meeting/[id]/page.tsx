// "use client"

// import { useParams } from "next/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { DashboardNavbar } from "@/components/dashboard-navbar"
// import Link from "next/link"

// // Mock data - replace with real data from API
// const meetingDetailsData: Record<string, any> = {
//   "1": {
//     title: "Team Standup",
//     date: "January 15, 2024",
//     startTime: "10:00 AM",
//     endTime: "10:30 AM",
//     duration: "30 minutes",
//     host: "John Doe",
//     participants: [
//       { name: "John Doe", joinTime: "10:00 AM", leaveTime: "10:30 AM" },
//       { name: "Jane Smith", joinTime: "10:02 AM", leaveTime: "10:30 AM" },
//       { name: "Mike Johnson", joinTime: "10:01 AM", leaveTime: "10:28 AM" },
//       { name: "Sarah Lee", joinTime: "10:03 AM", leaveTime: "10:30 AM" },
//       { name: "Alex Chen", joinTime: "10:05 AM", leaveTime: "10:25 AM" },
//     ],
//     chatMessages: [
//       { user: "John Doe", message: "Good morning everyone!", time: "10:00 AM" },
//       { user: "Jane Smith", message: "Hi! Ready to start.", time: "10:01 AM" },
//       { user: "Mike Johnson", message: "Let's discuss Q1 goals", time: "10:05 AM" },
//       { user: "Sarah Lee", message: "I'll share the report", time: "10:08 AM" },
//       { user: "John Doe", message: "Thanks everyone, great meeting!", time: "10:29 AM" },
//     ],
//     hasRecording: true,
//     recordingUrl: "#",
//   },
// }

// export default function MeetingDetailPage() {
//   const params = useParams()
//   const meetingId = params.id as string
//   const meeting = meetingDetailsData[meetingId]

//   if (!meeting) {
//     return (
//       <div className="min-h-screen bg-background transition-theme">
//         <DashboardNavbar />
//         <main className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="text-center">
//             <p className="text-muted-foreground">Meeting not found</p>
//             <Link href="/dashboard">
//               <Button className="mt-4">Back to Dashboard</Button>
//             </Link>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background transition-theme">
//       <DashboardNavbar />

//       <main className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Header */}
//         <div className="mb-8">
//           <Link href="/dashboard">
//             <Button variant="outline" className="mb-4 bg-transparent">
//               ← Back to Dashboard
//             </Button>
//           </Link>
//           <h1 className="text-3xl md:text-4xl font-bold text-foreground">{meeting.title}</h1>
//           <p className="text-muted-foreground mt-2">
//             {meeting.date} • {meeting.startTime} - {meeting.endTime} • {meeting.duration}
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {/* Main Content */}
//           <div className="md:col-span-2 space-y-6">
//             {/* Recording Section */}
//             {meeting.hasRecording && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Recording</CardTitle>
//                   <CardDescription>Watch or download the meeting recording</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="bg-muted/30 rounded-lg p-8 text-center">
//                     <div className="inline-block mb-4">
//                       <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
//                         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                     <p className="text-foreground font-medium mb-4">Recording Available</p>
//                     <div className="flex gap-3 justify-center">
//                       <Button className="bg-primary hover:bg-primary/90 text-white">Play Recording</Button>
//                       <Button variant="outline">Download Recording</Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Chat History */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Chat History</CardTitle>
//                 <CardDescription>Messages from this meeting</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4 max-h-96 overflow-y-auto">
//                   {meeting.chatMessages.map((msg: any, idx: number) => (
//                     <div key={idx} className="border-b border-border pb-4 last:border-b-0">
//                       <div className="flex items-start gap-3">
//                         <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0">
//                           {msg.user.charAt(0)}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-baseline gap-2">
//                             <p className="font-medium text-foreground text-sm">{msg.user}</p>
//                             <p className="text-xs text-muted-foreground">{msg.time}</p>
//                           </div>
//                           <p className="text-sm text-foreground mt-1 break-words">{msg.message}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Meeting Info */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Meeting Info</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <p className="text-xs text-muted-foreground font-semibold uppercase">Host</p>
//                   <p className="text-foreground font-medium">{meeting.host}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground font-semibold uppercase">Date</p>
//                   <p className="text-foreground">{meeting.date}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground font-semibold uppercase">Duration</p>
//                   <p className="text-foreground">{meeting.duration}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground font-semibold uppercase">Participants</p>
//                   <p className="text-foreground">{meeting.participants.length}</p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Participants List */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Participants</CardTitle>
//                 <CardDescription>{meeting.participants.length} attendees</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   {meeting.participants.map((participant: any, idx: number) => (
//                     <div key={idx} className="text-sm">
//                       <div className="flex items-center gap-2 mb-1">
//                         <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
//                           {participant.name.charAt(0)}
//                         </div>
//                         <p className="font-medium text-foreground">{participant.name}</p>
//                       </div>
//                       <p className="text-xs text-muted-foreground ml-8">
//                         {participant.joinTime} → {participant.leaveTime}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }
