import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Computer, Cpu, Bot, Cog, Users, TrendingUp, Building } from "lucide-react"
import Link from "next/link"

const branches = [
  {
    id: "computer",
    name: "Computer Engineering",
    seats: 180,
    duration: "4 Years",
    avgPackage: "₹4.12 LPA",
    topPackage: "₹12 LPA",
    icon: Computer,
    description:
      "Computer Engineering focuses on software development, artificial intelligence, machine learning, data science, and web technologies. Students learn programming languages, algorithms, database management, and system design.",
    scope: [
      "Software Development",
      "Artificial Intelligence & Machine Learning",
      "Data Science & Analytics",
      "Web & Mobile App Development",
      "Cybersecurity",
      "Cloud Computing",
    ],
    careers: [
      "Software Engineer",
      "Data Scientist",
      "AI/ML Engineer",
      "Full Stack Developer",
      "DevOps Engineer",
      "Product Manager",
    ],
    recruiters: ["TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "Microsoft", "Amazon", "Google"],
    placementStats: {
      placed: "92%",
      averagePackage: "₹4.12 LPA",
      highestPackage: "₹12 LPA",
    },
  },
  {
    id: "entc",
    name: "Electronics & Telecommunication",
    seats: 120,
    duration: "4 Years",
    avgPackage: "₹4.20 LPA",
    topPackage: "₹10 LPA",
    icon: Cpu,
    description:
      "ENTC Engineering covers electronics, telecommunications, embedded systems, IoT, signal processing, and communication networks. Students work with cutting-edge technology in electronics and communication.",
    scope: [
      "Embedded Systems",
      "Internet of Things (IoT)",
      "Signal Processing",
      "Communication Networks",
      "VLSI Design",
      "Robotics & Automation",
    ],
    careers: [
      "Electronics Engineer",
      "Embedded Systems Engineer",
      "IoT Developer",
      "Network Engineer",
      "VLSI Design Engineer",
      "Telecommunications Engineer",
    ],
    recruiters: ["L&T", "Bajaj Auto", "Mahindra", "Siemens", "Bosch", "Qualcomm", "Intel", "Samsung"],
    placementStats: {
      placed: "88%",
      averagePackage: "₹4.20 LPA",
      highestPackage: "₹10 LPA",
    },
  },
  {
    id: "robotics",
    name: "Automation & Robotics",
    seats: 60,
    duration: "4 Years",
    avgPackage: "₹4.50 LPA",
    topPackage: "₹15 LPA",
    icon: Bot,
    description:
      "This cutting-edge branch combines mechanical, electrical, and computer engineering to create intelligent automated systems. Students learn robotics, industrial automation, control systems, and AI.",
    scope: [
      "Industrial Automation",
      "Robotics Design & Development",
      "Control Systems",
      "Artificial Intelligence",
      "Machine Vision",
      "Process Automation",
    ],
    careers: [
      "Robotics Engineer",
      "Automation Engineer",
      "Control Systems Engineer",
      "AI Robotics Developer",
      "Process Automation Specialist",
      "Research & Development Engineer",
    ],
    recruiters: ["ABB", "Schneider Electric", "Honeywell", "Emerson", "Siemens", "Rockwell", "KUKA", "Fanuc"],
    placementStats: {
      placed: "85%",
      averagePackage: "₹4.50 LPA",
      highestPackage: "₹15 LPA",
    },
  },
  {
    id: "mechanical",
    name: "Mechanical Engineering",
    seats: 120,
    duration: "4 Years",
    avgPackage: "₹3.80 LPA",
    topPackage: "₹8 LPA",
    icon: Cog,
    description:
      "Mechanical Engineering is one of the oldest and broadest engineering disciplines, covering manufacturing, design, thermal engineering, automotive technology, and industrial processes.",
    scope: [
      "Manufacturing & Production",
      "Automotive Engineering",
      "Thermal Engineering",
      "Design & CAD/CAM",
      "Industrial Engineering",
      "Renewable Energy",
    ],
    careers: [
      "Mechanical Engineer",
      "Design Engineer",
      "Production Engineer",
      "Automotive Engineer",
      "Quality Control Engineer",
      "Project Manager",
    ],
    recruiters: ["Tata Motors", "Bajaj Auto", "Mahindra", "L&T", "Ashok Leyland", "Kirloskar", "Thermax", "Cummins"],
    placementStats: {
      placed: "82%",
      averagePackage: "₹3.80 LPA",
      highestPackage: "₹8 LPA",
    },
  },
]

export default function BranchesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Engineering Branches</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our four engineering programs designed to meet industry demands and prepare you for a successful
            career
          </p>
        </div>

        <div className="space-y-12">
          {branches.map((branch) => {
            const IconComponent = branch.icon
            return (
              <Card key={branch.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex flex-col items-center justify-center">
                    <IconComponent className="h-20 w-20 text-blue-600 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">{branch.name}</h2>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      <Badge variant="secondary">{branch.seats} Seats</Badge>
                      <Badge variant="secondary">{branch.duration}</Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Avg: {branch.avgPackage}
                      </Badge>
                    </div>
                    <Link href={`/branches/${branch.id}`}>
                      <Button size="lg">View Details</Button>
                    </Link>
                  </div>

                  <div className="md:w-2/3 p-8">
                    <p className="text-gray-700 mb-6">{branch.description}</p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Building className="h-5 w-5 mr-2 text-blue-600" />
                          Career Scope
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {branch.scope.slice(0, 4).map((item) => (
                            <li key={item} className="flex items-start">
                              <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Users className="h-5 w-5 mr-2 text-green-600" />
                          Career Opportunities
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {branch.careers.slice(0, 4).map((career) => (
                            <li key={career} className="flex items-start">
                              <span className="w-1 h-1 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {career}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                        Top Recruiters
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {branch.recruiters.slice(0, 6).map((recruiter) => (
                          <Badge key={recruiter} variant="outline" className="text-xs">
                            {recruiter}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Placement Statistics</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{branch.placementStats.placed}</p>
                          <p className="text-xs text-gray-600">Students Placed</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">{branch.placementStats.averagePackage}</p>
                          <p className="text-xs text-gray-600">Average Package</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-purple-600">{branch.placementStats.highestPackage}</p>
                          <p className="text-xs text-gray-600">Highest Package</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
