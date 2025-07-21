import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Users,
  Award,
  MapPin,
  Star,
  ArrowRight,
  Sparkles,
  Trophy,
  BookOpen,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Subtle Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Primary Orbs - Much more subtle */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-blue-100/40 to-indigo-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-100/30 to-pink-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-amber-100/20 to-yellow-100/20 rounded-full blur-2xl animate-ping"></div>

        {/* Secondary Orbs */}
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-emerald-100/30 to-green-100/30 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-100/25 to-blue-100/25 rounded-full blur-2xl animate-pulse delay-1500"></div>

        {/* Floating Elements with Subtle Colors */}
        <div className="absolute top-32 right-20 animate-float">
          <div className="w-20 h-20 bg-white/60 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-lg border border-slate-200">
            <BookOpen className="h-10 w-10 text-blue-500" />
          </div>
        </div>
        <div className="absolute bottom-32 left-20 animate-float delay-1000">
          <div className="w-24 h-24 bg-white/60 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-lg border border-slate-200">
            <Trophy className="h-12 w-12 text-amber-500" />
          </div>
        </div>
        <div className="absolute top-1/2 right-32 animate-float delay-500">
          <div className="w-16 h-16 bg-white/60 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-lg border border-slate-200">
            <Sparkles className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="absolute top-1/3 left-32 animate-float delay-2000">
          <div className="w-18 h-18 bg-white/60 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-lg border border-slate-200">
            <Users className="h-9 w-9 text-emerald-500" />
          </div>
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(71,85,105,0.3) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-12 lg:py-16">
        <div className="text-center mb-12">
          {/* Subtle Admission Banner */}
          <div className="inline-flex items-center gap-4 bg-white/70 backdrop-blur-md text-slate-700 px-8 py-4 rounded-2xl text-lg font-medium mb-8 border border-slate-200 shadow-lg hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-ping"></div>
              </div>
              <Star className="w-5 h-5 text-amber-500 animate-pulse group-hover:rotate-180 transition-transform duration-500" />
            </div>
            <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              🎓 Admissions Open – 2025 Batch
            </span>
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold px-4 py-2 text-sm hover:scale-110 transition-transform">
              Apply Now!
            </Badge>
          </div>

          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-8 group">
              {/* Subtle Glow Layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 animate-pulse scale-125"></div>

              {/* Logo Container */}
              <div className="relative bg-white/80 backdrop-blur-md p-8 lg:p-10 rounded-3xl shadow-xl border border-slate-200 transform hover:scale-105 transition-all duration-700">
                <Image
                  src="/images/mescoe-logo.png"
                  alt="MESCOE Logo"
                  width={160}
                  height={160}
                  className="drop-shadow-lg"
                />
              </div>
            </div>

            {/* Title with Subtle Colors */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-800 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text text-transparent animate-fade-in">
                MESCOE
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-slide-in">
                Connect
              </span>
            </h1>

            <div className="text-xl md:text-2xl lg:text-3xl font-light text-slate-600 mb-6 animate-slide-in delay-300">
              Powered by <span className="font-bold text-amber-600">NextureX</span>
            </div>

            {/* Subtle Decorative Elements */}
            <div className="flex items-center gap-6 mb-6">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-amber-300 to-transparent rounded-full"></div>
              <div className="h-2 w-24 bg-gradient-to-r from-amber-300 via-blue-300 to-purple-300 rounded-full"></div>
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* College Information */}
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-700 mb-6 animate-bounce-in">
              Modern Education Society's College of Engineering, Pune
            </h2>

            {/* Subtle Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-6">
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-2 text-sm lg:text-base font-semibold hover:scale-105 transition-transform">
                🏛️ Established 1999
              </Badge>
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 text-sm lg:text-base font-semibold hover:scale-105 transition-transform">
                🏆 AICTE & NBA Accredited
              </Badge>
              <Badge className="bg-purple-50 text-purple-700 border-purple-200 px-4 py-2 text-sm lg:text-base font-semibold hover:scale-105 transition-transform sm:col-span-2 lg:col-span-1">
                ⭐ 25+ Years Excellence
              </Badge>
            </div>

            <p className="text-lg lg:text-xl text-slate-600 italic font-medium animate-fade-in delay-700 leading-relaxed">
              "For The Spread of Light" - Illuminating Minds, Shaping Futures
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 lg:gap-4 mb-16">
            <Link href="/branches">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-bold px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-0 group"
              >
                <GraduationCap className="mr-2 h-5 lg:h-6 w-5 lg:w-6 group-hover:rotate-12 transition-transform" />
                Explore Engineering Branches
                <ArrowRight className="ml-2 h-4 lg:h-5 w-4 lg:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/calculator">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-slate-300 text-slate-700 hover:bg-slate-50 bg-white/80 backdrop-blur-md px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 group"
              >
                <Sparkles className="mr-2 h-4 lg:h-5 w-4 lg:w-5 group-hover:rotate-180 transition-transform duration-500" />
                Calculate Admission Chance
              </Button>
            </Link>

            <Link href="/chat">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-blue-300 text-blue-700 hover:bg-blue-50 bg-white/80 backdrop-blur-md px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 group"
              >
                <Users className="mr-2 h-4 lg:h-5 w-4 lg:w-5 group-hover:scale-125 transition-transform" />
                Join Community Chat
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards with Subtle Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          <Card className="bg-white/80 backdrop-blur-md border-slate-200 hover:bg-white/90 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group shadow-lg">
            <CardContent className="p-4 lg:p-6 text-center">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:rotate-6 transition-transform duration-500">
                <GraduationCap className="h-8 lg:h-10 w-8 lg:w-10 text-amber-600" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-700 mb-2">25+</h3>
              <p className="text-slate-600 font-semibold text-sm lg:text-base">Years of Excellence</p>
              <div className="mt-3 h-1 w-16 bg-gradient-to-r from-amber-300 to-transparent rounded-full mx-auto"></div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md border-slate-200 hover:bg-white/90 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group shadow-lg">
            <CardContent className="p-4 lg:p-6 text-center">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:rotate-6 transition-transform duration-500">
                <Users className="h-8 lg:h-10 w-8 lg:w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-700 mb-2">480</h3>
              <p className="text-slate-600 font-semibold text-sm lg:text-base">Total Seats Available</p>
              <div className="mt-3 h-1 w-16 bg-gradient-to-r from-blue-300 to-transparent rounded-full mx-auto"></div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md border-slate-200 hover:bg-white/90 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group shadow-lg">
            <CardContent className="p-4 lg:p-6 text-center">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:rotate-6 transition-transform duration-500">
                <Award className="h-8 lg:h-10 w-8 lg:w-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-700 mb-2">NBA</h3>
              <p className="text-slate-600 font-semibold text-sm lg:text-base">Accredited Programs</p>
              <div className="mt-3 h-1 w-16 bg-gradient-to-r from-emerald-300 to-transparent rounded-full mx-auto"></div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md border-slate-200 hover:bg-white/90 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group shadow-lg">
            <CardContent className="p-4 lg:p-6 text-center">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:rotate-6 transition-transform duration-500">
                <MapPin className="h-8 lg:h-10 w-8 lg:w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-700 mb-2">Pune</h3>
              <p className="text-slate-600 font-semibold text-sm lg:text-base">IT Hub Location</p>
              <div className="mt-3 h-1 w-16 bg-gradient-to-r from-purple-300 to-transparent rounded-full mx-auto"></div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Contact Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white/70 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200 shadow-lg">
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="h-4 w-4 text-blue-500" />
              <span className="font-semibold text-sm">+91-7798883400</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="h-4 w-4 text-amber-500" />
              <span className="font-semibold text-sm">admissions@mescoe.mespune.org</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24 lg:h-32">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#f8fafc" stopOpacity="1" />
              <stop offset="50%" stopColor="white" stopOpacity="1" />
              <stop offset="75%" stopColor="#f8fafc" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

// Export as default as well for compatibility
export default HeroSection
