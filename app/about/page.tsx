import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Users, Zap, Target, Globe, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">About MESCOE</h1>
          <p className="text-xl text-cyan-100 max-w-3xl">
            A Premier Engineering Institution Committed to Excellence, Innovation, and Holistic Development
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Introduction */}
        <section className="grid lg:grid-cols-2 gap-12 items-center animate-fade-in">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Welcome to MESCOE</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Modern Education Society's Wadia College of Engineering (MESCOE), Pune, established in 1999, stands as a
              beacon of excellence in technical education. Recognized by prestigious accreditation bodies including NAAC
              and NBA, MESCOE is committed to fostering innovation, critical thinking, and ethical values in every
              student.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Located in the heart of Pune, our campus provides a conducive environment for learning and research,
              blending academic rigor with practical expertise. Our commitment to quality education has earned us a
              reputation as a leading engineering institution in the region.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-cyan-600 mb-2">25+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
                <div className="text-gray-600">Student Community</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">6</div>
                <div className="text-gray-600">Engineering Branches</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">85%+</div>
                <div className="text-gray-600">Placement Rate</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mission Vision Values */}
        <section className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-6 w-6 text-cyan-600" />
                <CardTitle className="text-xl">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                To impart quality technical education, foster innovation and research, and develop responsible engineers
                who contribute meaningfully to society and the nation's development.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
                <CardTitle className="text-xl">Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                To be a center of excellence in engineering education, recognized globally for producing innovative
                professionals who drive technological advancement and social progress.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-green-600" />
                <CardTitle className="text-xl">Our Values</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Excellence, integrity, innovation, inclusivity, and social responsibility. We believe in holistic
                development and ethical practice in all endeavors.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Accreditations */}
        <section className="bg-gradient-to-r from-cyan-50 to-blue-50 p-12 rounded-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Accreditations & Recognition</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "NBA Accreditation", desc: "National Board of Accreditation Recognized" },
              { icon: Globe, title: "NAAC Accredited", desc: "National Assessment & Accreditation Council" },
              { icon: Users, title: "AICTE Approved", desc: "All India Council for Technical Education" },
              { icon: Target, title: "University of Pune", desc: "Affiliated with University of Pune" },
            ].map((acc, idx) => {
              const Icon = acc.icon
              return (
                <Card key={idx} className="border-0 shadow-lg text-center hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{acc.title}</h3>
                    <p className="text-sm text-gray-600">{acc.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Academic Excellence */}
        <section>
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Academic Excellence</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-cyan-600" />
                  Engineering Programs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Bachelor of Engineering (B.E.) - 6 Branches",
                    "Master of Engineering (M.E.) - 3 Specializations",
                    "Research & PhD Programs",
                    "Industry-Aligned Curriculum",
                    "Hands-on Laboratory Experience",
                    "Industry Internships & Projects",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  Key Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "World-Class Faculty & Researchers",
                    "State-of-the-Art Laboratories",
                    "Industry Partnerships & Collaborations",
                    "Research & Innovation Centers",
                    "Strong Alumni Network",
                    "International Academic Exchange Programs",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Infrastructure */}
        <section>
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">World-Class Infrastructure</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Advanced Labs", items: ["CAD Labs", "Embedded Systems", "Robotics Lab", "IoT Laboratory"] },
              { title: "Learning Spaces", items: ["Smart Classrooms", "Auditoriums", "Seminar Halls", "Library"] },
              {
                title: "Student Amenities",
                items: ["Cafeteria", "Sports Complex", "Hostel Facilities", "Medical Center"],
              },
            ].map((category, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all">
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Placement & Career */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 p-12 rounded-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Placement & Career Development</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Placement Statistics
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Placement Rate", value: "85%+" },
                  { label: "Average Package", value: "₹4.2 LPA" },
                  { label: "Highest Package", value: "₹15 LPA" },
                  { label: "Top Recruiters", value: "50+ Companies" },
                ].map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-3 border-b border-green-200">
                    <span className="text-gray-700">{stat.label}</span>
                    <span className="font-bold text-green-600">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Career Services
              </h3>
              <ul className="space-y-3">
                {[
                  "Career Counseling & Guidance",
                  "Resume Building Workshops",
                  "Interview Preparation Programs",
                  "Industry Mentorship Programs",
                  "Entrepreneurship Support",
                  "Alumni Network Access",
                ].map((service, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
