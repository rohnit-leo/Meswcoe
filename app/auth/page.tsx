"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Mail, Lock, User, AlertCircle, CheckCircle, Phone, MapPin, GraduationCap } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Image from "next/image"

const roles = [
  { value: "prospective", label: "Prospective Student", icon: "🎓", color: "bg-blue-100 text-blue-700" },
  { value: "current", label: "Current Student", icon: "📚", color: "bg-green-100 text-green-700" },
  { value: "alumni", label: "Alumni", icon: "🎖️", color: "bg-purple-100 text-purple-700" },
  { value: "teacher", label: "Faculty Member", icon: "👨‍🏫", color: "bg-orange-100 text-orange-700" },
]

const branches = ["Computer Engineering", "ENTC Engineering", "Automation & Robotics", "Mechanical Engineering"]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: "",
    phone: "",
    branch: "",
    batch_year: "",
    city: "",
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/")
      }
    })
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email.trim(),
        password: loginData.password,
      })

      if (error) throw error

      if (data.user) {
        setMessage({ type: "success", text: "🎉 Login successful! Welcome back!" })
        setTimeout(() => router.push("/"), 1500)
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "❌ Login failed. Please check your credentials." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      setMessage({ type: "error", text: "❌ Passwords do not match!" })
      setIsLoading(false)
      return
    }

    if (signupData.password.length < 6) {
      setMessage({ type: "error", text: "❌ Password must be at least 6 characters long!" })
      setIsLoading(false)
      return
    }

    try {
      // Sign up with Supabase Auth (no email confirmation required)
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email.trim(),
        password: signupData.password,
      })

      if (error) throw error

      if (data.user) {
        // Create detailed user profile in users table
        const { error: profileError } = await supabase.from("users").insert([
          {
            id: data.user.id,
            email: signupData.email.trim(),
            name: signupData.name.trim() || null,
            role: signupData.role,
            phone: signupData.phone.trim() || null,
            branch: signupData.branch || null,
            batch_year: signupData.batch_year ? Number.parseInt(signupData.batch_year) : null,
            city: signupData.city.trim() || null,
          },
        ])

        if (profileError) {
          console.error("Profile creation error:", profileError)
        }

        setMessage({
          type: "success",
          text: "🎉 Account created successfully! You can now login and explore MESCOE Connect!",
        })

        // Reset form and switch to login tab
        setSignupData({
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          role: "",
          phone: "",
          branch: "",
          batch_year: "",
          city: "",
        })

        // Auto login after successful signup
        setTimeout(async () => {
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email: signupData.email.trim(),
            password: signupData.password,
          })

          if (!loginError) {
            router.push("/")
          }
        }, 2000)
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "❌ Signup failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const selectedRole = roles.find((r) => r.value === signupData.role)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <div className="relative bg-white p-6 rounded-full shadow-2xl">
              <Image src="/images/mescoe-logo.png" alt="MESCOE Logo" width={80} height={80} />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mt-6 mb-3">
            Welcome to MESCOE Connect
          </h1>
          <p className="text-gray-600 text-lg">Join our vibrant community of learners and innovators</p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
              25+ Years of Excellence
            </Badge>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              NBA Accredited
            </Badge>
          </div>
        </div>

        {/* Alert Messages */}
        {message && (
          <Alert
            className={`mb-6 border-2 ${
              message.type === "success"
                ? "border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg"
                : "border-red-300 bg-gradient-to-r from-red-50 to-pink-50 shadow-lg"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600" />
            )}
            <AlertDescription
              className={`font-medium ${message.type === "success" ? "text-green-800" : "text-red-800"}`}
            >
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Auth Tabs */}
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/70 backdrop-blur-md shadow-lg border border-white/20 p-1">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold"
            >
              🔐 Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold"
            >
              ✨ Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="mt-6">
            <Card className="shadow-2xl bg-white/95 backdrop-blur-md border-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5"></div>
              <CardHeader className="relative text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  <GraduationCap className="h-6 w-6 text-cyan-600" />
                  Welcome Back!
                </CardTitle>
                <p className="text-gray-600">Sign in to access your MESCOE Connect account</p>
              </CardHeader>
              <CardContent className="relative space-y-6">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-sm font-semibold text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email address"
                        className="pl-12 h-12 border-2 border-gray-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 rounded-xl bg-white/80 backdrop-blur-sm"
                        value={loginData.email}
                        onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm font-semibold text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-12 h-12 border-2 border-gray-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 rounded-xl bg-white/80 backdrop-blur-sm"
                        value={loginData.password}
                        onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-lg rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Signing In...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">🚀 Sign In to MESCOE Connect</div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup" className="mt-6">
            <Card className="shadow-2xl bg-white/95 backdrop-blur-md border-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
              <CardHeader className="relative text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  <User className="h-6 w-6 text-purple-600" />
                  Join MESCOE Family!
                </CardTitle>
                <p className="text-gray-600">Create your account and become part of our community</p>
              </CardHeader>
              <CardContent className="relative space-y-5">
                <form onSubmit={handleSignup} className="space-y-5">
                  {/* Role Selection - Prominent */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">I am a...</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {roles.map((role) => (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => setSignupData((prev) => ({ ...prev, role: role.value }))}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            signupData.role === role.value
                              ? "border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg transform scale-105"
                              : "border-gray-200 bg-white/50 hover:border-purple-200 hover:bg-purple-50/50"
                          }`}
                        >
                          <div className="text-2xl mb-2">{role.icon}</div>
                          <div className="text-sm font-semibold text-gray-800">{role.label}</div>
                        </button>
                      ))}
                    </div>
                    {selectedRole && (
                      <Badge className={`${selectedRole.color} border-0 px-3 py-1`}>
                        Selected: {selectedRole.label}
                      </Badge>
                    )}
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-sm font-semibold text-gray-700">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Your full name"
                          className="pl-11 h-11 border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 rounded-lg bg-white/80"
                          value={signupData.name}
                          onChange={(e) => setSignupData((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-phone" className="text-sm font-semibold text-gray-700">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-phone"
                          type="tel"
                          placeholder="Your phone number"
                          className="pl-11 h-11 border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 rounded-lg bg-white/80"
                          value={signupData.phone}
                          onChange={(e) => setSignupData((prev) => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-semibold text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email address"
                        className="pl-11 h-11 border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 rounded-lg bg-white/80"
                        value={signupData.email}
                        onChange={(e) => setSignupData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  {/* Academic Information */}
                  {(signupData.role === "current" || signupData.role === "alumni") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Branch</Label>
                        <Select
                          value={signupData.branch}
                          onValueChange={(value) => setSignupData((prev) => ({ ...prev, branch: value }))}
                        >
                          <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-purple-400 rounded-lg bg-white/80">
                            <SelectValue placeholder="Select your branch" />
                          </SelectTrigger>
                          <SelectContent>
                            {branches.map((branch) => (
                              <SelectItem key={branch} value={branch}>
                                {branch}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">
                          {signupData.role === "current" ? "Batch Year" : "Graduation Year"}
                        </Label>
                        <Select
                          value={signupData.batch_year}
                          onValueChange={(value) => setSignupData((prev) => ({ ...prev, batch_year: value }))}
                        >
                          <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-purple-400 rounded-lg bg-white/80">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="signup-city" className="text-sm font-semibold text-gray-700">
                      City
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-city"
                        type="text"
                        placeholder="Your city"
                        className="pl-11 h-11 border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 rounded-lg bg-white/80"
                        value={signupData.city}
                        onChange={(e) => setSignupData((prev) => ({ ...prev, city: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm font-semibold text-gray-700">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create password"
                          className="pl-11 h-11 border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 rounded-lg bg-white/80"
                          value={signupData.password}
                          onChange={(e) => setSignupData((prev) => ({ ...prev, password: e.target.value }))}
                          required
                          minLength={6}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-sm font-semibold text-gray-700">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm password"
                          className="pl-11 h-11 border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 rounded-lg bg-white/80"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
                    disabled={isLoading || !signupData.role || signupData.password.length < 6}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">✨ Create My MESCOE Account</div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-8 space-y-3">
          <div className="text-sm text-gray-600">
            By creating an account, you agree to our{" "}
            <a href="/terms" className="text-cyan-600 hover:underline font-medium">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-cyan-600 hover:underline font-medium">
              Privacy Policy
            </a>
          </div>
          <div className="flex justify-center gap-4 text-xs text-gray-500">
            <span>🔒 Secure & Private</span>
            <span>⚡ Instant Access</span>
            <span>🎓 MESCOE Official</span>
          </div>
        </div>
      </div>
    </div>
  )
}
