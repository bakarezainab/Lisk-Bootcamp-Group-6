import { UserPlus, Settings, TrendingUp } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      title: "Connect Wallet",
      description: "Connect your Web3 wallet to access the platform as either an admin or investor.",
      color: "from-green-600 to-green-800",
      className: "timeline-start timeline-box"
    },
    {
      icon: Settings,
      title: "Create or View",
      description: "Admins create vesting schedules, while investors view their existing vesting progress.",
      color: "from-green-600 to-green-800",
      className: "timeline-end timeline-box"
    },
    {
      icon: TrendingUp,
      title: "Track & Claim",
      description: "Monitor vesting progress in real-time and claim tokens as they become available.",
      color: "from-green-600 to-green-800",
      className: "timeline-start timeline-box"
    },
  ]

  return (
    <section id="how-it-works" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle,_#0C1212,_#133124,_#0C1212)]">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            How It
            <span className="bg-gradient-to-r from-green-800 to-green-800 bg-clip-text text-transparent"> Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto px-4">
            Get started with VestFlow in three simple steps. No complex setup required.
          </p>
        </div>

        <div>
          {steps.map((step, index) => (
            <ul className="timeline timeline-vertical" key={index}>
              <li>
                <div className={`${step.className} relative shadow-[#101010]-500 bg-black`}>
                  <div className="md:text-2xl sm:text-sm font-semibold text-green-800 mb-2">STEP {index + 1}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{step.description}</p>
                </div>
                <hr />
              </li>
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}