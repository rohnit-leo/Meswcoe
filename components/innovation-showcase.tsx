"use client"

import { Users, Brain, Zap, Trophy } from "lucide-react"

const innovations = [
  {
    title: "AI Lab",
    description: "Cutting-edge artificial intelligence and machine learning research",
    icon: Brain,
    stat: "50+ Projects",
  },
  {
    title: "IoT Center",
    description: "Internet of Things development and smart systems research",
    icon: Zap,
    stat: "100+ Devices",
  },
  {
    title: "Startup Incubator",
    description: "Launch your startup ideas with mentorship and funding",
    icon: Users,
    stat: "20+ Startups",
  },
  {
    title: "Innovation Awards",
    description: "Recognition program for groundbreaking student projects",
    icon: Trophy,
    stat: "₹10L Prizes",
  },
]

export function InnovationShowcase() {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Innovation & Research</h2>
        <p className="text-center text-slate-300 mb-16 text-lg">Leading the way in academic research and innovation</p>

        <div className="grid md:grid-cols-4 gap-6">
          {innovations.map((innovation, idx) => {
            const Icon = innovation.icon
            return (
              <div
                key={innovation.title}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <Icon className="h-12 w-12 mb-4 text-cyan-400" />
                <h3 className="text-2xl font-bold mb-2">{innovation.title}</h3>
                <p className="text-slate-300 mb-4">{innovation.description}</p>
                <div className="text-cyan-400 font-semibold text-lg">{innovation.stat}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
