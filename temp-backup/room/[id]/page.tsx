// "use client"

// import { ThemeToggle } from "@/components/theme-toggle"
// import { VideoGrid } from "@/components/video-grid"
// import { MeetingToolbar } from "@/components/meeting-toolbar"
// import { MeetingSidebar } from "@/components/meeting-sidebar"
// import { PasswordValidation } from "@/components/password-validation"
// import { WaitingRoom } from "@/components/waiting-room"
// import { useState, useEffect } from "react"
// import { useParams, useSearchParams } from "next/navigation"

// interface RoomSettings {
//   requirePassword: boolean
//   password: string
//   waitingRoom: boolean
//   muteOnEntry: boolean
//   allowGuests: boolean
// }

// export default function MeetingRoomPage() {
//   const params = useParams()
//   const searchParams = useSearchParams()
//   const roomId = params.id as string
//   const isJoining = searchParams.get("join") === "true"

//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [showChat, setShowChat] = useState(true)
//   const [roomSettings, setRoomSettings] = useState<RoomSettings | null>(null)
//   const [showPasswordValidation, setShowPasswordValidation] = useState(false)
//   const [showWaitingRoom, setShowWaitingRoom] = useState(false)
//   const [isUserApproved, setIsUserApproved] = useState(false)
//   const [userName, setUserName] = useState("")
//   const [isMutedOnEntry, setIsMutedOnEntry] = useState(false)

//   // Mock participants
//   const [participants] = useState([
//     { id: "1", name: "You", isMuted: isMutedOnEntry, hasVideo: true },
//     { id: "2", name: "John", isMuted: true, hasVideo: true },
//     { id: "3", name: "Jane", isMuted: false, hasVideo: false },
//   ])

//   useEffect(() => {
//     // Load room settings from sessionStorage
//     const settings = sessionStorage.getItem(`room-${roomId}`)
//     const isHost = sessionStorage.getItem(`room-${roomId}-host`) === "true"

//     if (settings) {
//       const parsedSettings: RoomSettings = JSON.parse(settings)
//       setRoomSettings(parsedSettings)

//       // If joining, apply room settings
//       if (isJoining && !isHost) {
//         // Check if allowed guests
//         if (!parsedSettings.allowGuests) {
//           alert("Guests are not allowed in this room")
//           window.history.back()
//           return
//         }

//         // Get user name from localStorage
//         const user = JSON.parse(localStorage.getItem("user") || "{}")
//         const guestName = user.name || "Guest"
//         setUserName(guestName)

//         // Check password requirement
//         if (parsedSettings.requirePassword) {
//           const passwordValid = sessionStorage.getItem(`room-${roomId}-user-password-valid`) === "true"
//           if (!passwordValid) {
//             setShowPasswordValidation(true)
//             return
//           }
//         }

//         // Check waiting room requirement
//         if (parsedSettings.waitingRoom) {
//           const approved = sessionStorage.getItem(`room-${roomId}-${guestName}-approved`) === "true"
//           if (!approved) {
//             setShowWaitingRoom(true)
//             return
//           }
//         }

//         // Apply mute on entry setting
//         if (parsedSettings.muteOnEntry) {
//           setIsMutedOnEntry(true)
//         }

//         setIsUserApproved(true)
//       }
//     } else if (!isJoining) {
//       // Host creating room without settings (shouldn't happen, but handle it)
//       setRoomSettings({
//         requirePassword: false,
//         password: "",
//         waitingRoom: false,
//         muteOnEntry: false,
//         allowGuests: true,
//       })
//       setIsUserApproved(true)
//     }
//   }, [roomId, isJoining])

//   // If waiting for approval or validation, don't show the meeting
//   if (showPasswordValidation || (showWaitingRoom && !isUserApproved)) {
//     return (
//       <>
//         <PasswordValidation
//           roomId={roomId}
//           isOpen={showPasswordValidation}
//           onPasswordValid={() => {
//             setShowPasswordValidation(false)
//             if (roomSettings?.waitingRoom) {
//               setShowWaitingRoom(true)
//             } else {
//               setIsUserApproved(true)
//             }
//           }}
//         />
//         <WaitingRoom
//           roomId={roomId}
//           userName={userName}
//           isOpen={showWaitingRoom}
//           onApproved={() => setIsUserApproved(true)}
//         />
//       </>
//     )
//   }

//   if (!isUserApproved) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-semibold text-foreground mb-2">Loading...</h1>
//           <p className="text-muted-foreground">Setting up your meeting</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background transition-theme flex flex-col">
//       {/* Top Bar */}
//       <div className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <h1 className="text-foreground font-semibold">Room ID: {roomId}</h1>
//         </div>
//         <ThemeToggle />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex overflow-hidden">
//         {/* Video Grid */}
//         <div className="flex-1 bg-background p-4 overflow-auto">
//           <VideoGrid participants={participants} />
//         </div>

//         {/* Sidebar */}
//         <MeetingSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} showChat={showChat} />
//       </div>

//       {/* Bottom Toolbar */}
//       <MeetingToolbar
//         roomId={roomId}
//         onChatToggle={() => {
//           setSidebarOpen(!sidebarOpen || !showChat ? true : sidebarOpen)
//           setShowChat(true)
//         }}
//         onParticipantsToggle={() => {
//           setSidebarOpen(!sidebarOpen || showChat ? true : sidebarOpen)
//           setShowChat(false)
//         }}
//       />
//     </div>
//   )
// }
