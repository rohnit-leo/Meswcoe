import { Card, CardContent } from "@/components/ui/card"
import { Users, Microscope, TrendingUp, MapPin, Award, BookOpen } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Experienced Faculty",
    description: "Highly qualified professors with industry experience and research expertise",
  },
  {
    icon: Microscope,
    title: "State-of-the-art Labs",
    description: "Modern laboratories equipped with latest technology and industry-standard equipment",
  },
  {
    icon: TrendingUp,
    title: "Placement Support",
    description: "Dedicated placement cell with 85%+ placement record and industry connections",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Located in Pune, the IT capital of India with numerous internship opportunities",
  },
  {
    icon: Award,
    title: "Accreditation",
    description: "AICTE approved and NBA accredited programs ensuring quality education",
  },
  {
    icon: BookOpen,
    title: "Industry Curriculum",
    description: "Updated curriculum aligned with industry requirements and emerging technologies",
  },
]

export function WhyChooseMescoe() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MESCOE?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what makes us the preferred choice for engineering education in Pune
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
