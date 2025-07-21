import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Computer, Cpu, Bot, Cog, TrendingUp, Star } from "lucide-react"
import Link from "next/link"

const branches = [
  {
    id: "computer",
    name: "Computer Engineering",
    seats: 180,
    avgPackage: "₹4.12 LPA",
    topPackage: "₹12 LPA",
    icon: Computer,
    description: "Software Development, AI/ML, Data Science, Web Technologies",
    topRecruiters: ["TCS", "Infosys", "Wipro", "Cognizant", "Microsoft", "Amazon"],
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-500",
    placement: 92,
  },
  {
    id: "entc",
    name: "ENTC Engineering",
    seats: 120,
    avgPackage: "₹4.20 LPA",
    topPackage: "₹10 LPA",
    icon: Cpu,
    description: "Electronics, Telecommunications, Embedded Systems, IoT",
    topRecruiters: ["L&T", "Bajaj Auto", "Mahindra", "Siemens", "Bosch", "Qualcomm"],
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-50",
    iconBg: "bg-cyan-500",
    placement: 88,
  },
  {
    id: "robotics",
    name: "Automation & Robotics",
    seats: 60,
    avgPackage: "₹4.50 LPA",
    topPackage: "₹15 LPA",
    icon: Bot,
    description: "Industrial Automation, Robotics, Control Systems, AI",
    topRecruiters: ["ABB", "Schneider", "Honeywell", "Emerson", "KUKA", "Fanuc"],
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50",
    iconBg: "bg-yellow-500",
    placement: 85,
  },
  {
    id: "mechanical",
    name: "Mechanical Engineering",
    seats: 120,
    avgPackage: "₹3.80 LPA",
    topPackage: "₹8 LPA",
    icon: Cog,
    description: "Manufacturing, Design, Thermal Engineering, Automotive",
    topRecruiters: ["Tata Motors", "Bajaj Auto", "Mahindra", "L&T", "Ashok Leyland", "Kirloskar"],
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconBg: "bg-purple-500",
    placement: 82,
  },
]

export function BranchesOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-cyan-100 to-yellow-100 px-4 py-2 rounded-full text-cyan-700 font-medium mb-4">
            Engineering Programs
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Choose Your Engineering Path
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our industry-aligned engineering programs with excellent placement records and cutting-edge
            curriculum
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {branches.map((branch, index) => {
            const IconComponent = branch.icon
            return (
              <Card
                key={branch.id}
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${branch.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center ${branch.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-700 border-green-200 mb-2">
                        {branch.placement}% Placed
                      </Badge>
                    </div>
                  </div>

                  <CardTitle className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-cyan-700 transition-colors">
                    {branch.name}
                  </CardTitle>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {branch.seats} Seats
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Avg: {branch.avgPackage}
                    </Badge>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Top: {branch.topPackage}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <p className="text-gray-600 mb-6 leading-relaxed">{branch.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-600">{branch.seats}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Seats</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{branch.placement}%</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Placement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        <Star className="h-5 w-5 inline" />
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Top Rated</div>
                    </div>
                  </div>

                  {/* Top Recruiters */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />
                      Top Recruiters
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {branch.topRecruiters.slice(0, 4).map((recruiter) => (
                        <Badge
                          key={recruiter}
                          variant="secondary"
                          className="text-xs bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          {recruiter}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link href={`/branches/${branch.id}`}>
                    <Button
                      className={`w-full bg-gradient-to-r ${branch.color} hover:scale-105 transform transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-lg`}
                    >
                      Explore Program
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
