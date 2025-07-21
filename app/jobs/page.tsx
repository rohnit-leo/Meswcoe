"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, MapPin, DollarSign, Search, Filter, Star, Building2, Users, Calendar } from "lucide-react"
import { supabase, type JobPosting } from "@/lib/supabase"
import Link from "next/link"

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [jobTypeFilter, setJobTypeFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("job_postings")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false })

      if (error) throw error
      setJobs(data || [])
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = jobTypeFilter === "all" || job.job_type === jobTypeFilter
    const matchesLocation =
      locationFilter === "all" || job.location?.toLowerCase().includes(locationFilter.toLowerCase())

    return matchesSearch && matchesType && matchesLocation
  })

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case "full-time":
        return "bg-green-100 text-green-700 border-green-200"
      case "part-time":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "internship":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "contract":
        return "bg-orange-100 text-orange-700 border-orange-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getExperienceColor = (level: string) => {
    switch (level) {
      case "entry":
        return "bg-cyan-100 text-cyan-700 border-cyan-200"
      case "mid":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "senior":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="h-16 w-16 text-cyan-500 mx-auto mb-4 animate-pulse" />
          <p className="text-xl text-gray-600">Loading job opportunities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-cyan-100 to-blue-100 px-4 py-2 rounded-full text-cyan-700 font-medium mb-4">
            Career Opportunities
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Job Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover exciting career opportunities from top companies. Find your dream job and take the next step in
            your career.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs or companies..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{filteredJobs.length}</h3>
              <p className="text-gray-600">Active Jobs</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{new Set(jobs.map((j) => j.company_name)).size}</h3>
              <p className="text-gray-600">Companies</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {jobs.filter((j) => j.job_type === "internship").length}
              </h3>
              <p className="text-gray-600">Internships</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{jobs.filter((j) => j.featured).length}</h3>
              <p className="text-gray-600">Featured</p>
            </CardContent>
          </Card>
        </div>

        {/* Job Listings */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">No Jobs Found</h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm border-0 shadow-lg overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-8 w-8 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-gray-800">{job.title}</h3>
                            {job.featured && (
                              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-lg font-semibold text-cyan-600 mb-2">{job.company_name}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="outline" className={getJobTypeColor(job.job_type)}>
                              <Briefcase className="h-3 w-3 mr-1" />
                              {job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)}
                            </Badge>
                            <Badge variant="outline" className={getExperienceColor(job.experience_level)}>
                              <Users className="h-3 w-3 mr-1" />
                              {job.experience_level.charAt(0).toUpperCase() + job.experience_level.slice(1)} Level
                            </Badge>
                            {job.location && (
                              <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                                <MapPin className="h-3 w-3 mr-1" />
                                {job.location}
                              </Badge>
                            )}
                            {job.salary_range && (
                              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                                <DollarSign className="h-3 w-3 mr-1" />
                                {job.salary_range}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>

                      {job.application_deadline && (
                        <div className="flex items-center gap-2 text-sm text-orange-600 mb-4">
                          <Calendar className="h-4 w-4" />
                          <span>Application Deadline: {new Date(job.application_deadline).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 lg:w-48">
                      <Button
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                        asChild
                      >
                        <Link href={job.application_url || "#"} target="_blank">
                          Apply Now
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full border-2 border-gray-200 hover:border-cyan-400 hover:bg-cyan-50 transition-all duration-300 bg-transparent"
                      >
                        View Details
                      </Button>

                      <div className="text-center text-xs text-gray-500 mt-2">
                        Posted {new Date(job.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
