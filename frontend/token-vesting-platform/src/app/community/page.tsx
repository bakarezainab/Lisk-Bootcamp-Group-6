"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Calendar, ExternalLink, Github, Twitter, ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"

const Community = () => {
  const [activeTab, setActiveTab] = useState("overview")

  // const communityStats = [
  //   { label: "Active Members", value: "12,847", icon: Users },
  //   { label: "Daily Messages", value: "2,341", icon: MessageCircle },
  //   { label: "Events This Month", value: "8", icon: Calendar },
  //   { label: "Contributors", value: "156", icon: Trophy },
  // ]

  const socialChannels = [
    {
      name: "Discord",
      description: "Join our main community hub for real-time discussions",
      members: "8.2K",
      icon: MessageCircle,
      link: "#",
      color: "bg-purple-600",
    },
    {
      name: "Twitter",
      description: "Follow us for updates and announcements",
      members: "15.3K",
      icon: Twitter,
      link: "#",
      color: "bg-blue-600",
    },
    {
      name: "GitHub",
      description: "Contribute to our open-source development",
      members: "892",
      icon: Github,
      link: "#",
      color: "bg-gray-600",
    },
  ]

  const upcomingEvents = [
    {
      title: "VestFlow Community Call",
      date: "Dec 15, 2024",
      time: "3:00 PM UTC",
      type: "Virtual Meetup",
      participants: 45,
    },
    {
      title: "DeFi Vesting Workshop",
      date: "Dec 18, 2024",
      time: "2:00 PM UTC",
      type: "Educational",
      participants: 78,
    },
    {
      title: "Year-End Retrospective",
      date: "Dec 28, 2024",
      time: "4:00 PM UTC",
      type: "Community",
      participants: 120,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      <header className="border-b border-emerald-700/40 py-6 px-6 bg-slate-900/80">
        <div className="max-w-6xl mx-auto flex items-center space-x-4">
          <Link href="/" className="text-emerald-400 hover:text-white transition-colors duration-200">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent drop-shadow-lg">
            Community
          </h1>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-800/50 border border-slate-700/50">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/10 transition-all duration-200"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/10 transition-all duration-200"
            >
              Events
            </TabsTrigger>
            <TabsTrigger
              value="contribute"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/10 transition-all duration-200"
            >
              Contribute
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Social Channels */}
            <section>
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                Join Our Channels
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {socialChannels.map((channel) => (
                  <Card
                    key={channel.name}
                    className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-3 rounded-lg ${channel.color} group-hover:scale-105 transition-transform duration-200`}
                        >
                          <channel.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                            {channel.name}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className="border-emerald-500/50 text-emerald-400 text-xs bg-emerald-500/10"
                          >
                            {channel.members} members
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300 mb-4">{channel.description}</CardDescription>
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-200">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Join {channel.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Community Guidelines */}
            <section>
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                Community Guidelines
              </h2>
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent mb-3 group-hover:from-emerald-300 group-hover:to-green-200 transition-all duration-200">
                        🤝 Be Respectful
                      </h3>
                      <p className="text-gray-300 text-sm">Treat all community members with respect and kindness.</p>
                    </div>
                    <div className="group">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent mb-3 group-hover:from-emerald-300 group-hover:to-green-200 transition-all duration-200">
                        💡 Share Knowledge
                      </h3>
                      <p className="text-gray-300 text-sm">Help others learn and grow in the Web3 space.</p>
                    </div>
                    <div className="group">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent mb-3 group-hover:from-emerald-300 group-hover:to-green-200 transition-all duration-200">
                        🚀 Stay On Topic
                      </h3>
                      <p className="text-gray-300 text-sm">Keep discussions relevant to VestFlow and DeFi.</p>
                    </div>
                    <div className="group">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent mb-3 group-hover:from-emerald-300 group-hover:to-green-200 transition-all duration-200">
                        🛡️ No Spam
                      </h3>
                      <p className="text-gray-300 text-sm">Avoid excessive self-promotion and spam content.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="events" className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                Upcoming Events
              </h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <Card
                    key={event.title}
                    className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                              {event.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className="border-emerald-500/50 text-emerald-400 bg-emerald-500/10"
                            >
                              {event.type}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-gray-300 text-sm">
                            <span>📅 {event.date}</span>
                            <span>⏰ {event.time}</span>
                            <span className="text-emerald-400">👥 {event.participants} interested</span>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-200">
                          <Calendar className="h-4 w-4 mr-2" />
                          Join Event
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="contribute" className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                Ways to Contribute
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Github className="h-8 w-8 text-emerald-400 group-hover:scale-105 transition-transform duration-200" />
                      <div>
                        <CardTitle className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                          Code Contributions
                        </CardTitle>
                        <CardDescription className="text-gray-300">Help improve VestFlow platform</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-300 text-sm mb-4">
                      <li>• Bug fixes and improvements</li>
                      <li>• New feature development</li>
                      <li>• Smart contract audits</li>
                      <li>• Documentation updates</li>
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-200">
                      <Github className="h-4 w-4 mr-2" />
                      View Repository
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Heart className="h-8 w-8 text-emerald-400 group-hover:scale-105 transition-transform duration-200" />
                      <div>
                        <CardTitle className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                          Community Support
                        </CardTitle>
                        <CardDescription className="text-gray-300">Help fellow community members</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-300 text-sm mb-4">
                      <li>• Answer questions in Discord</li>
                      <li>• Create tutorials and guides</li>
                      <li>• Moderate community channels</li>
                      <li>• Organize local meetups</li>
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-200">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Join Discord
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default Community
