"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const STATS = [
  { value: "10+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "1+", label: "Years of Excellence" },
  { value: "5★", label: "Average Rating" },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect() }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

export function AboutSection() {
  const { ref: leftRef, inView: leftInView } = useInView(0.1)
  const { ref: rightRef, inView: rightInView } = useInView(0.1)
  const { ref: statsRef, inView: statsInView } = useInView(0.1)

  return (
    <section id="about" className="py-24 px-6 bg-background relative overflow-hidden">
      {/* BG ornament */}
      <div
        className="absolute left-0 bottom-0 w-96 h-96 rounded-full pointer-events-none opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.25em] uppercase font-medium text-accent mb-3">
            Our Story
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            About NineSapphires
          </h2>
          <div className="gold-divider mx-auto" aria-hidden="true" />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Text */}
          <div
            ref={leftRef}
            style={{
              opacity: leftInView ? 1 : 0,
              transform: leftInView ? "translateX(0)" : "translateX(-32px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-6 leading-snug">
              A Global Brand Born from{" "}
              <span className="text-primary">Nepali Craftsmanship</span>
            </h3>

            <div className="flex flex-col gap-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                NineSapphires was born from a singular vision — to bridge the
                rich aesthetic traditions of Nepal with the cutting-edge demands
                of the modern digital world. We believe every business deserves
                a website that is not merely functional, but genuinely
                beautiful.
              </p>
              <p>
                Our founder envisioned a studio where craftsmanship meets
                technology. Where a restaurant in Kathmandu can have a digital
                presence as refined as a Michelin-starred establishment in
                Paris, and where a local consultancy can command the same online
                authority as a Fortune 500 firm.
              </p>
              <p>
                We blend cultural authenticity with global design sensibilities,
                creating websites that are visually distinctive, technically
                robust, and strategically effective. Every project is a
                collaboration — we listen, we understand, then we build with
                precision and passion.
              </p>
              <p>
                With NineSapphires, you are not just getting a website. You are
                getting a digital identity, refined to perfection.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-8 pt-6 border-t border-border/60">
              <p className="font-serif text-base italic text-muted-foreground">
                &ldquo;We don&apos;t just build websites — we craft legacies.&rdquo;
              </p>
              <p className="text-xs tracking-[0.15em] uppercase font-medium text-accent mt-2">
                — Ab, Founder of NineSapphires
              </p>
            </div>
          </div>

          {/* Right: Logo/Visual */}
          <div
            ref={rightRef}
            className="flex flex-col items-center justify-center gap-8"
            style={{
              opacity: rightInView ? 1 : 0,
              transform: rightInView ? "translateX(0)" : "translateX(32px)",
              transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
            }}
          >
            {/* Logo display */}
            <div className="relative glass-card rounded-3xl p-12 w-full max-w-sm">
              <div
                className="absolute inset-0 rounded-3xl animate-glow-pulse pointer-events-none"
                style={{ boxShadow: "inset 0 0 40px rgba(37,99,235,0.08)" }}
                aria-hidden="true"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NineSapphires-Photoroom-bkieLh8dIYGnTHPUy8lTb3LvgjPQRR.png"
                alt="NineSapphires brand logo"
                width={280}
                height={280}
                className="object-contain w-full h-auto animate-float-slow"
              />
            </div>

            {/* Brand tagline */}
            <div className="text-center">
              <p className="font-serif text-lg font-semibold text-foreground">NineSapphires</p>
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mt-1">
                Digital Craftsmanship, Refined to Perfection.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center sapphire-card-hover"
              style={{
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              <p className="font-serif text-3xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
