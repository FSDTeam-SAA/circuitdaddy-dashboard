"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

export default function ActiveProjects() {
  const projects = [
    {
      title: "Tech Startup Recruitment",
      company: "InnovateTech Inc.",
      status: "In Progress",
      startDate: "Started 2 weeks ago",
      dueDate: "15/10/2025",
      progress: 65,
      total: 100,
      avatars: [
        { src: "/diverse-person-portrait.png", fallback: "JD" },
        { src: "/diverse-group-conversation.png", fallback: "SM" },
        { src: "/diverse-group-meeting.png", fallback: "AK" },
      ],
    },
    {
      title: "Engineering Team Expansion",
      company: "TechCorp Solutions",
      status: "In Progress",
      startDate: "Starts in 3 days",
      dueDate: "16/10/2025",
      progress: 15,
      total: 100,
      avatars: [
        { src: "/diverse-group-meeting.png", fallback: "RJ" },
        { src: "/diverse-group-five.png", fallback: "LM" },
      ],
    },
  ]

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between py-[22px] px-4">
        <h2 className="text-[14px] font-semibold text-[#147575]">Active Projects</h2>
        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
          View All
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Project List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <Card key={index} className="border-[#EEEEEE] shadow-none">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-sm font-medium mb-2 text-[#147575]">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-[12px] text-[#68706A]">
                    {project.company}
                  </p>
                </div>
                <div className="flex -space-x-2">
                  {project.avatars.map((avatar, i) => (
                    <Avatar key={i} className="h-8 w-8 border-2 border-white">
                      <AvatarImage src={avatar.src || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-300 text-xs">
                        {avatar.fallback}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Status & Dates */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center mb-4 gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-[#E6EBEB] text-[#00383B] py-1 px-3 rounded-full hover:bg-gray-100"
                  >
                    {project.status}
                  </Badge>
                  <span className="text-[#9E9E9E] text-[12px] font-normal">
                    {project.startDate}
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-[#FEE2E2] text-[#991B1B] py-1 px-3 rounded-full hover:bg-gray-100"
                >
                  {project.dueDate}
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">
                    {project.progress}/{project.total}
                  </span>
                  <span className="font-medium text-gray-700">
                    {project.progress}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-teal-600 transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Card>
  )
}
