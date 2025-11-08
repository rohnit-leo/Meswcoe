"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, TrendingUp, Users, Award } from "lucide-react"

const stats = [
  { label: "Placement Rate", value: 98, icon: Briefcase, color: "text-cyan-600" },
  { label: "Highest CTC", value: 60, prefix: "₹", suffix: " LPA", icon: TrendingUp, color: "text-green-600" },
  { label: "Average CTC", value: 12, prefix: "₹", suffix: " LPA", icon: Award, color: "text-purple-600" },
  { label: "Companies", value: 150, suffix: "+", icon: Users, color: "text-orange-600" },
]

export function PlaacementStats() {
  const [counters, setCounters] = useState(stats.map(() => 0))
  const sectionRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          stats.forEach((stat, idx) => {
            let current = 0
            const increment = stat.value / 50
            const timer = setInterval(() => {
              current += increment
              if (current >= stat.value) {
                setCounters((prev) => {
                  const newCounters = [...prev]
                  newCounters[idx] = stat.value
                  return newCounters
                })
                clearInterval(timer)
              } else {
                setCounters((prev) => {
                  const newCounters = [...prev]
                  newCounters[idx] = current
                  return newCounters
                })
              }
            }, 30)
          })
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Our Achievements</h2>
        <p className="text-center text-gray-600 mb-16 text-lg">
          Track record of excellence in placements & industry recognition
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <Icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {stat.prefix}
                  {Math.round(counters[idx])}
                  {stat.suffix}
                </div>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
