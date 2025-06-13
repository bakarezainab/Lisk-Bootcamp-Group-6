"use client"
import { useState } from "react";
import Modal from "./modal";

import Link from "next/link";
import { Button } from "@/components/ui/button";
export function CTASection() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#101010]">
      <div className="container mx-auto">
        <div className="relative bg-gradient-to-r from-green-500/20 to-green-900 ">
          <div className="flex items-center justify-center bg-slate-800/50 backdrop-blur-sm border border-slate-700">
            <div className="w-[60%]">
              <div className="relative   p-6 sm:p-12 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                  Ready to Start
                  <span className="bg-gradient-to-r from-green-400 to-green-800 bg-clip-text text-transparent">
                    {" "}
                    Vesting?
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
                  Join the future of token distribution. Create secure vesting schedules or track your investments with our
                  intuitive Web3 platform.
                </p>

                <Link href="/vesting-form">
                      <Button variant="outline" className="w-auto m-auto bg-gradient-to-r from-green-600 to-green-800 hover:from-green-600 hover:to-green-600 px-4 py-2 text-base rounded-md sm:text-lg cursor-pointer mt-3">
                              Fill Vesting Form
                       </Button>
                </Link>



                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                </div>
              </div>
            </div>
            <div className="w-[40%]">
              <div className="flex flex-col items-center justify-center">
                {/* Card */}
                <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                  {/* Fake YouTube Preview */}
                  <div className="relative w-full aspect-video pointer-events-none">
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      title="YouTube preview"
                    ></iframe>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="w-auto m-auto bg-gradient-to-r from-green-600 to-green-800 hover:from-green-600 hover:to-green-600 px-4 py-2 text-base rounded-md sm:text-lg cursor-pointer mt-3"
                >
                  Watch Video
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </section>
  )
}
