"use client"

// import { Button } from "@/components/ui/button"
import { motion } from "framer-motion";
// import Link from "next/link"
// import { useCallback } from "react"
// import Particles from "react-tsparticles"
// import { Engine } from "tsparticles-engine"
// import { loadFull } from "tsparticles"

export function HeroSection() {
  // const particlesInit = useCallback(async (engine: Engine) => {
  //   await loadFull(engine)
  // }, [])

  return (
    <section className="flex items-center justify-center pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen bg-gradient-to-tr from-[#0C1212] via-[#133124] to-[#030003]">
      {/* <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: false,
            zIndex: -1
          },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#fff",
            },
            links: {
              color: "#fff",
              distance: 130,
              enable: true,
              opacity: 0.5,
              width: 1.5,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.2,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      /> */}
      <div className="container mx-auto text-center relative z-10">
        {/* Badge */}
        {/* <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-green-500/10 border border-purple-500/20 text-green-300 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
          <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-2 !z-10" />
          Built on Lisk Blockchain
        </div> */}

        <div className="flex flex-col lg:flex-row items-center justify-center gap-5">

          <div className="w-full lg:w-[55%] text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-[5rem] font-extrabold text-white mb-4 sm:mb-6  leading-tight animate__animated animate__backInLeft">
              Revolutionizing <br />
              <span>
                {" "}
                Token Vesting
              </span>
            </h1>

            <p className="text-base sm:text-xl md:text-lg text-slate-300 mb-8 sm:mb-12 max-w-3xl leading-relaxed px-4">
              Experience the next generation of token distribution. Our platform leverages blockchain technology to provide secure, transparent, and automated vesting schedules. Monitor your investments in real-time with our cutting-edge dashboard.
            </p>
          </div>
          <div className="flex w-full lg:w-[45%] ">
            {/* <img src="/icon.png" alt="hero-image" className="w-full animate-wiggle animate-infinite animate-delay-[1ms] animate-ease-in-out" /> */}
            <motion.img
              src="/3.png"
              alt="hero-image"
              className="w-full"
              animate={{ y: [0, -20, 0] }} // keyframes: start -> up -> down
              transition={{
                duration: 2,        // slow bounce (2 seconds)
                repeat: Infinity,   // loop forever
                repeatType: "loop", // smooth looping
                ease: "easeInOut",  // smooth up/down motion
              }}
            />
          </div>
        </div>

        {/* <div className="flex flex-col sm:flex-row items-center justify-center">
          <img src="/icon.png" alt="hero-image" className="w-50 h-50" />
        </div> */}

        {/* CTA Buttons */}
        {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
          <Link href="/admin" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
            >
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Launch as Admin
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
            </Button>
          </Link>
          <Link href="/investor" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
            >
              <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              View My Vesting
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
            </Button>
          </Link>
        </div> */}

        {/* Hero Visual */}
        {/* <div className="relative max-w-4xl mx-auto px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl sm:rounded-3xl blur-3xl"></div>
          <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl sm:rounded-3xl p-4 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Secure & Trustless</h3>
                <p className="text-sm sm:text-base text-slate-400">
                  Smart contracts ensure automatic and secure token distribution
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-sm sm:text-base text-slate-400">Built on Lisk for fast transactions and low fees</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">User Friendly</h3>
                <p className="text-sm sm:text-base text-slate-400">Intuitive interface for both admins and investors</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
}