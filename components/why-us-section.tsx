"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Infinity, RefreshCw, Zap } from "lucide-react"

const VALUE_PROPS = [
  {
    icon: Infinity,
    title: "Lifetime Ownership",
    description:
      "Static websites are yours forever. No recurring fees — extra charges apply only when you add new features after a year.",
  },
  {
    icon: RefreshCw,
    title: "Transparent Maintenance",
    description:
      "Dynamic websites carry yearly maintenance charges — clearly stated, no hidden costs, no surprises.",
  },
  {
    icon: Zap,
    title: "Finest Within Budget",
    description:
      "We deliver world-class design and engineering without the enterprise price tag. Refinement for every business size.",
  },
]

const PACKAGES = [
  {
    name: "Standard",
    price: "15,999",
    subtitle: "Perfect for small businesses",
    currency: "Rs",
    popular: false,
    features: [
      "Restaurants, cafés & consultancies",
      "Gyms & small businesses",
      "Elegant responsive design",
      "Up to 5 pages",
      "Contact & booking integration",
      "SEO-friendly structure",
      "1 month of post-launch support",
    ],
    cta: "Get Started",
  },
  {
    name: "Elite",
    price: "18,999",
    subtitle: "Advanced polish & branding",
    currency: "Rs",
    popular: true,
    features: [
      "Everything in Standard",
      "Advanced design polish",
      "Branding & identity support",
      "Up to 8 pages",
      "Priority deployment",
      "Custom animations & interactions",
      "3 months of post-launch support",
    ],
    cta: "Most Popular",
  },
  {
    name: "Premium",
    price: "24,999+",
    subtitle: "Enterprise & dynamic features",
    currency: "Rs",
    popular: false,
    features: [
      "Everything in Elite",
      "Big restaurants, resorts & enterprises",
      "Full backend & dynamic features",
      "Unlimited pages",
      "Admin dashboard",
      "Database & API integrations",
      "6 months of post-launch support",
    ],
    cta: "Contact Us",
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

export function WhyUsSection() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2)

  return (
    <section id="why-us" className="py-24 px-6 bg-muted/40 relative overflow-hidden">
      {/* BG decoration */}
      <div
        className="absolute left-0 top-0 w-72 h-72 rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p className="text-xs tracking-[0.25em] uppercase font-medium text-accent mb-3">
            The Promise
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Why NineSapphires?
          </h2>
          <div className="gold-divider mx-auto" aria-hidden="true" />
        </div>

        {/* Value props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {VALUE_PROPS.map((prop, i) => {
            const Icon = prop.icon
            return (
              <ValuePropCard key={prop.title} prop={prop} Icon={Icon} index={i} />
            )
          })}
        </div>

        {/* Pricing heading */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.25em] uppercase font-medium text-accent mb-3">
            Investment
          </p>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
            Choose Your Package
          </h3>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <PricingCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ValuePropCard({
  prop,
  Icon,
  index,
}: {
  prop: (typeof VALUE_PROPS)[0]
  Icon: React.ElementType
  index: number
}) {
  const { ref, inView } = useInView(0.1)
  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center gap-4"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      <div className="w-14 h-14 rounded-full border border-primary/30 bg-primary/8 flex items-center justify-center text-primary">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <h4 className="font-serif text-lg font-semibold text-foreground">{prop.title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{prop.description}</p>
    </div>
  )
}

function PricingCard({
  pkg,
  index,
}: {
  pkg: (typeof PACKAGES)[0]
  index: number
}) {
  const { ref, inView } = useInView(0.1)
  return (
    <div
      ref={ref}
      className={`relative rounded-2xl p-8 flex flex-col gap-5 sapphire-card-hover ${
        pkg.popular
          ? "bg-secondary text-secondary-foreground border-2 border-primary shadow-[0_0_40px_rgba(37,99,235,0.25)]"
          : "glass-card"
      }`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      {pkg.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold tracking-wide whitespace-nowrap">
          Most Popular
        </div>
      )}

      {/* Package name */}
      <div>
        <p className={`text-xs tracking-[0.2em] uppercase font-medium mb-1 ${pkg.popular ? "text-accent" : "text-accent"}`}>
          {pkg.name}
        </p>
        <div className="flex items-baseline gap-1">
          <span className={`text-lg font-serif ${pkg.popular ? "text-secondary-foreground/70" : "text-muted-foreground"}`}>
            {pkg.currency}
          </span>
          <span className={`font-serif text-4xl font-bold ${pkg.popular ? "text-secondary-foreground" : "text-foreground"}`}>
            {pkg.price}
          </span>
        </div>
        <p className={`text-xs mt-1 ${pkg.popular ? "text-secondary-foreground/60" : "text-muted-foreground"}`}>
          {pkg.subtitle}
        </p>
      </div>

      <div className="h-px gold-divider" aria-hidden="true" />

      {/* Feature list */}
      <ul className="flex flex-col gap-3 flex-1">
        {pkg.features.map((feat) => (
          <li key={feat} className="flex items-start gap-3 text-sm">
            <Check
              size={15}
              className={`mt-0.5 shrink-0 ${pkg.popular ? "text-accent" : "text-primary"}`}
            />
            <span className={pkg.popular ? "text-secondary-foreground/85" : "text-muted-foreground"}>
              {feat}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className={`mt-2 inline-flex justify-center items-center py-3 px-6 rounded-full text-sm font-medium transition-all duration-200 ${
          pkg.popular
            ? "bg-primary text-primary-foreground glow-btn"
            : "border border-primary/40 text-primary hover:bg-primary/8"
        }`}
      >
        {pkg.cta}
      </a>
    </div>
  )
}
