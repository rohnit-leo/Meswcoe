"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ExternalLink, Copy, Database, Key, CreditCard } from "lucide-react"

export function SetupGuide() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">🚀 MESCOE Connect Setup Guide</h1>
        <p className="text-gray-600">Follow these simple steps to complete your website setup</p>
      </div>

      {/* Step 1: Razorpay */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <CreditCard className="h-6 w-6 text-green-600" />
            Step 1: Razorpay Setup ✅ COMPLETED
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg">
              <p className="font-medium text-green-800 mb-2">✅ Your Razorpay Keys (Already Added):</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Key ID</Badge>
                  <code className="bg-gray-100 px-2 py-1 rounded">rzp_live_VTrMKfLm3cgEZN</code>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Key Secret</Badge>
                  <code className="bg-gray-100 px-2 py-1 rounded">6F0D4EySDnUApFuJfaKAe0tf</code>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Supabase */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6 text-blue-600" />
            Step 2: Supabase Database Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-3">2.1 Create Supabase Account:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>
                Go to{" "}
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  supabase.com <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>Click "Start your project" and sign up</li>
              <li>
                Create new project with name: <code className="bg-gray-100 px-1 rounded">mescoe-connect</code>
              </li>
              <li>Choose region closest to India (Singapore recommended)</li>
              <li>Set a strong database password and save it!</li>
            </ol>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-3">2.2 Get Your Supabase Keys:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>After project creation, go to Settings → API</li>
              <li>Copy these two values:</li>
            </ol>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Project URL</Badge>
                <span className="text-xs text-gray-600">https://xxxxx.supabase.co</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Anon Key</Badge>
                <span className="text-xs text-gray-600">eyJ... (long string)</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-3">2.3 Set Up Database:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>In Supabase dashboard, go to SQL Editor</li>
              <li>Click "New Query"</li>
              <li>Copy and paste the SQL script from the files above</li>
              <li>Click "Run" to create all tables</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Step 3: Environment Variables */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-6 w-6 text-yellow-600" />
            Step 3: Add Environment Variables
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-3">
              Once you have your Supabase keys, add these environment variables:
            </p>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <span>NEXT_PUBLIC_SUPABASE_URL=your_project_url</span>
                <button
                  onClick={() => copyToClipboard("NEXT_PUBLIC_SUPABASE_URL=")}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <span>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key</span>
                <button
                  onClick={() => copyToClipboard("NEXT_PUBLIC_SUPABASE_ANON_KEY=")}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between bg-green-100 p-2 rounded">
                <span>RAZORPAY_KEY_ID=rzp_live_VTrMKfLm3cgEZN</span>
                <span className="text-green-600 text-xs">✅ Added</span>
              </div>
              <div className="flex items-center justify-between bg-green-100 p-2 rounded">
                <span>RAZORPAY_KEY_SECRET=6F0D4EySDnUApFuJfaKAe0tf</span>
                <span className="text-green-600 text-xs">✅ Added</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-800">🎉 After Setup Complete:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Users can register and login</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Real-time chat will work</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Merchandise store with payments</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>All features fully functional</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
