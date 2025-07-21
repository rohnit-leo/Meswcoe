"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Award, BookOpen, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-float-delayed"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-cyan-200 rounded-full opacity-20 animate-float"></div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-3 rounded-full text-blue-700 font-medium shadow-lg">
              <Award className="h-5 w-5" />
              <span>Established 1999 | NBA Accredited</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent">
                  Welcome to
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  MESCOE
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 font-medium">
                Modern Education Society's College of Engineering
              </p>
              <p className="text-lg text-slate-500 max-w-2xl">
                Shaping tomorrow's engineers with cutting-edge education, innovative research, and industry
                partnerships. Join our vibrant community of learners and innovators.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-800">5000+</div>
                <div className="text-sm text-slate-600">Students</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-800">6</div>
                <div className="text-sm text-slate-600">Branches</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-800">25+</div>
                <div className="text-sm text-slate-600">Years</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-800">85%+</div>
                <div className="text-sm text-slate-600">Placement</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/branches">
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Programs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/calculator">
                <Button
                  variant="outline"
                  className="border-2 border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 font-semibold px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Fee Calculator
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2">
                <Award className="h-4 w-4 mr-2" />
                NBA Accredited
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                AICTE Approved
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-4 py-2">
                <BookOpen className="h-4 w-4 mr-2" />
                University of Pune
              </Badge>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/images/mescoe-logo.png"
                alt="MESCOE College Campus"
                width={500}
                height={400}
                className="rounded-xl object-cover w-full h-80"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <Award className="inline h-4 w-4 mr-1" />
                Top Engineering College
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-2xl transform -rotate-3 opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
