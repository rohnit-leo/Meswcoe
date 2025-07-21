"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MessageCircle, Send, Users, Hash, Reply, Heart, ThumbsUp } from "lucide-react"
import { supabase, type Message, type User } from "@/lib/supabase"
import { useRouter } from "next/navigation"

const channels = [
  {
    id: "admission-queries",
    name: "#admission-queries",
    description: "Ask about admissions, eligibility, and process",
    color: "bg-blue-500",
  },
  {
    id: "hostel-life",
    name: "#hostel-life",
    description: "Discuss hostel facilities and campus life",
    color: "bg-green-500",
  },
  {
    id: "placement-help",
    name: "#placement-help",
    description: "Career guidance and placement discussions",
    color: "bg-purple-500",
  },
  {
    id: "ask-a-senior",
    name: "#ask-a-senior",
    description: "Get advice from senior students and alumni",
    color: "bg-orange-500",
  },
  {
    id: "general",
    name: "#general",
    description: "General discussions and announcements",
    color: "bg-cyan-500",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<(Message & { users?: User })[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [activeChannel, setActiveChannel] = useState("admission-queries")
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [onlineUsers, setOnlineUsers] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuthAndFetchData()
  }, [])

  useEffect(() => {
    if (user) {
      fetchMessages()
      subscribeToMessages()
    }
  }, [activeChannel, user])

  const checkAuthAndFetchData = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        setLoading(false)
        return
      }

      // Get or create user profile
      let { data: userData, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

      if (error && error.code === "PGRST116") {
        // User doesn't exist, create profile
        const { data: newUser, error: createError } = await supabase
          .from("users")
          .insert([
            {
              id: session.user.id,
              email: session.user.email!,
              name: session.user.user_metadata?.name || session.user.email?.split("@")[0],
              role: "prospective",
              is_verified: true,
              last_active: new Date().toISOString(),
            },
          ])
          .select()
          .single()

        if (createError) {
          console.error("Error creating user profile:", createError)
          setLoading(false)
          return
        }
        userData = newUser
      } else if (error) {
        console.error("Error fetching user:", error)
        setLoading(false)
        return
      }

      setUser(userData)
      setOnlineUsers(Math.floor(Math.random() * 50) + 15)
      setLoading(false)
    } catch (error) {
      console.error("Auth check error:", error)
      setLoading(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchMessages = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("messages")
        .select(`
          *,
          users (
            id,
            name,
            email,
            role
          )
        `)
        .eq("channel", activeChannel)
        .order("created_at", { ascending: true })
        .limit(50)

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  const subscribeToMessages = () => {
    if (!user) return

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `channel=eq.${activeChannel}`,
        },
        async (payload) => {
          const { data } = await supabase
            .from("messages")
            .select(`
              *,
              users (
                id,
                name,
                email,
                role
              )
            `)
            .eq("id", payload.new.id)
            .single()

          if (data) {
            setMessages((prev) => [...prev, data])
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return

    try {
      const { error } = await supabase.from("messages").insert([
        {
          content: newMessage,
          user_id: user.id,
          channel: activeChannel,
          anonymous: isAnonymous,
        },
      ])

      if (error) throw error
      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Error sending message. Please try again.")
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getDisplayName = (message: Message & { users?: User }) => {
    if (message.anonymous) return "Anonymous"
    return message.users?.name || message.users?.email?.split("@")[0] || "Unknown User"
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "prospective":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "current":
        return "bg-green-100 text-green-700 border-green-200"
      case "alumni":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "teacher":
        return "bg-orange-100 text-orange-700 border-orange-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "prospective":
        return "Prospective Student"
      case "current":
        return "Current Student"
      case "alumni":
        return "Alumni"
      case "teacher":
        return "Faculty"
      default:
        return "User"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-pulse" />
          <p className="text-xl text-slate-600">Loading chat...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full text-center shadow-2xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent">
              Join the MESCOE Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Connect with current students, alumni, and faculty. Get answers to your questions and share your
              experiences in our vibrant community.
            </p>
            <Button
              onClick={() => router.push("/auth")}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Login to Join Chat
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full text-blue-700 font-medium mb-4">
            <MessageCircle className="inline h-5 w-5 mr-2" />
            Community Chat
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-4">
            MESCOE Connect Community
          </h1>
          <p className="text-xl text-slate-600">Connect, learn, and grow together with the MESCOE family</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Channels Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      activeChannel === channel.id
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105"
                        : "hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`w-3 h-3 rounded-full ${channel.color} ${activeChannel === channel.id ? "bg-white" : ""}`}
                      ></div>
                      <span className="font-medium">{channel.name}</span>
                    </div>
                    <div className="text-xs opacity-80">{channel.description}</div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">{onlineUsers} users online</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div>Students: {Math.floor(onlineUsers * 0.6)}</div>
                    <div>Alumni: {Math.floor(onlineUsers * 0.25)}</div>
                    <div>Faculty: {Math.floor(onlineUsers * 0.15)}</div>
                    <div>
                      Others:{" "}
                      {onlineUsers -
                        Math.floor(onlineUsers * 0.6) -
                        Math.floor(onlineUsers * 0.25) -
                        Math.floor(onlineUsers * 0.15)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[700px] flex flex-col shadow-2xl border-0 bg-white/90 backdrop-blur-md">
              <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    {channels.find((c) => c.id === activeChannel)?.name}
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="anonymous-mode" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                      <Label htmlFor="anonymous-mode" className="text-sm font-medium">
                        Anonymous
                      </Label>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-blue-100 opacity-90">
                  {channels.find((c) => c.id === activeChannel)?.description}
                </p>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-slate-50 to-white">
                {messages.length === 0 ? (
                  <div className="text-center py-16">
                    <MessageCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-lg">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className="flex gap-4 group hover:bg-blue-50/50 p-3 rounded-xl transition-colors"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-sm font-bold text-white">
                          {getDisplayName(message).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="font-bold text-slate-800 text-sm">{getDisplayName(message)}</span>
                          <Badge variant="outline" className={`text-xs ${getRoleColor(message.users?.role || "user")}`}>
                            {getRoleLabel(message.users?.role || "user")}
                          </Badge>
                          <span className="text-xs text-slate-500">{formatTime(message.created_at)}</span>
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed mb-3">{message.content}</p>
                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" className="h-8 px-3 text-xs hover:bg-blue-100">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Like
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-3 text-xs hover:bg-green-100">
                            <Reply className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-3 text-xs hover:bg-pink-100">
                            <Heart className="h-3 w-3 mr-1" />
                            React
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Message Input */}
              <div className="border-t border-slate-100 p-6 bg-white rounded-b-lg">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">
                      {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder={`Message ${channels.find((c) => c.id === activeChannel)?.name}...`}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="border-2 border-slate-200 focus:border-blue-400 rounded-xl py-3 px-4 text-sm"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-slate-500">
                        {isAnonymous
                          ? "Posting as Anonymous"
                          : `Posting as ${user?.name || user?.email?.split("@")[0]}`}
                      </p>
                      <p className="text-xs text-slate-500">Press Enter to send</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
