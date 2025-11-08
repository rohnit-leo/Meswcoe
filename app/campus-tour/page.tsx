"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Users, BookOpen, Utensils } from "lucide-react"
import Image from "next/image"

const campusLocations = [
  {
    id: 1,
    name: "Main Building",
    description:
      "The iconic main building showcasing MESCOE's architectural excellence with modern facilities and spacious classrooms",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3784.PNG-5oongggkhoFOujxtS3W6tlPqFv3OlN.jpeg",
    features: ["Executive Classrooms", "Smart Labs", "Student Lounges", "Wi-Fi Campus"],
    icon: BookOpen,
  },
  {
    id: 2,
    name: "Auditorium & Seminar Hall",
    description:
      "State-of-the-art auditorium hosting seminars, conferences, and events with world-class seating and audio-visual systems",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3789.PNG-whH3p7npenftsGUYcpWsQguOGatBcf.jpeg",
    features: ["2000+ Capacity", "AV Systems", "Conference Halls", "Event Hosting"],
    icon: Users,
  },
  {
    id: 3,
    name: "College Entry & Reception",
    description:
      "Professional reception area showcasing college credentials, academy partnerships, and industry certifications",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3785.PNG-264gXXeytv7UJgS9lYmSZjfVGsjfNy.jpeg",
    features: ["Reception Desk", "Partnerships", "Certifications", "Visitor Lounge"],
    icon: MapPin,
  },
  {
    id: 4,
    name: "Entrance Foyer",
    description:
      "Modern entrance foyer with professional ambiance featuring college branding and accessibility features",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3788.PNG-YvGXIBsfEnwFN6oevUQl2gT1gONFck.jpeg",
    features: ["Glass Architecture", "Professional Design", "Easy Access", "Information Desk"],
    icon: BookOpen,
  },
  {
    id: 5,
    name: "Classroom Experience",
    description:
      "Interactive and collaborative learning spaces equipped with modern teaching aids and comfortable seating",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3786.PNG-62l8PT7F6UYYxOLMaNgIawXfQfHNMC.jpeg",
    features: ["Interactive Boards", "Comfortable Seating", "Natural Lighting", "Collaborative Spaces"],
    icon: Users,
  },
  {
    id: 6,
    name: "Seminar & Events",
    description: "Vibrant event spaces hosting seminars, workshops, and presentations with engaged participation",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3787.PNG-2gbnFseypldIe8u2Llb0z52L1Z8eu2.jpeg",
    features: ["Seminars", "Workshops", "Panel Discussions", "Professional Events"],
    icon: Utensils,
  },
]

export default function CampusTourPage() {
  const [selectedLocation, setSelectedLocation] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Campus Tour</h1>
          <p className="text-xl text-cyan-100 max-w-2xl">
            Explore the world-class facilities and vibrant campus environment of MESCOE
          </p>
        </div>
      </div>

      {/* Main Campus Tour */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-3">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Campus Locations</h3>
              {campusLocations.map((location, index) => {
                const Icon = location.icon
                return (
                  <div
                    key={location.id}
                    onClick={() => setSelectedLocation(index)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      selectedLocation === index
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                        : "bg-white border border-gray-200 text-gray-800 hover:border-cyan-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{location.name}</div>
                      </div>
                      {selectedLocation === index && <ArrowRight className="h-5 w-5" />}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {campusLocations.map(
              (location, index) =>
                selectedLocation === index && (
                  <div key={location.id} className="animate-fade-in">
                    {/* Image */}
                    <div className="relative rounded-xl overflow-hidden shadow-2xl mb-8 h-96">
                      <Image
                        src={location.image || "/placeholder.svg"}
                        alt={location.name}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h2 className="text-4xl font-bold mb-2">{location.name}</h2>
                        <Badge className="bg-cyan-500 text-white border-0">Campus Highlight</Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <Card className="mb-8 border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-2xl text-gray-800">About This Location</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">{location.description}</p>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Features */}
                          <div>
                            <h3 className="font-bold text-gray-800 mb-4">Key Features</h3>
                            <ul className="space-y-3">
                              {location.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-gray-700">
                                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Quick Stats */}
                          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-lg">
                            <h3 className="font-bold text-gray-800 mb-4">Campus Info</h3>
                            <div className="space-y-3">
                              <div>
                                <div className="text-sm text-gray-600">Location</div>
                                <div className="text-lg font-semibold text-cyan-600">Pune-01</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Accessibility</div>
                                <div className="text-lg font-semibold text-cyan-600">24/7 Open</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Transport</div>
                                <div className="text-lg font-semibold text-cyan-600">Public & Parking</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ),
            )}
          </div>
        </div>
      </div>

      {/* Facilities Overview */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Complete Facilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Smart Classrooms", desc: "Interactive boards & modern teaching aids" },
              { icon: Users, title: "Auditoriums", desc: "State-of-the-art event spaces" },
              { icon: Utensils, title: "Cafeteria", desc: "Healthy food & comfortable dining" },
              { icon: MapPin, title: "Library", desc: "Extensive collection & digital resources" },
              { icon: BookOpen, title: "Labs", desc: "Advanced engineering labs & equipment" },
              { icon: Users, title: "Sports", desc: "Outdoor & indoor sports facilities" },
            ].map((facility, idx) => {
              const Icon = facility.icon
              return (
                <Card
                  key={idx}
                  className="border-0 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">{facility.title}</h3>
                        <p className="text-gray-600 text-sm">{facility.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
