import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Computer,
  Code,
  Users,
  TrendingUp,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Star,
  ArrowRight,
  CheckCircle,
  Building,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const subjects = [
  { name: "Programming Fundamentals", semester: 1, credits: 4 },
  { name: "Data Structures & Algorithms", semester: 2, credits: 4 },
  { name: "Object Oriented Programming", semester: 3, credits: 4 },
  { name: "Database Management Systems", semester: 4, credits: 4 },
  { name: "Computer Networks", semester: 5, credits: 4 },
  { name: "Software Engineering", semester: 6, credits: 4 },
  { name: "Machine Learning", semester: 7, credits: 4 },
  { name: "Project Work", semester: 8, credits: 6 },
]

const careerPaths = [
  {
    title: "Software Developer",
    description: "Design and develop software applications",
    salary: "₹3.5 - ₹12 LPA",
    companies: ["TCS", "Infosys", "Microsoft", "Google"],
    skills: ["Java", "Python", "React", "Node.js"],
  },
  {
    title: "Data Scientist",
    description: "Analyze complex data to drive business decisions",
    salary: "₹4 - ₹15 LPA",
    companies: ["Amazon", "Flipkart", "Zomato", "Paytm"],
    skills: ["Python", "R", "Machine Learning", "SQL"],
  },
  {
    title: "Full Stack Developer",
    description: "Work on both frontend and backend development",
    salary: "₹4 - ₹14 LPA",
    companies: ["Wipro", "Cognizant", "Accenture", "IBM"],
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
  },
  {
    title: "AI/ML Engineer",
    description: "Develop artificial intelligence and machine learning solutions",
    salary: "₹5 - ₹18 LPA",
    companies: ["NVIDIA", "Intel", "Adobe", "Salesforce"],
    skills: ["Python", "TensorFlow", "PyTorch", "Deep Learning"],
  },
]

const facilities = [
  {
    name: "Advanced Computing Lab",
    description: "Latest hardware with high-end processors and graphics cards",
    image: "/placeholder.svg?height=300&width=400&text=Computing+Lab",
  },
  {
    name: "Software Development Center",
    description: "Industry-standard development tools and environments",
    image: "/placeholder.svg?height=300&width=400&text=Dev+Center",
  },
  {
    name: "AI & ML Research Lab",
    description: "Dedicated space for artificial intelligence research",
    image: "/placeholder.svg?height=300&width=400&text=AI+Lab",
  },
  {
    name: "Project Innovation Hub",
    description: "Collaborative space for final year projects",
    image: "/placeholder.svg?height=300&width=400&text=Innovation+Hub",
  },
]

const achievements = [
  "Winner of Smart India Hackathon 2023",
  "Best Computer Engineering Department Award 2022",
  "100+ Research Papers Published",
  "Industry Collaboration with 50+ Companies",
  "95% Placement Record in Top Companies",
]

export default function ComputerEngineeringPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-blue-200 font-medium mb-6">
              <Computer className="inline h-5 w-5 mr-2" />
              Engineering Excellence
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Computer Engineering
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Shape the future with cutting-edge technology, innovative software solutions, and artificial intelligence
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge className="bg-green-500/20 text-green-300 border-green-400/30 px-4 py-2 text-lg">
                180 Seats Available
              </Badge>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 px-4 py-2 text-lg">
                92% Placement Rate
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 px-4 py-2 text-lg">
                ₹4.12 LPA Average Package
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg rounded-xl"
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
                  <Computer className="h-8 w-8 text-blue-600" />
                  Program Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Computer Engineering at MESCOE is designed to prepare students for the rapidly evolving technology
                  landscape. Our comprehensive curriculum covers software development, artificial intelligence, machine
                  learning, data science, cybersecurity, and emerging technologies.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Code className="h-5 w-5 text-blue-600" />
                      Core Specializations
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Software Development & Engineering",
                        "Artificial Intelligence & Machine Learning",
                        "Data Science & Analytics",
                        "Web & Mobile App Development",
                        "Cybersecurity & Information Security",
                        "Cloud Computing & DevOps",
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
                      <Award className="h-5 w-5 text-purple-600" />
                      Program Highlights
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Industry-aligned curriculum",
                        "Hands-on project-based learning",
                        "Internship opportunities",
                        "Research & innovation focus",
                        "Industry expert guest lectures",
                        "International certification programs",
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
              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-800">180</h3>
                  <p className="text-blue-600">Total Seats</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">92%</h3>
                  <p className="text-green-600">Placement Rate</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-800">₹12L</h3>
                  <p className="text-purple-600">Highest Package</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-orange-800">50+</h3>
                  <p className="text-orange-600">Industry Partners</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-8">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-green-600" />
                  Curriculum Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((semester) => (
                    <Card key={semester} className="border border-gray-200">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                        <CardTitle className="text-lg">Semester {semester}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <ul className="space-y-2">
                          {subjects
                            .filter((subject) => subject.semester === semester)
                            .map((subject, index) => (
                              <li key={index} className="flex justify-between items-center">
                                <span className="text-gray-700">{subject.name}</span>
                                <Badge variant="outline">{subject.credits} Credits</Badge>
                              </li>
                            ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="careers" className="space-y-8">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <Briefcase className="h-8 w-8 text-purple-600" />
                  Career Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {careerPaths.map((career, index) => (
                    <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{career.title}</h3>
                        <p className="text-gray-600 mb-4">{career.description}</p>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="font-semibold text-green-600">{career.salary}</span>
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-2">Top Hiring Companies:</p>
                            <div className="flex flex-wrap gap-2">
                              {career.companies.map((company, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {company}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-2">Key Skills:</p>
                            <div className="flex flex-wrap gap-2">
                              {career.skills.map((skill, idx) => (
                                <Badge key={idx} className="bg-blue-100 text-blue-700 text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-8">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <Building className="h-8 w-8 text-indigo-600" />
                  World-Class Facilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {facilities.map((facility, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Image
                          src={facility.image || "/placeholder.svg"}
                          alt={facility.name}
                          width={400}
                          height={300}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{facility.name}</h3>
                        <p className="text-gray-600">{facility.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-8">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <Award className="h-8 w-8 text-yellow-600" />
                  Department Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Achievements</h3>
                    <ul className="space-y-4">
                      {achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <Star className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Recognition & Awards</h3>
                    <div className="space-y-4">
                      <Card className="border border-yellow-200 bg-yellow-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-yellow-800">Best Department Award 2023</h4>
                          <p className="text-sm text-yellow-700">Recognized for outstanding academic performance</p>
                        </CardContent>
                      </Card>

                      <Card className="border border-blue-200 bg-blue-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-blue-800">Innovation Excellence</h4>
                          <p className="text-sm text-blue-700">Leading in research and development projects</p>
                        </CardContent>
                      </Card>

                      <Card className="border border-green-200 bg-green-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-green-800">Industry Partnership</h4>
                          <p className="text-sm text-green-700">Strong collaboration with tech companies</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="mt-16 shadow-2xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <CardContent className="relative p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 text-blue-100">Join the next generation of computer engineers and innovators</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Check Your Eligibility
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/chat">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl bg-transparent"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Connect with Alumni
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
