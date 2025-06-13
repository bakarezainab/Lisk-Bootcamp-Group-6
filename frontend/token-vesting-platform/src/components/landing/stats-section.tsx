"use client"

import { useTokenInfo, useAllBeneficiaries } from "@/hooks/use-contracts"
import { formatUnits } from "viem"
import { motion } from "framer-motion"

export function StatsSection() {
  const { totalSupply, symbol } = useTokenInfo()
  const { beneficiaries } = useAllBeneficiaries()

  const stats = [
    {
      title: "Total Token Supply",
      value: totalSupply ? `${Number(formatUnits(totalSupply, 18)).toLocaleString()}` : "0",
      suffix: symbol || "Tokens",
      delay: 0.1
    },
    {
      title: "Active Investors",
      value: beneficiaries?.length?.toString() || "0",
      suffix: "Users",
      delay: 0.2
    },
    {
      title: "Vesting Schedules",
      value: beneficiaries?.length?.toString() || "0",
      suffix: "Active",
      delay: 0.3
    },
    {
      title: "Vesting Duration",
      value: "14",
      suffix: "Days",
      delay: 0.4
    },
  ]

  return (
    <section id="stats" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#0C1212] via-[#133124] to-[#030003] relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 sm:mb-24"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Platform
            <span className="bg-gradient-to-r from-green-400 to-green-800 bg-clip-text text-transparent">
              {" "}
              Statistics
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto px-4 leading-relaxed">
            Real-time metrics showcasing the power of our blockchain-powered vesting platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 sm:gap-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: stat.delay }}
              className="relative"
            >
              <div className="flex flex-col items-center">
                <div className="text-2xl sm:text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-base sm:text-lg text-slate-400 mb-2 tracking-wide uppercase font-medium">
                  {stat.suffix}
                </div>
                <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-slate-500/50 to-transparent" />
                <p className="text-slate-300 font-medium text-base sm:text-lg mt-4 tracking-wide">
                  {stat.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
