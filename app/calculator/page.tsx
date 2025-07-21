"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calculator, CheckCircle, AlertCircle } from "lucide-react"

interface CalculationResult {
  eligibleBranches: string[]
  message: string
  confidence: "high" | "medium" | "low"
}

export default function AdmissionCalculator() {
  const [formData, setFormData] = useState({
    pcmPercentage: "",
    cetScore: "",
    jeeScore: "",
  })
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateEligibility = async () => {
    setIsCalculating(true)

    // Simulate calculation logic
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const pcm = Number.parseFloat(formData.pcmPercentage)
    const cet = Number.parseFloat(formData.cetScore)
    const jee = Number.parseFloat(formData.jeeScore)

    let eligibleBranches: string[] = []
    let confidence: "high" | "medium" | "low" = "low"

    // Simple eligibility logic
    if (pcm >= 80 && (cet >= 90 || jee >= 85)) {
      eligibleBranches = ["Computer Engineering", "ENTC Engineering", "Automation & Robotics", "Mechanical Engineering"]
      confidence = "high"
    } else if (pcm >= 70 && (cet >= 75 || jee >= 70)) {
      eligibleBranches = ["ENTC Engineering", "Automation & Robotics", "Mechanical Engineering"]
      confidence = "medium"
    } else if (pcm >= 60 && (cet >= 60 || jee >= 55)) {
      eligibleBranches = ["Mechanical Engineering"]
      confidence = "medium"
    } else if (pcm >= 45) {
      eligibleBranches = []
      confidence = "low"
    }

    const message =
      eligibleBranches.length > 0
        ? "Great! You're eligible for admission to the following branches."
        : "Based on your scores, admission might be challenging. Consider improving your scores or exploring other options."

    setResult({ eligibleBranches, message, confidence })
    setIsCalculating(false)

    // Save to database (simulated)
    console.log("Saving submission to Supabase:", formData, result)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Calculator className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Admission Calculator</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your chances of getting admission to MESCOE based on your academic performance
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Academic Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="pcm">12th Grade PCM Percentage</Label>
                <Input
                  id="pcm"
                  type="number"
                  placeholder="Enter your PCM percentage"
                  value={formData.pcmPercentage}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pcmPercentage: e.target.value }))}
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <Label htmlFor="cet">MHT-CET Score (Optional)</Label>
                <Input
                  id="cet"
                  type="number"
                  placeholder="Enter your CET score"
                  value={formData.cetScore}
                  onChange={(e) => setFormData((prev) => ({ ...prev, cetScore: e.target.value }))}
                  min="0"
                  max="200"
                />
              </div>

              <div>
                <Label htmlFor="jee">JEE Main Score (Optional)</Label>
                <Input
                  id="jee"
                  type="number"
                  placeholder="Enter your JEE Main score"
                  value={formData.jeeScore}
                  onChange={(e) => setFormData((prev) => ({ ...prev, jeeScore: e.target.value }))}
                  min="0"
                  max="300"
                />
              </div>

              <Button
                onClick={calculateEligibility}
                disabled={!formData.pcmPercentage || isCalculating}
                className="w-full"
                size="lg"
              >
                {isCalculating ? "Calculating..." : "Calculate My Chances"}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result.eligibleBranches.length > 0 ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                  )}
                  Calculation Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{result.message}</p>

                {result.eligibleBranches.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Eligible Branches:</h4>
                    <div className="space-y-2">
                      {result.eligibleBranches.map((branch) => (
                        <div key={branch} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">{branch}</span>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Eligible
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Next Steps:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Apply through Maharashtra DTE CAP process</li>
                    <li>• Keep all documents ready for verification</li>
                    <li>• Monitor counselling rounds and seat allotment</li>
                    <li>• Contact our admission team for guidance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
