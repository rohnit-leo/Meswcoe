"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Clock, Zap, Trophy, Users2 } from "lucide-react"

const futureEvents = [
  {
    id: 1,
    title: "Hackathon 2025 - Code4Tomorrow",
    date: "2025-02-15",
    time: "09:00 AM - 08:00 PM",
    location: "Main Auditorium",
    category: "Competition",
    participants: 150,
    description: "24-hour coding marathon with exciting prizes and mentorship from industry experts",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Tech Talk: AI & Machine Learning",
    date: "2025-02-20",
    time: "02:00 PM - 04:00 PM",
    location: "Seminar Hall",
    category: "Seminar",
    participants: 200,
    description: "Industry expert sharing insights on latest AI applications in real-world scenarios",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Workshop: Web3 & Blockchain",
    date: "2025-03-01",
    time: "10:00 AM - 12:00 PM",
    location: "Lab A",
    category: "Workshop",
    participants: 80,
    description: "Hands-on workshop on blockchain development and decentralized applications",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: "Robotics Competition - RoboWars",
    date: "2025-03-10",
    time: "08:00 AM - 06:00 PM",
    location: "Sports Complex",
    category: "Competition",
    participants: 120,
    description: "Battle of the robots - Showcase your robotics skills in this thrilling competition",
    image: "/placeholder.svg?height=300&width=400",
  },
]

const pastEvents = [
  {
    id: 101,
    title: "Annual Tech Fest 2024",
    date: "2024-11-20",
    time: "09:00 AM - 05:00 PM",
    location: "Main Campus",
    category: "Festival",
    participants: 500,
    description: "Three-day mega event celebrating technology and innovation",
    highlights: ["100+ stalls", "15 workshops", "3 competitions", "500+ attendees"],
  },
  {
    id: 102,
    title: "Industry Internship Drive",
    date: "2024-10-15",
    time: "11:00 AM - 04:00 PM",
    location: "Auditorium Hall",
    category: "Recruitment",
    participants: 300,
    description: "Companies recruiting interns for summer 2025",
    highlights: ["15+ companies", "100+ internships", "High CTC"],
  },
  {
    id: 103,
    title: "Code Sprint Challenge",
    date: "2024-09-28",
    time: "04:00 PM - 08:00 PM",
    location: "Computer Lab",
    category: "Competition",
    participants: 90,
    description: "Fast-paced coding competition testing algorithmic skills",
    highlights: ["Prize pool: ₹50,000", "Top 3 winners", "Certificate for all"],
  },
]

const clubs = [
  {
    id: "c1",
    name: "Coding Club",
    icon: "💻",
    members: 350,
    description: "For programming enthusiasts - DSA, competitive coding, web development",
    color: "from-blue-400 to-cyan-400",
    events: ["Weekly coding sessions", "Hackathons", "LeetCode contests"],
  },
  {
    id: "c2",
    name: "Robotics Club",
    icon: "🤖",
    members: 180,
    description: "Building and programming robots - From basics to advanced AI",
    color: "from-purple-400 to-pink-400",
    events: ["Robot building workshops", "RoboWars competition", "Tech talks"],
  },
  {
    id: "c3",
    name: "AI & ML Club",
    icon: "🧠",
    members: 220,
    description: "Exploring artificial intelligence and machine learning applications",
    color: "from-green-400 to-emerald-400",
    events: ["ML project showcases", "Guest lectures", "Kaggle competitions"],
  },
  {
    id: "c4",
    name: "Startup Club",
    icon: "🚀",
    members: 150,
    description: "Entrepreneurship and startup development community",
    color: "from-orange-400 to-red-400",
    events: ["Pitch events", "Founder talks", "Business workshops"],
  },
  {
    id: "c5",
    name: "Design & UI/UX Club",
    icon: "🎨",
    members: 140,
    description: "Creative minds designing beautiful user experiences",
    color: "from-pink-400 to-rose-400",
    events: ["Design challenges", "Figma workshops", "Portfolio reviews"],
  },
  {
    id: "c6",
    name: "Electronics Club",
    icon: "⚡",
    members: 120,
    description: "Hardware enthusiasts - Circuit design, embedded systems",
    color: "from-yellow-400 to-orange-400",
    events: ["Arduino projects", "PCB design workshops", "Hardware hackathons"],
  },
]

export default function EventsPage() {
  const [selectedClub, setSelectedClub] = useState<any>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Events & Clubs</h1>
          <p className="text-xl text-cyan-100">
            Discover upcoming events, past celebrations, and join our vibrant clubs
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="clubs">Clubs</TabsTrigger>
          </TabsList>

          {/* Upcoming Events */}
          <TabsContent value="upcoming" className="space-y-6">
            {futureEvents.map((event) => (
              <Card
                key={event.id}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden animate-fade-in"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
                          <Badge className="bg-cyan-100 text-cyan-700 border-cyan-200">{event.category}</Badge>
                        </div>
                        <Zap className="h-6 w-6 text-yellow-500" />
                      </div>

                      <p className="text-gray-600 mb-6">{event.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="h-4 w-4 text-cyan-600" />
                          <div className="text-sm">
                            <div className="font-semibold">{new Date(event.date).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <div className="text-sm">
                            <div className="font-semibold">{event.time.split("-")[0]}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="h-4 w-4 text-red-600" />
                          <div className="text-sm">
                            <div className="font-semibold">{event.location}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Users className="h-4 w-4 text-purple-600" />
                          <div className="text-sm">
                            <div className="font-semibold">{event.participants} Joining</div>
                          </div>
                        </div>
                      </div>

                      <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-2 rounded-lg transform hover:scale-105 transition-all duration-300">
                        Register Now
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Past Events */}
          <TabsContent value="past" className="space-y-6">
            {pastEvents.map((event) => (
              <Card
                key={event.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
                      <Badge className="bg-gray-200 text-gray-700 border-gray-300">{event.category}</Badge>
                    </div>
                    <Trophy className="h-6 w-6 text-yellow-500" />
                  </div>

                  <p className="text-gray-600 mb-4">{event.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-semibold">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-semibold">{event.participants} Attended</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-semibold">{event.location}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-3">Event Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.highlights.map((highlight, idx) => (
                        <Badge key={idx} className="bg-blue-100 text-blue-700 border-blue-200">
                          ✓ {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Clubs */}
          <TabsContent value="clubs" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {clubs.map((club) => (
                <Card
                  key={club.id}
                  className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer animate-fade-in hover:-translate-y-2"
                  onClick={() => setSelectedClub(club)}
                >
                  <div className={`bg-gradient-to-br ${club.color} p-8 text-white`}>
                    <div className="text-4xl mb-4">{club.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{club.name}</h3>
                    <div className="flex items-center gap-2 text-white/90">
                      <Users2 className="h-4 w-4" />
                      <span className="font-semibold">{club.members} Members</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">{club.description}</p>
                    <Button
                      className="w-full bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:from-gray-300 hover:to-gray-400"
                      onClick={() => setSelectedClub(club)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Club Details Modal */}
            {selectedClub && (
              <Card className="border-0 shadow-2xl mt-8 animate-bounce-in">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{selectedClub.icon}</div>
                      <div>
                        <CardTitle className="text-3xl">{selectedClub.name}</CardTitle>
                        <p className="text-gray-600 mt-2">{selectedClub.description}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedClub(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      ✕
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl">
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Users2 className="h-5 w-5 text-cyan-600" />
                        About
                      </h4>
                      <p className="text-gray-700">{selectedClub.description}</p>
                      <p className="text-lg font-bold text-cyan-600 mt-4">{selectedClub.members} Active Members</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        Upcoming Events
                      </h4>
                      <div className="space-y-2">
                        {selectedClub.events.map((event: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-gray-700">
                            <span className="text-purple-600">→</span>
                            <span>{event}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold">
                      Join Club
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
                      onClick={() => setSelectedClub(null)}
                    >
                      Close
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
