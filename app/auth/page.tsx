"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LogIn, UserPlus, GraduationCap, Users, BookOpen, Award } from "lucide-react"
import { supabase, createUserProfile } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")
  const router = useRouter()

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    name: "",
    role: "prospective" as "prospective" | "current" | "alumni" | "teacher",
    branch: "",
    batchYear: "",
    city: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      })

      if (error) throw error

      if (data.user) {
        setMessage("Login successful! Redirecting...")
        setMessageType("success")
        setTimeout(() => {
          router.push("/")
        }, 1000)
      }
    } catch (error: any) {
      setMessage(error.message || "Login failed. Please try again.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
      })

      if (error) throw error

      if (data.user) {
        // Create user profile immediately
        const { error: profileError } = await createUserProfile({
          id: data.user.id,
          email: signupData.email,
          name: signupData.name,
          role: signupData.role,
          branch: signupData.branch || undefined,
          batch_year: signupData.batchYear ? Number.parseInt(signupData.batchYear) : undefined,
          city: signupData.city || undefined,
          is_verified: true,
          last_active: new Date().toISOString(),
        })

        if (profileError) {
          console.error("Profile creation error:", profileError)
        }

        // Sign in the user immediately (no email confirmation needed)
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: signupData.email,
          password: signupData.password,
        })

        if (signInError) throw signInError

        setMessage("Account created successfully! Redirecting...")
        setMessageType("success")
        setTimeout(() => {
          router.push("/")
        }, 1000)
      }
    } catch (error: any) {
      setMessage(error.message || "Signup failed. Please try again.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "prospective":
        return <GraduationCap className="h-4 w-4" />
      case "current":
        return <BookOpen className="h-4 w-4" />
      case "alumni":
        return <Award className="h-4 w-4" />
      case "teacher":
        return <Users className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full shadow-2xl bg-white/90 backdrop-blur-sm border-0">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent">
            MESCOE Connect
          </CardTitle>
          <p className="text-slate-600 mt-2">Join our vibrant community of learners and innovators</p>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
              <Award className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">25+ Years of Excellence</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full">
              <GraduationCap className="h-4 w-4 text-amber-600" />
              <span className="text-sm text-amber-700 font-medium">NBA Accredited</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {message && (
            <Alert
              className={`mb-6 ${messageType === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}
            >
              <AlertDescription className={messageType === "error" ? "text-red-700" : "text-green-700"}>
                {message}
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <div className="text-center mb-6">
                <GraduationCap className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-slate-800">Welcome Back!</h3>
                <p className="text-slate-600">Sign in to access your MESCOE Connect account</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email Address</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {isLoading ? (
                    "Signing in..."
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <div className="text-center mb-6">
                <UserPlus className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-slate-800">Join MESCOE Connect</h3>
                <p className="text-slate-600">Create your account and become part of our community</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="signup-email">Email Address</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-role">I am a</Label>
                  <Select
                    value={signupData.role}
                    onValueChange={(value: any) => setSignupData({ ...signupData, role: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prospective">
                        <div className="flex items-center gap-2">
                          {getRoleIcon("prospective")}
                          Prospective Student
                        </div>
                      </SelectItem>
                      <SelectItem value="current">
                        <div className="flex items-center gap-2">
                          {getRoleIcon("current")}
                          Current Student
                        </div>
                      </SelectItem>
                      <SelectItem value="alumni">
                        <div className="flex items-center gap-2">
                          {getRoleIcon("alumni")}
                          Alumni
                        </div>
                      </SelectItem>
                      <SelectItem value="teacher">
                        <div className="flex items-center gap-2">
                          {getRoleIcon("teacher")}
                          Faculty/Teacher
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(signupData.role === "current" || signupData.role === "alumni") && (
                  <>
                    <div>
                      <Label htmlFor="signup-branch">Branch</Label>
                      <Input
                        id="signup-branch"
                        type="text"
                        value={signupData.branch}
                        onChange={(e) => setSignupData({ ...signupData, branch: e.target.value })}
                        placeholder="e.g., Computer Engineering"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-batch">Batch Year</Label>
                      <Input
                        id="signup-batch"
                        type="number"
                        value={signupData.batchYear}
                        onChange={(e) => setSignupData({ ...signupData, batchYear: e.target.value })}
                        placeholder="e.g., 2025"
                        className="mt-1"
                      />
                    </div>
                  </>
                )}
                <div>
                  <Label htmlFor="signup-city">City</Label>
                  <Input
                    id="signup-city"
                    type="text"
                    value={signupData.city}
                    onChange={(e) => setSignupData({ ...signupData, city: e.target.value })}
                    placeholder="e.g., Pune"
                    className="mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {isLoading ? (
                    "Creating account..."
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-5 w-5" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
