"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

const DIAMONDS = [
  { size: 80,  left: "5%",  top: "12%", delay: "0s",    duration: "5s"  },
  { size: 120, left: "88%", top: "8%",  delay: "0.8s",  duration: "6s"  },
  { size: 60,  left: "75%", top: "65%", delay: "1.4s",  duration: "4.5s"},
  { size: 100, left: "2%",  top: "60%", delay: "0.4s",  duration: "7s"  },
  { size: 50,  left: "50%", top: "5%",  delay: "1.8s",  duration: "5.5s"},
  { size: 140, left: "92%", top: "40%", delay: "1s",    duration: "6.5s"},
  { size: 70,  left: "20%", top: "80%", delay: "2s",    duration: "4.8s"},
  { size: 90,  left: "60%", top: "85%", delay: "0.6s",  duration: "5.8s"},
]

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      aria-label="Hero"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#2563EB 1px, transparent 1px),
            linear-gradient(90deg, #2563EB 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* Floating diamonds */}
      {DIAMONDS.map((d, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            width: d.size,
            height: d.size,
            left: d.left,
            top: d.top,
            border: "1.5px solid #2563EB",
            borderRadius: "2px",
            animation: `float-diamond ${d.duration} ease-in-out ${d.delay} infinite`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Corner accent lines */}
      <div
        className="absolute top-0 left-0 w-32 h-32 pointer-events-none opacity-20"
        style={{ borderRight: "1px solid #C9A84C", borderBottom: "1px solid #C9A84C" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-20"
        style={{ borderLeft: "1px solid #C9A84C", borderTop: "1px solid #C9A84C" }}
        aria-hidden="true"
      />

      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full pointer-events-none animate-glow-pulse"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div
        className={`relative z-10 text-center px-6 max-w-3xl mx-auto transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full animate-glow-pulse blur-2xl"
              style={{ background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 65%)" }}
              aria-hidden="true"
            />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NineSapphires-Photoroom-bkieLh8dIYGnTHPUy8lTb3LvgjPQRR.png"
              alt="NineSapphires logo"
              width={150}
              height={150}
              className="relative z-10 object-contain animate-float-slow"
              priority
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-5 text-balance leading-tight">
          Nine<span className="text-primary">Sapphires</span>
        </h1>

        {/* Tagline */}
        <p className="text-sm md:text-base tracking-[0.22em] uppercase text-muted-foreground font-medium mb-5">
          Digital Craftsmanship, Refined to Perfection.
        </p>

        {/* Gold divider */}
        <div className="gold-divider mx-auto mb-10" aria-hidden="true" />

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#services"
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide glow-btn"
          >
            Explore Our Craft
          </a>
          <a
            href="#why-us"
            className="inline-flex items-center px-8 py-3.5 rounded-full border border-primary/40 text-primary font-medium text-sm tracking-wide hover:bg-primary/8 transition-colors duration-200"
          >
            View Pricing
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce opacity-60">
        <span className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-sans">
          Scroll
        </span>
        <ChevronDown size={14} className="text-muted-foreground" />
      </div>
    </section>
  )
}
