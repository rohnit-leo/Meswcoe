"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Bell, Star, Calendar, Trophy, Users, Zap } from "lucide-react"

const announcements = [
  {
    id: 1,
    text: "🎓 Admissions Open for 2025-26 Batch - Apply Now!",
    type: "admission",
    icon: Bell,
    color: "bg-gradient-to-r from-blue-50 to-indigo-50",
  },
  {
    id: 2,
    text: "🏆 MESCOE wins Best Engineering College Award 2024",
    type: "achievement",
    icon: Trophy,
    color: "bg-gradient-to-r from-amber-50 to-yellow-50",
  },
  {
    id: 3,
    text: "📅 Tech Fest ACCET 2025 - March 15-17, Register Now!",
    type: "event",
    icon: Calendar,
    color: "bg-gradient-to-r from-purple-50 to-pink-50",
  },
  {
    id: 4,
    text: "⚡ 95% Placement Record Achieved - Highest in Pune!",
    type: "placement",
    icon: Zap,
    color: "bg-gradient-to-r from-green-50 to-emerald-50",
  },
  {
    id: 5,
    text: "👥 Join 5000+ Alumni Network - Connect & Grow Together",
    type: "community",
    icon: Users,
    color: "bg-gradient-to-r from-cyan-50 to-blue-50",
  },
  {
    id: 6,
    text: "⭐ NBA Accreditation Renewed - Quality Education Assured",
    type: "accreditation",
    icon: Star,
    color: "bg-gradient-to-r from-rose-50 to-pink-50",
  },
]

export function ScrollingAnnouncements() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const currentAnnouncement = announcements[currentIndex]
  const IconComponent = currentAnnouncement.icon

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 border-b border-slate-200 z-50">
      {/* Main Announcement Bar */}
      <div className="relative flex items-center justify-center py-2 px-4">
        <div className="flex items-center gap-3 text-slate-700 animate-fade-in">
          <div className={`p-1.5 rounded-full bg-slate-100 shadow-sm`}>
            <IconComponent className="h-3 w-3 text-slate-600" />
          </div>

          <span className="font-medium text-sm text-center">{currentAnnouncement.text}</span>

          <Badge
            variant="outline"
            className="bg-slate-100 text-slate-600 border-slate-200 text-xs hidden sm:inline-flex"
          >
            {currentAnnouncement.type.toUpperCase()}
          </Badge>
        </div>

        {/* Progress Indicators */}
        <div className="absolute right-4 flex gap-1">
          {announcements.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-slate-400 scale-125" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
