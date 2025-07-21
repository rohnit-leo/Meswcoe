"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, Users, BookOpen, Award, Briefcase } from "lucide-react"

const announcements = [
  {
    id: 1,
    text: "Admission Process 2025-26 Started - Apply through DTE Maharashtra CAP process",
    type: "admission",
    icon: <BookOpen className="h-4 w-4" />,
    color: "bg-blue-500",
  },
  {
    id: 2,
    text: "ACCET-2025 Technical Symposium on March 15, 2025 - Register now for competitions and workshops",
    type: "event",
    icon: <Calendar className="h-4 w-4" />,
    color: "bg-green-500",
  },
  {
    id: 3,
    text: "Placement Drive by TCS on February 5, 2025 - Final year students can register",
    type: "placement",
    icon: <Briefcase className="h-4 w-4" />,
    color: "bg-purple-500",
  },
  {
    id: 4,
    text: "RACE-2025 Cultural Festival on February 20, 2025 - Inter-college competitions in music, dance, and drama",
    type: "cultural",
    icon: <Users className="h-4 w-4" />,
    color: "bg-orange-500",
  },
  {
    id: 5,
    text: "Library Timing Extended during examination period - 8:00 AM to 10:00 PM on weekdays",
    type: "notice",
    icon: <Bell className="h-4 w-4" />,
    color: "bg-cyan-500",
  },
  {
    id: 6,
    text: "Faculty Development Program on Emerging Technologies - February 10-14, 2025",
    type: "academic",
    icon: <Award className="h-4 w-4" />,
    color: "bg-indigo-500",
  },
]

export default function ScrollingAnnouncements() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const currentAnnouncement = announcements[currentIndex]

  return (
    <div className="bg-gradient-to-r from-slate-800 to-blue-800 text-white py-3 px-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-4 animate-fade-in">
          <div className={`p-2 rounded-full ${currentAnnouncement.color} shadow-lg`}>{currentAnnouncement.icon}</div>
          <div className="flex-1 text-center">
            <p className="text-sm md:text-base font-medium leading-relaxed">{currentAnnouncement.text}</p>
          </div>
          <Badge variant="outline" className="bg-white/10 text-white border-white/20 hidden md:block">
            {currentAnnouncement.type.charAt(0).toUpperCase() + currentAnnouncement.type.slice(1)}
          </Badge>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center mt-3 gap-2">
          {announcements.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
