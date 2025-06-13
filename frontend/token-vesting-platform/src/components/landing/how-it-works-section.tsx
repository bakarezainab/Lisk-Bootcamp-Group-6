import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, UserPlus, Settings, TrendingUp, ArrowDown } from "lucide-react"

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

        <div className="">
          {steps.map((step, index) => (

            <ul className="timeline timeline-vertical">
              <li>
                <div key={index} className={`${step.className} relative shadow-[#101010]-500 bg-black`}>
                  {/* <Card className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-all duration-300 h-full">
                    <CardContent className="p-6 sm:p-8 text-center"> */}
                  {/* <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6`}
                  >
                    <step.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div> */}
                  <div className="md:text-2xl sm:text-sm font-semibold text-green-800 mb-2">STEP {index + 1}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{step.description}</p>
                  {/* </CardContent>
                  </Card> */}
                </div>
                <hr />
              </li>
            </ul>

          ))}
        </div>

        {/* <ul className="timeline timeline-vertical">
          <li>
            <div className="timeline-start timeline-box">First Macintosh computer</div>
            <hr />
          </li>
        </ul> */}
      </div>
    </section>
  )
}
