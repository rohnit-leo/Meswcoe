"use client"

import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    branch: "Computer Science",
    year: "4th Year",
    text: "MESCOE transformed my career. The practical approach and industry connections landed me a dream job at a top tech company!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Aarav Singh",
    branch: "Electronics",
    year: "3rd Year",
    text: "The labs are amazing and faculty are incredibly supportive. I've learned more practical skills here than anywhere else.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Anjali Patel",
    branch: "Mechanical",
    year: "4th Year",
    text: "The internship opportunities and placement support here are unmatched. Got placed in my dream company!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function StudentTestimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Student Stories</h2>
        <p className="text-center text-gray-600 mb-16 text-lg">Real experiences from our amazing students</p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.branch}</p>
                  </div>
                </div>
                <Quote className="h-5 w-5 text-cyan-600 opacity-50" />
              </div>

              <p className="text-gray-700 mb-4 italic">{testimonial.text}</p>

              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
