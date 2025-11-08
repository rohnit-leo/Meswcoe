"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is the admission process for MESCOE?",
    answer:
      "Admissions are based on JEE Main scores. Students need to register on the Joint Entrance Examination portal, take the exam, and then participate in the counseling process.",
  },
  {
    question: "What are the placement statistics?",
    answer:
      "We have a 98% placement rate with an average package of ₹12 LPA and highest package reaching ₹60 LPA. Over 150 companies visit campus for recruitment.",
  },
  {
    question: "Are internships available?",
    answer:
      "Yes, internships are actively promoted and facilitated. Most students get internships in their 2nd/3rd year through our industry partnerships.",
  },
  {
    question: "What clubs and activities are available?",
    answer:
      "We have 15+ clubs including Coding Club, Robotics Club, AI & ML Club, Design Club, Startup Club, and many more. Regular workshops and competitions are organized.",
  },
  {
    question: "Is there a research opportunity for students?",
    answer:
      "Yes, students can participate in research projects, publish papers, and work in our state-of-the-art research labs. We encourage innovation and entrepreneurship.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Frequently Asked Questions</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">Find answers to common questions about MESCOE</p>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Card
              key={idx}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-cyan-600 transition-transform duration-300 ${
                      openIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </CardTitle>
              </CardHeader>

              {openIndex === idx && (
                <CardContent className="pt-4 border-t border-gray-200 mt-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
