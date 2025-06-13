"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Clock, ArrowLeft, ExternalLink, Heart, MessageCircle, Share, TrendingUp } from "lucide-react"
import Link from "next/link"

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "All Posts", count: 24 },
    { id: "updates", label: "Product Updates", count: 8 },
    { id: "tutorials", label: "Tutorials", count: 6 },
    { id: "defi", label: "DeFi Insights", count: 7 },
    { id: "community", label: "Community", count: 3 },
  ]

  const featuredPost = {
    title: "VestFlow 2.0: Revolutionary Multi-Chain Vesting Platform",
    excerpt:
      "Introducing cross-chain compatibility, advanced analytics, and DAO governance features that will transform how projects manage token distribution.",
    author: "VestFlow Team",
    date: "May 10, 2025",
    readTime: "5 min read",
    category: "updates",
    likes: 127,
    comments: 23,
    image: "/vestflow.png", // Placeholder image path
  }

  const blogPosts = [
    {
      title: "Understanding Linear Vesting: A Complete Guide",
      excerpt:
        "Learn how linear vesting works and why it's crucial for sustainable token distribution in DeFi projects.",
      author: "Sarah Chen",
      date: "December 8, 2024",
      readTime: "8 min read",
      category: "tutorials",
      likes: 89,
      comments: 12,
      trending: true,
    },
    {
      title: "DeFi Token Distribution: Best Practices for 2024",
      excerpt:
        "Explore the latest trends and strategies for fair and transparent token distribution in the current DeFi landscape.",
      author: "Alex Rodriguez",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "defi",
      likes: 156,
      comments: 31,
    },
    {
      title: "Community Spotlight: How DAOs Use VestFlow",
      excerpt:
        "Discover how leading DAOs leverage VestFlow for transparent contributor rewards and governance token distribution.",
      author: "Emily Wang",
      date: "December 3, 2024",
      readTime: "4 min read",
      category: "community",
      likes: 73,
      comments: 18,
    },
    {
      title: "Smart Contract Security in Token Vesting",
      excerpt: "Deep dive into the security measures and best practices that protect your tokens in vesting contracts.",
      author: "Michael Thompson",
      date: "November 28, 2024",
      readTime: "10 min read",
      category: "tutorials",
      likes: 201,
      comments: 45,
    },
    {
      title: "Integrating VestFlow API: Developer Guide",
      excerpt: "Step-by-step tutorial for developers on integrating VestFlow APIs into their DeFi applications.",
      author: "David Kim",
      date: "November 25, 2024",
      readTime: "12 min read",
      category: "tutorials",
      likes: 134,
      comments: 27,
    },
    {
      title: "The Future of Token Economics",
      excerpt:
        "Analyzing emerging trends in tokenomics and how vesting mechanisms are evolving to meet new challenges.",
      author: "Lisa Park",
      date: "November 22, 2024",
      readTime: "7 min read",
      category: "defi",
      likes: 98,
      comments: 16,
    },
  ]

  const filteredPosts =
    selectedCategory === "all" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    const colors = {
      updates: "bg-emerald-500",
      tutorials: "bg-green-500",
      defi: "bg-teal-500",
      community: "bg-lime-500",
    }
    return colors[category as keyof typeof colors] || "bg-gray-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-emerald-700/40 py-6 px-6 bg-slate-900/80">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-emerald-400 hover:text-white transition-colors duration-200">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent drop-shadow-lg">
                VestFlow Blog
              </h1>
              <p className="text-emerald-200 mt-2">
                Insights, updates, and guides for the <span className="text-emerald-400 font-medium">Web3 community</span>
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "secondary" : "ghost"}
              className={`
                ${selectedCategory === category.id
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10"
                  : "text-emerald-200 hover:text-emerald-400 hover:bg-emerald-500/5 border border-transparent hover:border-emerald-500/20"
                }
                transition-all duration-200
              `}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
              <Badge variant="outline" className="ml-2 border-current text-xs text-emerald-400 border-emerald-400">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        {selectedCategory === "all" && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              Featured Article
            </h2>
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="aspect-video bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent"></div>
                  <div className="text-6xl relative z-10">🚀</div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">Product Updates</Badge>
                    <Badge variant="outline" className="border-yellow-500 text-yellow-400 bg-yellow-500/10">
                      Featured
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent mb-3">
                    {featuredPost.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 mb-4 text-base">{featuredPost.excerpt}</CardDescription>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{featuredPost.author}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{featuredPost.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredPost.readTime}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span>{featuredPost.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{featuredPost.comments}</span>
                      </span>
                    </div>
                    <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-200">
                      Read More
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            {selectedCategory === "all"
              ? "Latest Articles"
              : `${categories.find((c) => c.id === selectedCategory)?.label}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card
                key={post.title}
                className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 relative group"
              >
                {post.trending && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-orange-500 text-white">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className={`${getCategoryColor(post.category)} text-white text-xs`}>
                      {categories.find((c) => c.id === post.category)?.label.replace(" Posts", "")}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent line-clamp-2 group-hover:from-emerald-300 group-hover:to-green-200 transition-all duration-200">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-sm line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <span className="flex items-center space-x-1 hover:text-emerald-400 transition-colors cursor-pointer">
                        <Heart className="h-3 w-3" />
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1 hover:text-emerald-400 transition-colors cursor-pointer">
                        <MessageCircle className="h-3 w-3" />
                        <span>{post.comments}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-emerald-400 hover:text-white hover:bg-emerald-500/10"
                    >
                      <Share className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-200">
                    Read Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 transition-all duration-200"
          >
            Load More Articles
          </Button>
        </div>
      </main>
    </div>
  )
}

export default Blog
