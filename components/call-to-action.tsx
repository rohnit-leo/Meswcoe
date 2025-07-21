import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calculator, MessageCircle, Users, Phone } from "lucide-react"
import Link from "next/link"

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container mx-auto px-4">
        <div className="text-center text-white mb-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Engineering Journey?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of successful engineers who started their career at MESCOE
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Check Eligibility</h3>
              <p className="text-sm text-gray-600 mb-4">Calculate your admission chances</p>
              <Link href="/calculator">
                <Button className="w-full">Try Calculator</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Ask Questions</h3>
              <p className="text-sm text-gray-600 mb-4">Get answers from our community</p>
              <Link href="/chat">
                <Button className="w-full bg-transparent" variant="outline">
                  Join Chat
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Campus Tour</h3>
              <p className="text-sm text-gray-600 mb-4">Explore our facilities virtually</p>
              <Link href="/campus-tour">
                <Button className="w-full bg-transparent" variant="outline">
                  Take Tour
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <Phone className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-sm text-gray-600 mb-4">Speak with our admission team</p>
              <Link href="/contact">
                <Button className="w-full bg-transparent" variant="outline">
                  Get in Touch
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
