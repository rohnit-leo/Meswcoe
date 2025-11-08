"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, Briefcase, TrendingUp, Clock, CheckCircle } from "lucide-react"

// Demo Data
const branches = [
  { id: "cse", name: "Computer Science Engineering" },
  { id: "entc", name: "Electronics & Telecommunication" },
  { id: "mech", name: "Mechanical Engineering" },
  { id: "auto", name: "Automation & Robotics" },
]

const divisions = [
  { id: "1", name: "Division A - CSE", branchId: "cse" },
  { id: "2", name: "Division B - CSE", branchId: "cse" },
  { id: "3", name: "Division A - ENTC", branchId: "entc" },
  { id: "4", name: "Division B - ENTC", branchId: "entc" },
  { id: "5", name: "Division A - MECH", branchId: "mech" },
  { id: "6", name: "Division B - MECH", branchId: "mech" },
]

const assignments = [
  {
    id: "1",
    title: "Data Structures - Assignment 1",
    subject: "Data Structures",
    dueDate: "2025-01-20",
    status: "submitted",
    score: "45/50",
    division: "1",
  },
  {
    id: "2",
    title: "DBMS - Mini Project",
    subject: "Database Management",
    dueDate: "2025-02-01",
    status: "pending",
    division: "1",
  },
  {
    id: "3",
    title: "Signal Processing - Lab Report",
    subject: "Signal Processing",
    dueDate: "2025-01-25",
    status: "submitted",
    score: "42/50",
    division: "3",
  },
]

const activities = [
  {
    id: "1",
    title: "Hackathon 2025",
    type: "Competition",
    date: "2025-02-15",
    division: "1",
    participants: 45,
  },
  {
    id: "2",
    title: "Industry Expert Talk",
    type: "Seminar",
    date: "2025-02-10",
    division: "1",
    participants: 200,
  },
  {
    id: "3",
    title: "Workshop: IoT Applications",
    type: "Workshop",
    date: "2025-02-20",
    division: "3",
    participants: 60,
  },
]

const studentData: Record<string, any> = {
  F22211074: {
    name: "Priya Sharma",
    email: "priya.sharma@mescoe.edu",
    branch: "cse",
    division: "1",
    year: "4",
    attendance: 87,
    cgpa: 8.45,
    submissions: 18,
    pendingAssignments: 2,
    achievements: ["Best Project Award 2024", "Hackathon Winner 2024"],
  },
  F22211075: {
    name: "Aarav Patel",
    email: "aarav.patel@mescoe.edu",
    branch: "cse",
    division: "1",
    year: "4",
    attendance: 92,
    cgpa: 8.78,
    submissions: 20,
    pendingAssignments: 0,
    achievements: ["Dean's List 2024", "Topper in Data Structures"],
  },
  F22211083: {
    name: "Anjali Verma",
    email: "anjali.verma@mescoe.edu",
    branch: "entc",
    division: "3",
    year: "3",
    attendance: 85,
    cgpa: 8.12,
    submissions: 17,
    pendingAssignments: 1,
    achievements: ["Circuit Design Competition Winner"],
  },
}

export default function StudentPortalPage() {
  const [selectedBranch, setSelectedBranch] = useState("")
  const [selectedDivision, setSelectedDivision] = useState("")
  const [prnNumber, setPrnNumber] = useState("")
  const [studentInfo, setStudentInfo] = useState<any>(null)

  const filteredDivisions = selectedBranch ? divisions.filter((d) => d.branchId === selectedBranch) : []

  const filteredAssignments = selectedDivision ? assignments.filter((a) => a.division === selectedDivision) : []

  const filteredActivities = selectedDivision ? activities.filter((a) => a.division === selectedDivision) : []

  const handlePRNSearch = () => {
    if (prnNumber in studentData) {
      setStudentInfo(studentData[prnNumber])
    } else {
      setStudentInfo(null)
      alert("Student not found")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Student Portal</h1>
          <p className="text-xl text-cyan-100">
            Access assignments, projects, activities, and track your academic progress
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Branch & Division Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-cyan-600" />
                Select Branch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedBranch}
                onValueChange={(value) => {
                  setSelectedBranch(value)
                  setSelectedDivision("")
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose branch..." />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Select Division
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedDivision} onValueChange={setSelectedDivision} disabled={!selectedBranch}>
                <SelectTrigger>
                  <SelectValue placeholder={selectedBranch ? "Choose division..." : "Select branch first"} />
                </SelectTrigger>
                <SelectContent>
                  {filteredDivisions.map((division) => (
                    <SelectItem key={division.id} value={division.id}>
                      {division.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Class Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDivision ? (
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">{filteredAssignments.length}</span> Active Assignments
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">{filteredActivities.length}</span> Upcoming Events
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200 mt-2">Active Division</Badge>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Select a division to view overview</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Assignments & Activities Section */}
        {selectedDivision && (
          <div className="mb-12 animate-fade-in">
            <Tabs defaultValue="assignments" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
              </TabsList>

              <TabsContent value="assignments" className="space-y-4">
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map((assignment) => (
                    <Card key={assignment.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <FileText className="h-5 w-5 text-cyan-600" />
                              <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{assignment.subject}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                              {assignment.score && <span>Score: {assignment.score}</span>}
                            </div>
                          </div>
                          <div>
                            {assignment.status === "submitted" ? (
                              <Badge className="bg-green-100 text-green-700 border-green-200 flex items-center gap-2">
                                <CheckCircle className="h-3 w-3" /> Submitted
                              </Badge>
                            ) : (
                              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 flex items-center gap-2">
                                <Clock className="h-3 w-3" /> Pending
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="pt-6 text-center text-gray-500">
                      No assignments yet for this division
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Mini Project - IoT System</h3>
                        <p className="text-gray-600 mb-3">Build an IoT-based home automation system</p>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">In Progress</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activities" className="space-y-4">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <Card key={activity.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{activity.title}</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>Type: {activity.type}</p>
                              <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
                              <p>Participants: {activity.participants}</p>
                            </div>
                          </div>
                          <Badge className="bg-cyan-100 text-cyan-700 border-cyan-200">{activity.type}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="pt-6 text-center text-gray-500">
                      No activities yet for this division
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Student Lookup Section */}
        <Card className="border-0 shadow-lg mb-12 bg-gradient-to-br from-cyan-50 to-blue-50 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-600" />
              Student Information Lookup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter PRN (e.g., F22211074)"
                  value={prnNumber}
                  onChange={(e) => setPrnNumber(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === "Enter" && handlePRNSearch()}
                  className="flex-1"
                />
                <Button
                  onClick={handlePRNSearch}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Search
                </Button>
              </div>

              {studentInfo && (
                <div className="grid md:grid-cols-2 gap-6 animate-fade-in pt-6 border-t border-blue-200">
                  {/* Student Details */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Name</div>
                      <div className="text-xl font-bold text-gray-800">{studentInfo.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <div className="text-base text-gray-800">{studentInfo.email}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Year</div>
                        <div className="text-lg font-bold text-cyan-600">{studentInfo.year}st Year</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">CGPA</div>
                        <div className="text-lg font-bold text-green-600">{studentInfo.cgpa}</div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Stats */}
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Attendance</span>
                        <span className="text-xl font-bold text-blue-600">{studentInfo.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                          style={{ width: `${studentInfo.attendance}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Card className="border-0 shadow bg-white">
                        <CardContent className="pt-4 text-center">
                          <div className="text-2xl font-bold text-purple-600">{studentInfo.submissions}</div>
                          <div className="text-xs text-gray-600">Submissions</div>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow bg-white">
                        <CardContent className="pt-4 text-center">
                          <div className="text-2xl font-bold text-orange-600">{studentInfo.pendingAssignments}</div>
                          <div className="text-xs text-gray-600">Pending</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Achievements */}
                  {studentInfo.achievements.length > 0 && (
                    <div className="md:col-span-2">
                      <h4 className="font-bold text-gray-800 mb-3">Achievements</h4>
                      <div className="space-y-2">
                        {studentInfo.achievements.map((achievement: string, idx: number) => (
                          <Badge key={idx} className="bg-yellow-100 text-yellow-700 border-yellow-200 block w-fit">
                            ⭐ {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Users } from "lucide-react"
