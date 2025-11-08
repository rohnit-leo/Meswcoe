"use client"

import { BookOpen, Users, Zap, Globe, Code, Lightbulb, Target, Rocket } from "lucide-react"
import { useEffect, useRef } from "react"

const features = [
  {
    icon: BookOpen,
    title: "World-Class Curriculum",
    description: "Industry-aligned courses designed by experts and updated regularly",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    description: "Experienced educators with PhD and industry experience",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Zap,
    title: "State-of-Art Labs",
    description: "Modern laboratories equipped with cutting-edge technology",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "International partnerships and student exchange programs",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Code,
    title: "Tech Innovation Hub",
    description: "Incubation center for startups and research projects",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
  {
    icon: Lightbulb,
    title: "Research Focus",
    description: "Opportunities for groundbreaking research and publications",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Target,
    title: "Career Support",
    description: "Dedicated placement cell and career counseling services",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: Rocket,
    title: "Industry Collaborations",
    description: "Direct interactions with leading tech companies and organizations",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".feature-card").forEach((card, idx) => {
            setTimeout(() => {
              card.classList.add("animate-fade-in")
            }, idx * 100)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Why Choose MESCOE</h2>
        <p className="text-center text-gray-600 mb-16 text-lg">Comprehensive features designed for student success</p>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`feature-card ${feature.bgColor} rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 opacity-0`}
              >
                <Icon className={`h-10 w-10 ${feature.color} mb-4`} />
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
