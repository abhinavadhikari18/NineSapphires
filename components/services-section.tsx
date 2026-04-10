"use client"

import { useEffect, useRef, useState } from "react"
import { UtensilsCrossed, Briefcase, Dumbbell, Scissors, Layers } from "lucide-react"

const SERVICES = [
  {
    icon: UtensilsCrossed,
    title: "Restaurants & Cafés",
    description:
      "Menus that breathe elegance, booking systems that feel effortless. We craft digital dining experiences that seduce at first glance and convert at first click.",
    accent: "from-primary/10 to-transparent",
  },
  {
    icon: Briefcase,
    title: "Consultancies",
    description:
      "Professional, prestige-driven sites that inspire trust before a single word is read. Your expertise deserves an online presence that commands authority.",
    accent: "from-accent/10 to-transparent",
  },
  {
    icon: Dumbbell,
    title: "Gyms & Fitness",
    description:
      "Energetic, modern layouts with seamless membership integration. Fuel your brand with a digital identity as powerful as the results you deliver.",
    accent: "from-primary/10 to-transparent",
  },
  {
    icon: Scissors,
    title: "Salons & Boutiques",
    description:
      "Chic, stylish designs that showcase your brand with the sophistication it deserves. Turn browsers into loyal clients through immersive visual storytelling.",
    accent: "from-accent/10 to-transparent",
  },
  {
    icon: Layers,
    title: "Other Service Providers",
    description:
      "Tailored solutions that refine your digital identity. Whatever your niche, we architect an online presence that speaks your language and captures your vision.",
    accent: "from-primary/10 to-transparent",
  },
]

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const Icon = service.icon

  return (
    <div
      ref={ref}
      className="glass-card rounded-2xl p-7 sapphire-card-hover cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      {/* Icon container */}
      <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-xl border border-primary/30 bg-primary/8 text-primary relative overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.accent}`}
          aria-hidden="true"
        />
        <Icon size={24} strokeWidth={1.5} className="relative z-10" />
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      {/* Bottom accent */}
      <div className="mt-6 h-px gold-divider" aria-hidden="true" />
    </div>
  )
}

export function ServicesSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none opacity-5"
        style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p className="text-xs tracking-[0.25em] uppercase font-medium text-accent mb-3">
            What We Craft
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Services
          </h2>
          <div className="gold-divider mx-auto" aria-hidden="true" />
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Every industry has its own heartbeat. We listen closely and design
            experiences that resonate deeply with your audience.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
