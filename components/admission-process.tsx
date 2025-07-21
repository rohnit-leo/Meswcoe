import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, CreditCard, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: FileText,
    title: "Eligibility Check",
    description: "HSC (12th) with PCM, minimum 45% marks",
    details: ["Physics, Chemistry, Mathematics mandatory", "Valid MHT-CET or JEE Main score"],
  },
  {
    icon: Calendar,
    title: "Application Process",
    description: "Online application through DTE Maharashtra",
    details: ["Fill CAP application form", "Document verification", "Choice filling"],
  },
  {
    icon: CheckCircle,
    title: "Merit List & Counselling",
    description: "Based on MHT-CET/JEE Main ranks",
    details: ["Merit list publication", "Online counselling rounds", "Seat allotment"],
  },
  {
    icon: CreditCard,
    title: "Admission Confirmation",
    description: "Fee payment and document submission",
    details: ["Pay admission fees: ₹4.07L total", "Submit original documents", "Confirm admission"],
  },
]

export function AdmissionProcess() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Admission Process</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple and transparent admission process through Maharashtra DTE counselling
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <Card key={index} className="relative hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                    <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Important Dates 2025</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="font-semibold text-blue-600">Application Start</p>
              <p className="text-gray-700">May 2025</p>
            </div>
            <div>
              <p className="font-semibold text-blue-600">Counselling Rounds</p>
              <p className="text-gray-700">July - August 2025</p>
            </div>
            <div>
              <p className="font-semibold text-blue-600">Classes Begin</p>
              <p className="text-gray-700">August 2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
