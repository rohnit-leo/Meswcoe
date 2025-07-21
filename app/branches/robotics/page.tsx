import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, Cog, Users, TrendingUp, Award, GraduationCap, Star, CheckCircle, Building } from "lucide-react"
import Link from "next/link"

const subjects = [
  { name: "Engineering Mathematics", semester: 1, credits: 4 },
  { name: "Control Systems", semester: 2, credits: 4 },
  { name: "Robotics Fundamentals", semester: 3, credits: 4 },
  { name: "Industrial Automation", semester: 4, credits: 4 },
  { name: "Machine Learning for Robotics", semester: 5, credits: 4 },
  { name: "Computer Vision", semester: 6, credits: 4 },
  { name: "Advanced Robotics", semester: 7, credits: 4 },
  { name: "Capstone Project", semester: 8, credits: 6 },
]

const careerPaths = [
  {
    title: "Robotics Engineer",
    description: "Design and develop robotic systems and applications",
    salary: "₹4.5 - ₹15 LPA",
    companies: ["ABB", "KUKA", "Fanuc", "Boston Dynamics"],
    skills: ["ROS", "Python", "C++", "Control Systems"],
  },
  {
    title: "Automation Engineer",
    description: "Implement industrial automation solutions",
    salary: "₹4.2 - ₹12 LPA",
    companies: ["Schneider Electric", "Siemens", "Honeywell", "Emerson"],
    skills: ["PLC Programming", "SCADA", "HMI", "Industrial Networks"],
  },
  {
    title: "AI Robotics Developer",
    description: "Integrate AI and machine learning with robotics",
    salary: "₹5.5 - ₹18 LPA",
    companies: ["Tesla", "NVIDIA", "Google", "Amazon Robotics"],
    skills: ["Machine Learning", "Computer Vision", "Deep Learning", "TensorFlow"],
  },
  {
    title: "Control Systems Engineer",
    description: "Design control systems for automated processes",
    salary: "₹4.8 - ₹14 LPA",
    companies: ["Rockwell Automation", "Yokogawa", "ABB", "GE"],
    skills: ["MATLAB", "Simulink", "Control Theory", "System Modeling"],
  },
]

const facilities = [
  {
    name: "Advanced Robotics Lab",
    description: "Industrial robots and collaborative robotic systems",
    image: "/placeholder.svg?height=300&width=400&text=Robotics+Lab",
  },
  {
    name: "Automation Workshop",
    description: "PLC programming and industrial automation setup",
    image: "/placeholder.svg?height=300&width=400&text=Automation+Workshop",
  },
  {
    name: "AI & Vision Lab",
    description: "Computer vision and machine learning for robotics",
    image: "/placeholder.svg?height=300&width=400&text=AI+Vision+Lab",
  },
  {
    name: "Innovation Center",
    description: "Student project development and prototyping facility",
    image: "/placeholder.svg?height=300&width=400&text=Innovation+Center",
  },
]

const achievements = [
  "Winner of National Robotics Competition 2023",
  "Best Automation Project Award IIT Bombay 2022",
  "60+ Research Publications in Robotics",
  "Industry Collaboration with 30+ Automation Companies",
  "85% Placement Record in Core Robotics & Automation",
]

export default function RoboticsEngineeringPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-orange-200 font-medium mb-6">
              <Bot className="inline h-5 w-5 mr-2" />
              Future of Automation
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
                Automation & Robotics
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Pioneer the future of intelligent automation, robotics, and AI-driven systems
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge className="bg-green-500/20 text-green-300 border-green-400/30 px-4 py-2 text-lg">
                60 Seats Available
              </Badge>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 px-4 py-2 text-lg">
                85% Placement Rate
              </Badge>
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30 px-4 py-2 text-lg">
                ₹4.50 LPA Average Package
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-4 text-lg rounded-xl"
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Check Eligibility
                </Button>
              </Link>
              <Link href="/chat">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl bg-transparent"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Connect with Students
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Program Overview */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <Bot className="h-8 w-8 text-orange-600" />
                  Program Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Automation & Robotics Engineering at MESCOE is a cutting-edge program that combines mechanical,
                  electrical, and computer engineering principles to create intelligent automated systems. Students
                  learn to design, build, and program robots and automation systems for various industries.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Cog className="h-5 w-5 text-orange-600" />
                      Core Specializations
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Industrial Automation Systems",
                        "Robotics Design & Development",
                        "Artificial Intelligence in Robotics",
                        "Control Systems & Process Automation",
                        "Computer Vision & Machine Learning",
                        "Human-Robot Interaction",
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-600" />
                      Program Highlights
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Hands-on robotics projects",
                        "Industry-grade automation labs",
                        "AI and machine learning integration",
                        "International robotics competitions",
                        "Industry mentorship programs",
                        "Research collaboration opportunities",
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-600" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-orange-800">60</h3>
                  <p className="text-orange-600">Total Seats</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">85%</h3>
                  <p className="text-green-600">Placement Rate</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-800">₹15L</h3>
                  <p className="text-yellow-600">Highest Package</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-red-50 to-red-100">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-800">30+</h3>
                  <p className="text-red-600">Industry Partners</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
