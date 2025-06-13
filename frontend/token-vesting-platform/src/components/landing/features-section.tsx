"use client"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function FeaturesSection() {
  const features = [
    {
      icon: 10,
      title: "Linear Vesting",
      description: "14-day linear vesting schedules with real-time progress tracking and automatic token release.",
    },
    {
      icon: 8,
      title: "Smart Contract Security",
      description: "Audited smart contracts ensure your tokens are safe and distributed according to schedule.",
    },
    {
      icon: 12,
      title: "Immutable Schedules",
      description: "Once created, vesting schedules are immutable and guaranteed by blockchain technology.",
    },
    {
      icon: 13,
      title: "Real-time Analytics",
      description: "Track vesting progress, claimed amounts, and remaining tokens with live dashboard updates.",
    },
    {
      icon: 17,
      title: "Instant Claims",
      description: "Claim your vested tokens instantly as they become available with one-click transactions.",
    },
    {
      icon: 9,
      title: "Multi-beneficiary",
      description: "Create multiple vesting schedules for different beneficiaries from a single admin panel.",
    },
  ]

  return (
    <section id="features" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#101010]">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 animate_animated animate__backInDown">
            Powerful Features for
            <span className="bg-gradient-to-r from-green-400 to-green-800 bg-clip-text text-transparent">
              {" "}
              Modern Vesting
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4 animate_animated animate__backInUp">
            Everything you need to manage token vesting schedules with confidence and transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="pl-[4px] pb-[4px] p-0 rounded-lg bg-gradient-to-tr from-[#184934] to-[#101010] animate_animated animate__backInUp"
            >
              <Card
                className="bg-black border-slate-700 hover:border-green-500/50 transition-all duration-300 group"
              >
                <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center">
                  <motion.img
                    src={`/${feature.icon}.png`}
                    alt="hero-image"
                    className="w-[50%]"
                    animate={{ y: [0, -20, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                  />
                  <h2 className="lg:text-2xl sm:text-xl font-extrabold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2 sm:mb-3">{feature.title}</h2>
                  <p className="text-slate-400 text-center leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
